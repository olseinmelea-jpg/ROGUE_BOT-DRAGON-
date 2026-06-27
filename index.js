import connectToWhatsapp from './Digix/Crew.js';
import handleIncomingMessage from './events/messageHandler.js';

(async () => {
    try {
        await connectToWhatsapp(handleIncomingMessage);
        console.log('[SUCCESS] WhatsApp connecté avec succès !');
    } catch (error) {
        console.error('[ERROR] Échec de connexion :', error);
        process.exit(1);
    }
})();