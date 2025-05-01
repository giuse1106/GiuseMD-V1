// Crediti By Giu

import os from 'os';
import util from 'util';
import sizeFormatter from 'human-readable';
import fetch from 'node-fetch';
import fs from 'fs';
import { performance } from 'perf_hooks';

function runtime(seconds) {
  seconds = Number(seconds);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = Math.floor(seconds % 60);

  const dayDisplay = days > 0 ? `${days} giorn${days === 1 ? 'o' : 'i'}, ` : '';
  const hourDisplay = hours > 0 ? `${hours} or${hours === 1 ? 'a' : 'e'}, ` : '';
  const minuteDisplay = minutes > 0 ? `${minutes} minut${minutes === 1 ? 'o' : 'i'}, ` : '';
  const secondDisplay = sec > 0 ? `${sec} second${sec === 1 ? 'o' : 'i'}` : '';

  return dayDisplay + hourDisplay + minuteDisplay + secondDisplay;
}

async function handler(m, { conn, usedPrefix }) {
  try {
    const uptime = runtime(process.uptime());

    let totalreg = 0;
    let groups = 0;
    try {
      totalreg = Object.keys(global.db.data.users).length;
      const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
      groups = chats.filter(([id]) => id.endsWith('@g.us')).length;
    } catch (error) {
      console.error('Errore nel recupero utenti/gruppi:', error);
    }

    const used = process.memoryUsage();
    const start = performance.now();
    const end = performance.now();
    const speed = (end - start).toFixed(4);  

    const info = `
╭━〔 *⚙️ Informazioni del Bot* 〕━╮

> 🟢 *Attività:*
➤ ${uptime}

> 🚀 *Velocità:*
➤ ${speed} 𝐬

> 👤 *Utenti*
➤ *${totalreg}* 𝐮𝐭𝐞𝐧𝐭𝐢 𝐧𝐞𝐥 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞

> 👥 *Gruppi*
➤ *${groups}* 𝐠𝐫𝐮𝐩𝐩𝐢 𝐧𝐞𝐥 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞

╰━━━━━━━━━━━━━━━╯  `.trim();

    // URL immagine personalizzata (modifica con il tuo link)
    const imageUrl = "https://i.ibb.co/hJs4dntg/Untitled7-20250324202259.png";
    const imageBuffer = await fetch(imageUrl).then(res => res.buffer());

    // Invia il messaggio con embed di posizione
    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: "🏓 𝐏𝐨𝐧𝐠",
          body: "𝐁𝐨𝐭 𝐚𝐭𝐭𝐢𝐯𝐨 𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐧𝐭𝐞!",
          mediaType: 1,
          renderlargerthumbnail: false,
          thumbnail: imageBuffer,
          sourceUrl: "https://wa.me/" + conn.user.jid.split('@')[0]
        }
      }
    });

  } catch (error) {
    console.error("Errore nel comando infobot:", error);
    conn.reply(m.chat, "❌ Errore nell'esecuzione del comando!", m);
  }
}

handler.help = ['infobot', 'speed'];
handler.tags = ['info', 'tools'];
handler.command = ['ping'];

export default handler;