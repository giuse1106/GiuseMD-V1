// plugins/fun-libera.js

import { rimuoviDaCantina, isInCantina } from './fun-cantina.js';

let handler = async (message, { conn, usedPrefix }) => {
  const mentionedUsers = message.mentionedJid;

  if (!mentionedUsers || mentionedUsers.length === 0) {
    conn.reply(message.chat, 'Devi menzionare qualcuno da liberare! 🤔', message);
    return;
  }

  const utenteDaLiberareId = mentionedUsers[0];
  const liberatoreId = message.sender;
  const utenteDaLiberareNome = await conn.getName(utenteDaLiberareId);
  const liberatoreNome = await conn.getName(liberatoreId);

  if (!isInCantina(utenteDaLiberareId)) {
    conn.reply(message.chat, `${utenteDaLiberareNome} non è nella cantina! 🤷`, message);
    return;
  }

  if (rimuoviDaCantina(utenteDaLiberareId)) {
    await conn.sendMessage(message.chat, { react: { text: '🕊️', key: message.key } });
    await conn.sendMessage(message.chat, { react: { text: '🔓', key: message.key } });

    await conn.sendMessage(message.chat, {
      text: `🎉 **LIBERAZIONE!** 🎉\n\n@${utenteDaLiberareId.split('@')[0]} è stato liberato dalla cantina da @${liberatoreId.split('@')[0]}! Ora è di nuovo libero di scorrazzare! 🥳`,
      contextInfo: {
        mentionedJid: [utenteDaLiberareId, liberatoreId],
      },
    });

    // Messaggio privato all'utente liberato (opzionale)
    // await conn.sendMessage(utenteDaLiberareId, {
    //   text: `Sei stato liberato dalla cantina da @${liberatoreId.split('@')[0]}! Ben tornato alla libertà! 😄`,
    //   contextInfo: {
    //     mentionedJid: [liberatoreId],
    //   },
    // });

  } else {
    conn.reply(message.chat, `Non sono riuscito a liberare ${utenteDaLiberareNome}. Qualcosa è andato storto! 😓`, message);
  }
};

handler.help = ['.libera @user'];
handler.tags = ['fun'];
handler.command = /^libera$/i;

export default handler;