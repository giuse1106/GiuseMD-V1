// plugins/fun-scappa.js

import { rimuoviDaCantina, isInCantina } from './fun-cantina.js';

let handler = async (message, { conn, usedPrefix }) => {
  const utenteCheScappaId = message.sender;
  const utenteCheScappaNome = await conn.getName(utenteCheScappaId);

  if (!isInCantina(utenteCheScappaId)) {
    conn.reply(message.chat, `${utenteCheScappaNome}, non sei nella cantina! Non puoi scappare da nessuna parte! 😜`, message);
    return;
  }

  const tentativoDiScappoRiuscito = Math.random() < 0.25; // 25% di probabilità di successo

  if (tentativoDiScappoRiuscito) {
    if (rimuoviDaCantina(utenteCheScappaId)) {
      await conn.sendMessage(message.chat, { react: { text: '🎉', key: message.key } });
      await conn.sendMessage(message.chat, { react: { text: '🏃', key: message.key } });
      await conn.sendMessage(message.chat, { react: { text: '💨', key: message.key } });

      await conn.sendMessage(message.chat, {
        text: `🥳 **EVASIONE RIUSCITA!** 🥳\n\n${utenteCheScappaNome} è riuscito a scappare dalla cantina! Che furbacchione! 👏`,
      });

      // Messaggio privato all'utente che è scappato (opzionale)
      // await conn.sendMessage(utenteCheScappaId, {
      //   text: `Sei riuscito a scappare dalla cantina! Sei un vero Houdini! 😄`,
      // });
    } else {
      conn.reply(message.chat, `Qualcosa è andato storto durante la tua fuga, ${utenteCheScappaNome}! 😓`, message);
    }
  } else {
    await conn.sendMessage(message.chat, { react: { text: '😥', key: message.key } });
    await conn.sendMessage(message.chat, { react: { text: '🔒', key: message.key } });

    conn.reply(message.chat, `${utenteCheScappaNome}, il tuo tentativo di fuga è fallito! 🤣 Meglio che aspetti la liberazione!`, message);
  }
};

handler.help = ['.scappa'];
handler.tags = ['fun'];
handler.command = /^scappa$/i;

export default handler;