// plugins/fun-rapisci.js

import { aggiungiInCantina, isInCantina, MAX_RAPITI, getCantina } from './fun-cantina.js';

let handler = async (message, { conn, usedPrefix }) => {
  const mentionedUsers = message.mentionedJid;

  if (!mentionedUsers || mentionedUsers.length === 0) {
    conn.reply(message.chat, 'Devi menzionare qualcuno da rapire! 🤔', message);
    return;
  }

  const utenteDaRapireId = mentionedUsers[0];
  const rapinatoreId = message.sender;
  const utenteDaRapireNome = await conn.getName(utenteDaRapireId);
  const rapinatoreNome = await conn.getName(rapinatoreId);
  const nomeCanale = await conn.getName(message.chat);

  if (utenteDaRapireId === rapinatoreId) {
    conn.reply(message.chat, 'Non puoi rapire te stesso! 🤪', message);
    return;
  }

  if (isInCantina(utenteDaRapireId)) {
    conn.reply(message.chat, `${utenteDaRapireNome} è già stato rapito! 🔒`, message);
    return;
  }

  if (aggiungiInCantina(utenteDaRapireId)) {
    await conn.sendMessage(message.chat, { react: { text: '😱', key: message.key } });
    await conn.sendMessage(message.chat, { react: { text: '⛓️', key: message.key } });
    await conn.sendMessage(message.chat, { react: { text: '🏃', key: message.key } });

    // Messaggio di conferma con tagging nel gruppo
    await conn.sendMessage(message.chat, {
      text: `🚨 *RAPIMENTO!* 🚨\n\n@${utenteDaRapireId.split('@')[0]} è stato rapito da @${rapinatoreId.split('@')[0]} in ${nomeCanale}! Attendi la liberazione o prova a scappare con \`\`\`.scappa\`\`\` 🏃💨`,
      contextInfo: {
        mentionedJid: [utenteDaRapireId, rapinatoreId],
      },
    });

    // Messaggio privato all'utente rapito (opzionale)
    // await conn.sendMessage(utenteDaRapireId, {
    //   text: `Sei stato rapito da @${rapinatoreId.split('@')[0]} in ${nomeCanale}! Attendi la liberazione o prova a scappare con \`\`\`.scappa\`\`\` 🔒`,
    //   contextInfo: {
    //     mentionedJid: [rapinatoreId],
    //   },
    // });

  } else {
    conn.reply(message.chat, `La cantina è piena! Devi liberare qualcuno con \`.libera @user\` per poter rapire ${utenteDaRapireNome}! 😥`, message);
  }
};

handler.help = ['.rapisci @user'];
handler.tags = ['fun'];
handler.command = /^rapisci$/i;

export default handler;