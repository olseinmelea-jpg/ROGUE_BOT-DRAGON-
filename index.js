import connectToWhatsapp from './Digix/crew.js'
import handleIncomingMessage from './events/messageHandler.js'
import logger from './utils/logger.js'

// ─── Anti-crash global ─────────────────────────────────────────
// Empêche le process de mourir sur une erreur non catchée.
// Katabump redémarre le process à chaque crash, ce qui déconnecte
// la session WhatsApp et force un nouveau QR/pairing. On évite ça.

process.on('uncaughtException', (err) => {
    logger.error('[uncaughtException]', err?.stack || err)
})

process.on('unhandledRejection', (reason) => {
    logger.error('[unhandledRejection]', reason?.stack || reason)
})

process.on('warning', (warning) => {
    logger.warn('[warning]', warning.name, warning.message)
})

// ─── Démarrage avec reconnexion automatique ────────────────────
async function start() {
    try {
        await connectToWhatsapp(handleIncomingMessage)
        logger.success('ROGUE_BOT-DRAGON démarré avec succès !')
    } catch (err) {
        logger.error('Erreur fatale au démarrage, nouvelle tentative dans 5s :', err?.message || err)
        setTimeout(start, 5000)
    }
}

start()