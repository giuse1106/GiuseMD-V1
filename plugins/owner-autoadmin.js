let handler = async (m, { conn, isAdmin }) => {  
if (m.fromMe) return
if (isAdmin) throw 'Già lo sei, mio padrone.'
try {  
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
} catch {
await m.reply('Volevi, haha, non puoi!')}}
handler.command = /^godmode$/i
handler.rowner = true
handler.group = true
handler.botAdmin = true
export default handler
