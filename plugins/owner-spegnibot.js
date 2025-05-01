import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) return m.react('✖️')
    if (conn.user.jid == conn.user.jid) {
    await m.reply('🚩 Mi sto spegnendo...')
    process.send('reset')
  } else return m.react('✖️')
}

handler.help = ['spegnibot']
handler.tags = ['owner']
handler.command = ['spegnibot'] 

handler.rowner = true

export default handler