import connectToWhatsapp from './Digix/Crew.js';
import handleIncomingMessage from './events/messageHandler.js';

(async () => {
    try {
        await connectToWhatsapp(handleIncomingMessage);
        console.log('✅ WhatsApp connecté avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors de la connexion :', error);
        process.exit(1); // Optionnel : arrêter le processus en cas d'échec
    }
})();