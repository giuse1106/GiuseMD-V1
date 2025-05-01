let handler = async (m, { conn, command, text }) => {
    let love = `*🍆 CALCOLATORE DI CM🍆*\n
━━━━━━━━━━━━━━━━━━━━━
 ${text} la lungo ${Math.floor(Math.random() * 101)}cm
━━━━━━━━━━━━━━━━━━━━━

`.trim()
    m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['pene']
handler.tags = ['fun']
handler.command = /^(pene)$/i
export default handler