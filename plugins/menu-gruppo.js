// Crediti by Gabs
import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  let thumbnail = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();

  const msgMenu = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: "𝐌𝐞𝐧𝐮 𝐆𝐫𝐮𝐩𝐩𝐨",
        jpegThumbnail: thumbnail,
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nEND:VCARD"
      }
    },
    participant: "0@s.whatsapp.net"
  };

  let menu = `
👥 *𝐌𝐞𝐧𝐮 𝐆𝐫𝐮𝐩𝐩𝐨* 👥

💋 *Interazione*
• ${usedPrefix}abbraccia @
• ${usedPrefix}mordi @
• ${usedPrefix}lecca @
• ${usedPrefix}crush @
• ${usedPrefix}amore @

🧠 *Testo & Utility*
• ${usedPrefix}rileggi (messaggio)
• ${usedPrefix}meteo (città)
• ${usedPrefix}styletext
• ${usedPrefix}calc 1+1

📸 *Immagini*
• ${usedPrefix}hd (foto)
• ${usedPrefix}leggi (foto)
• ${usedPrefix}rimuovisfondo (foto)
• ${usedPrefix}rivela (foto)

🔧 *Extra*
• ${usedPrefix}qr (testo)
• ${usedPrefix}dado
• ${usedPrefix}ttp (testo)
• ${usedPrefix}tris
• ${usedPrefix}topgays
• ${usedPrefix}topnazi

🎭 *Sticker e Media*
• ${usedPrefix}s / sticker
• ${usedPrefix}tovideo
• ${usedPrefix}togif

⚙️ *Impostazioni*
• ${usedPrefix}setig
• ${usedPrefix}eliminaig
• ${usedPrefix}id

> 「 ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」 」
`.trim();

  conn.sendMessage(m.chat, {
    text: menu,
    contextInfo: {
      mentionedJid: conn.parseMention(menu),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363418973546282@newsletter",
        serverMessageId: '',
        newsletterName: global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」"
      }
    }
  }, { quoted: msgMenu });
};

handler.help = ["menugruppo"];
handler.tags = ['menu'];
handler.command = /^(menugruppo|gruppo)$/i;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}