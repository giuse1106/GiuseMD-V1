//Crediti By Giusee

import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x512ed3, { conn, usedPrefix }) => {
  const {
    antiToxic,
    antilinkhard,
    antiPrivate,
    antitraba,
    antiArab,
    antiviewonce,
    isBanned,
    welcome,
    detect,
    sWelcome,
    sBye,
    sPromote,
    sDemote,
    antiLink,
    antilinkbase,
    antitiktok,
    sologruppo,
    soloprivato,
    antiCall,
    modohorny,
    gpt,
    antiinsta,
    antielimina,
    antitelegram,
    antiSpam,
    antiPorno,
    jadibot,
    autosticker,
    modoadmin,
    audios
  } = global.db.data.chats[_0x512ed3.chat];

  let senderJid = _0x512ed3.quoted ? _0x512ed3.quoted.sender : _0x512ed3.mentionedJid?.[0] || (_0x512ed3.fromMe ? conn.user.jid : _0x512ed3.sender);
  const profilePicture = (await conn.profilePictureUrl(senderJid, "image").catch(() => null)) || "./src/avatar_contact.png";
  const thumbnail = profilePicture !== "./src/avatar_contact.png" ? await (await fetch(profilePicture)).buffer() : await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();

  const fakeMessage = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: "Halo",
    },
    message: {
      locationMessage: {
        name: "🔍 *Menù delle Funzionalità* 🤖",
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
      },
    },
    participant: "0@s.whatsapp.net",
  };

  let menuText = `
 ${detect ? '✅' : '❌'} » *detect* 🔍
 ${gpt ? '✅' : '❌'} » *gpt* 🤖
 ${welcome ? '✅' : '❌'} » *benvenuto* 👋🏻
 ${sologruppo ? '✅' : '❌'} » *sologruppo* 👥
 ${soloprivato ? '✅' : '❌'} » *soloprivato* 👤
 ${modoadmin ? '✅' : '❌'} » *modoadmin* 👑
 ${antiCall ? '✅' : '❌'} » *anticall* 📵
 ${antiArab ? '✅' : '❌'} » *antipaki* 🇮🇹
 ${antiLink ? '✅' : '❌'} » *antilink* 🔗
 ${antiinsta ? '✅' : '❌'} » *antiinsta* 📸
 ${antielimina ? '✅' : '❌'} » *antielimina* ✏️

> ℹ️ *Info sulle funzioni:*
✅ » Funzione attivata
❌ » Funzione disattivata

> 🛠️ *Uso del comando:*
✅ » ${usedPrefix}attiva _funzione_
❌ » ${usedPrefix}disabilita _funzione_

> ⚙️ *Info sullo stato:*
🔍 » ${usedPrefix}infostato
`;

  conn.sendMessage(_0x512ed3.chat, {
    text: menuText,
    contextInfo: {
      mentionedJid: conn.parseMention(wm),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363418973546282@newsletter",
        serverMessageId: '',
        newsletterName: ' ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」 '
      }
    }
  }, { quoted: fakeMessage });
};

handler.help = ["funzioni"];
handler.tags = ["main"];
handler.command = /^(funzioni)$/i;

export default handler;

function clockString(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor(ms / 60000) % 60;
  const seconds = Math.floor(ms / 1000) % 60;
  return [hours, minutes, seconds].map(v => v.toString().padStart(2, 0)).join(':');
}
