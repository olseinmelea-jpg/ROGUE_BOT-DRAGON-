import configmanager from "../utils/configmanager.js"
import group from '../commands/group.js'
import viewonce from '../commands/viewonce.js'
import tag from '../commands/tag.js'
import img from '../commands/img.js'
import url from '../commands/url.js'
import save from '../commands/save.js'
import pp from '../commands/pp.js'
import react from "../utils/react.js"
import info from "../commands/menu.js"
import { pingTest } from "../commands/ping.js"
import uptime from '../commands/uptime.js'
import fancy from '../commands/fancy.js'

async function handleIncomingMessage(client, event) {
    let lid = client?.user?.lid
        ? client.user.lid.split(':')[0] + '@lid'
        : ''
    const number = client.user.id.split(':')[0]
    const messages = event.messages

    if (!configmanager.config.users[number]) return

    const publicMode = configmanager.config.users[number].publicMode
    const prefix = configmanager.config.users[number].prefix

    for (const message of messages) {
        const messageBody = (
            message.message?.extendedTextMessage?.text ||
            message.message?.conversation || ''
        ).toLowerCase()
        const remoteJid = message.key.remoteJid
        const approvedUsers = configmanager.config.users[number].sudoList

        if (!messageBody || !remoteJid) continue

        console.log('📨 Message:', messageBody.substring(0, 50))

        tag.respond(client, message)

        if (
            messageBody.startsWith(prefix) &&
            (publicMode ||
                message.key.fromMe ||
                approvedUsers.includes(message.key.participant || message.key.remoteJid) ||
                lid && lid.includes(message.key.participant || message.key.remoteJid))
        ) {
            const commandAndArgs = messageBody.slice(prefix.length).trim()
            const parts = commandAndArgs.split(/\s+/)
            const command = parts[0]

            switch (command) {
                case 'uptime':
                    await react(client, message)
                    await uptime(client, message)
                    break

                case 'ping':
                    await react(client, message)
                    await pingTest(client, message)
                    break

                case 'menu':
                    await react(client, message)
                    await info(client, message)
                    break

                case 'fancy':
                    await react(client, message)
                    await fancy(client, message)
                    break

                case 'setpp':
                    await react(client, message)
                    await pp.setpp(client, message)
                    break

                case 'getpp':
                    await react(client, message)
                    await pp.getpp(client, message)
                    break

                case 'public':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande set non disponible.' })
                    break

                case 'setprefix':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande setprefix non disponible.' })
                    break

                case 'autotype':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande autotype non disponible.' })
                    break

                case 'autorecord':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande autorecord non disponible.' })
                    break

                case 'welcome':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande welcome non disponible.' })
                    break

                case 'photo':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande photo non disponible.' })
                    break

                case 'toaudio':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande toaudio non disponible.' })
                    break

                case 'sticker':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande sticker non disponible.' })
                    break

                case 'play':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande play non disponible.' })
                    break

                case 'img':
                    await react(client, message)
                    await img(message, client)
                    break

                case 'vv':
                    await react(client, message)
                    await viewonce(client, message)
                    break

                case 'save':
                    await react(client, message)
                    await save(client, message)
                    break

                case 'tiktok':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande tiktok non disponible.' })
                    break

                case 'url':
                    await react(client, message)
                    await url(client, message)
                    break

                case 'tag':
                    await react(client, message)
                    await tag.tag(client, message)
                    break

                case 'tagall':
                    await react(client, message)
                    await tag.tagall(client, message)
                    break

                case 'tagadmin':
                    await react(client, message)
                    await tag.tagadmin(client, message)
                    break

                case 'kick':
                    await react(client, message)
                    await group.kick(client, message)
                    break

                case 'kickall':
                    await react(client, message)
                    await group.kickall(client, message)
                    break

                case 'kickall2':
                    await react(client, message)
                    await group.kickall2(client, message)
                    break

                case 'promote':
                    await react(client, message)
                    await group.promote(client, message)
                    break

                case 'demote':
                    await react(client, message)
                    await group.demote(client, message)
                    break

                case 'promoteall':
                    await react(client, message)
                    await group.pall(client, message)
                    break

                case 'demoteall':
                    await react(client, message)
                    await group.dall(client, message)
                    break

                case 'mute':
                    await react(client, message)
                    await group.mute(client, message)
                    break

                case 'unmute':
                    await react(client, message)
                    await group.unmute(client, message)
                    break

                case 'gclink':
                    await react(client, message)
                    await group.gclink(client, message)
                    break

                case 'antilink':
                    await react(client, message)
                    await group.antilink(client, message)
                    break

                case 'bye':
                    await react(client, message)
                    await group.bye(client, message)
                    break

                case 'block':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande block non disponible.' })
                    break

                case 'unblock':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande unblock non disponible.' })
                    break

                case 'close':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '🔒 Commande désactivée.' })
                    break

                case 'sudo':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande sudo non disponible.' })
                    break

                case 'delsudo':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande delsudo non disponible.' })
                    break

                case 'addprem':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande addprem non disponible.' })
                    break

                case 'delprem':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚙️ Commande delprem non disponible.' })
                    break

                case 'auto-promote':
                case 'auto-demote':
                case 'auto-left':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '⚠️ Fonctionnalité premium non disponible.' })
                    break

                case 'join':
                    await react(client, message)
                    await group.setJoin(client, message)
                    break

                case 'test':
                    await react(client, message)
                    await client.sendMessage(remoteJid, { text: '✅ Bot opérationnel.' })
                    break
            }
        }

        await group.linkDetection(client, message)
    }
}

export default handleIncomingMessage