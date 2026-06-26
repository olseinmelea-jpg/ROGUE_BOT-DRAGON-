import { DigixNew } from '../utils/DigixNew.js';
import { downloadMediaMessage } from 'baileys';
import fs from 'fs';
import path from 'path';

export async function save(client, message) {
    const remoteJid = message.key.remoteJid;
    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quotedMessage?.imageMessage && !quotedMessage?.videoMessage && !quotedMessage?.audioMessage) {
        await client.sendMessage(remoteJid, { text: '_Reply to a media message to save it._' });
        return;
    }

    const content = DigixNew(quotedMessage);

    try {
        if (content?.imageMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {},
                { reuploadRequest: client.updateMediaMessage }
            );
            if (!mediaBuffer) return await client.sendMessage(remoteJid, { text: '_Failed to download media._' });
            const tempFilePath = path.resolve('./temp_save_image.jpeg');
            fs.writeFileSync(tempFilePath, mediaBuffer);
            await client.sendMessage(remoteJid, { image: { url: tempFilePath } });
            fs.unlinkSync(tempFilePath);

        } else if (content?.videoMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {},
                { reuploadRequest: client.updateMediaMessage }
            );
            if (!mediaBuffer) return await client.sendMessage(remoteJid, { text: '_Failed to download media._' });
            const tempFilePath = path.resolve('./temp_save_video.mp4');
            fs.writeFileSync(tempFilePath, mediaBuffer);
            await client.sendMessage(remoteJid, { video: { url: tempFilePath } });
            fs.unlinkSync(tempFilePath);

        } else if (content?.audioMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {},
                { reuploadRequest: client.updateMediaMessage }
            );
            if (!mediaBuffer) return await client.sendMessage(remoteJid, { text: '_Failed to download media._' });
            const tempFilePath = path.resolve('./temp_save_audio.mp3');
            fs.writeFileSync(tempFilePath, mediaBuffer);
            await client.sendMessage(remoteJid, { audio: { url: tempFilePath } });
            fs.unlinkSync(tempFilePath);

        } else {
            await client.sendMessage(remoteJid, { text: '_No valid media found in quoted message._' });
        }
    } catch (error) {
        console.error('Error in save command:', error);
        await client.sendMessage(remoteJid, { text: '_An error occurred while saving the media._' });
    }
}

export default save;