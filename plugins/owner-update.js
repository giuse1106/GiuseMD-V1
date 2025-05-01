import { execSync } from 'child_process'
let handler = async (m, { conn, text }) => {
await m.react('🕓')
if (conn.user.jid == conn.user.jid) {
  try {
    // Sostituisci 'nome-del-tuo-branch' con il nome del branch principale del tuo repository (es. 'main' o 'master')
    let stdout = execSync('git pull origin nome-del-tuo-branch' + (m.fromMe && text ? ' ' + text : ''))
    await conn.reply(m.chat, stdout.toString(), m)
    await m.react('✅')
  } catch (error) {
    console.error("Errore durante l'aggiornamento:", error);
    await conn.reply(m.chat, `Si è verificato un errore durante l'aggiornamento:\n\n${error}`, m)
    await m.react('❌')
  }
}}
handler.help = ['aggiornabot']
handler.tags = ['owner']
handler.command = ['update', 'aggiornamento', 'aggiornabot']
handler.rowner = true

export default handler
