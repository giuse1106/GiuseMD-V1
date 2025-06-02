let handler = async (m, { conn, text, participants }) => {
  try {
    const delay = (time) => new Promise((res) => setTimeout(res, time));
    let customMessage = text.trim();

    if (!customMessage) {
      return m.reply("Devi scrivere un messaggio dopo il comando!");
    }

    let users = participants.map((u) => conn.decodeJid(u.id));
    const sendHidetagMessage = async (message) => {
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: message,
          contextInfo: { mentionedJid: users },
        },
      }, {});
    };

    const maxMessageLength = 200;
    let messageChunks = [];

    while (customMessage.length > maxMessageLength) {
      messageChunks.push(customMessage.slice(0, maxMessageLength));
      customMessage = customMessage.slice(maxMessageLength);
    }
    messageChunks.push(customMessage);

    for (let i = 0; i < 10; i++) { // Ripete il messaggio 10 volte
      for (let chunk of messageChunks) {
        await sendHidetagMessage(chunk);
        await delay(2000); // Ritardo di 2 secondi tra i chunk
      }
    }
  } catch (e) {
    console.error(e);
  }
};

handler.command = /^(bigtag)$/i;
handler.group = true; // Il comando può essere usato solo nei gruppi
handler.owner = true; // Solo gli owner possono usare questo comando
export default handler;
