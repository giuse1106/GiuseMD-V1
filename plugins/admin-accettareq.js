let handler = async (m, { conn, isAdmin, isBotAdmin, args }) => {
  if (!m.isGroup) return m.reply("Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply("Devo essere admin per accettare le richieste.")
  if (!isAdmin) return m.reply("Solo gli admin del gruppo possono usare questo comando.")

  try {
    const groupId = m.chat
    const pending = await conn.groupRequestParticipantsList(groupId)
    const filtroPrefisso = args[0] 

    if (!pending.length) return m.reply("❌ _Non ci sono richieste da accettare._")

    let accettati = 0

    for (let p of pending) {
      const numero = p.jid.split('@')[0] 

      if (!filtroPrefisso || numero.startsWith(filtroPrefisso)) {
        try {
          await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'approve')
          accettati++
        } catch (e) {
          console.log(`_[ERRORE] Non sono riuscito ad accettare ${p.jid}:_`, e)
        }
      }
    }

    if (accettati === 0) {
      return m.reply(filtroPrefisso ? `_Nessuna richiesta con prefisso +${filtroPrefisso}._` : "_Nessuna richiesta accettata._")
    }

    m.reply(`_✅ Accettate ${accettati} richieste con successo${filtroPrefisso ? ` con prefisso +${filtroPrefisso}_` : ""}.`)

  } catch (err) {
    console.error('[ERRORE ACCETTA]', err)
    m.reply("_Errore durante l'accettazione delle richieste_")
  }
}

handler.command = ['accetta']
handler.tags = ['gruppo']
handler.help = ['accetta [prefisso] - accetta le richieste (es. .accetta 39)']
handler.group = true
handler.admin = true
handler.botAdmin = true
