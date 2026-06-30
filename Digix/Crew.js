import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from 'baileys';
import configmanager from '../utils/configmanager.js';
import pino from 'pino';
import fs from 'fs';

const data = 'sessionData';

async function connectToWhatsapp(handleMessage) {
    const { version } = await fetchLatestBaileysVersion();
    console.log('Baileys version:', version);

    const { state, saveCreds } = await useMultiFileAuthState(data);

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        logger: pino({ level: 'silent' }),
        keepAliveIntervalMs: 10000,
        connectTimeoutMs: 60000,
        generateHighQualityLinkPreview: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            console.log('❌ Disconnected. StatusCode:', statusCode);
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                console.log('🔄 Reconnecting in 5 seconds...');
                setTimeout(() => connectToWhatsapp(handleMessage), 5000);
            } else {
                console.log('🚫 Logged out permanently. Please reauthenticate manually.');
            }
        } else if (connection === 'connecting') {
            console.log('⏳ Connecting...');
        } else if (connection === 'open') {
            console.log('✅ WhatsApp connection established!');

            try {
                const chatId = '24102169598@s.whatsapp.net';
                const imagePath = './database/DigixCo.jpg';

                if (!fs.existsSync(imagePath)) {
                    console.warn('⚠️ Image not found at path:', imagePath);
                }

                const messageText = `
╔══════════════════╗
      *ROGUE BOT DRAGON Connected Successfully* 🚀
╠══════════════════╣
> "Always Forward. Digital Crew, one of the best."
╚══════════════════╝

*Digital Crew 243*
                `;

                await sock.sendMessage(chatId, {
                    image: { url: imagePath },
                    caption: messageText,
                    footer: '💻 Powered by DigiX Crew',
                });

                console.log('📩 Welcome message sent successfully!');
            } catch (err) {
                console.error('❌ Error sending welcome message:', err);
            }

            sock.ev.on('messages.upsert', async (msg) => handleMessage(sock, msg));
        }
    });

    setTimeout(async () => {
        if (!state.creds.registered) {
            console.log('⚠️ Not logged in. Preparing pairing process...');
            try {
                const number = '24102169598';

                configmanager.config.users[number] = {
                    sudoList: ['24102169598@s.whatsapp.net'],
                    tagAudioPath: 'tag.mp3',
                    antilink: true,
                    response: true,
                    autoreact: false,
                    prefix: '.',
                    reaction: '🎯',
                    welcome: false,
                    record: true,
                    type: false,
                    publicMode: false,
                };
                configmanager.save();

                console.log(`🔄 Requesting pairing code for ${number}`);
                const code = await sock.requestPairingCode(number);
                console.log('📲 Pairing Code:', code);
                console.log('👉 Enter this code on your WhatsApp app to pair.');
            } catch (e) {
                console.error('❌ Error while requesting pairing code:', e);
            }
        }
    }, 5000);

    return sock;
}

export default connectToWhatsapp;