//Crediti by Gabs

import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import * as fs from 'fs'

let handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  try {
    let users = participants.map(u => conn.decodeJid(u.id))
    let q = m.quoted ? m.quoted : m || m.text || m.sender
    let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
    let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }}, {}), `Tag by @${m.sender.split('@')[0]}\n\n${text || q.text}`, conn.user.jid, { mentions: users })
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  } catch (e) {
    console.error(e)
    
    let users = participants.map(u => conn.decodeJid(u.id))
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    let isMedia = /image|video|sticker|audio/.test(mime)

    if (isMedia && quoted.mtype === 'imageMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: `Tag by @${m.sender.split('@')[0]}\n\n${text || quoted.text}` }, { quoted: m })
    } else if (isMedia && quoted.mtype === 'videoMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: `Tag by @${m.sender.split('@')[0]}\n\n${text || quoted.text}` }, { quoted: m })
    } else if (isMedia && quoted.mtype === 'audioMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: m })
    } else if (isMedia && quoted.mtype === 'stickerMessage') {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m })
    } else {
      conn.sendMessage(m.chat, { text: `Tag by @${m.sender.split('@')[0]}\n\n${text || quoted.text}`, mentions: users }, { quoted: m })
    }
  }
}

handler.command = /^(hidetag|menziona|tag)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
