import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

let handler = async (m, { conn, text, participants }) => {
    try {
        let users = participants.map(u => conn.decodeJid(u.id));
        let senderMention = `@${m.sender.split('@')[0]}`;
        let quotedMention = m.quoted ? `Messaggio di @${m.quoted.sender.split('@')[0]}` : '';
        let messageText = text || (m.quoted ? m.quoted.text : ""); // Se non c'è testo, prende quello del messaggio citato

        // 📌 Formato messaggio
        let formattedMessage = `
> 📌 *Taggato da:* ${senderMention}
${quotedMention ? `> 📩 *Citato:* ${quotedMention}` : ''}
*📩:* ${messageText}

`.trim();

        // 📸 Immagine dell'embed (modifica l'URL per cambiarla)
        let thumbnailUrl = "https://i.ibb.co/tTZsSTrg/paper-sheet-lined-page-isolated-on-transparent-background-png.webp"; 

        // 🗺️ Messaggio di posizione con immagine personalizzata
        let locationEmbed = {
            key: {
                participants: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                fromMe: false,
                id: "HideTag"
            },
            message: {
                locationMessage: {
                    name: "👀 𝐇𝐢𝐝𝐞𝐓𝐚𝐠",
                    jpegThumbnail: await (await fetch(thumbnailUrl)).buffer(),
                    vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
                }
            },
            participant: '0@s.whatsapp.net'
        };

        let quoted = m.quoted || m;
        let mime = (quoted.msg || quoted).mimetype || "";
        let isMedia = /image|video|sticker|audio/.test(mime);

        if (isMedia) {
            let media = await quoted.download();
            let options = { mentions: users, caption: formattedMessage };

            if (/image/.test(mime)) {
                await conn.sendMessage(m.chat, { image: media, ...options }, { quoted: locationEmbed });
            } else if (/video/.test(mime)) {
                await conn.sendMessage(m.chat, { video: media, ...options, mimetype: "video/mp4" }, { quoted: locationEmbed });
            } else if (/audio/.test(mime)) {
                await conn.sendMessage(m.chat, { audio: media, ...options, mimetype: "audio/mp4", fileName: "Hidetag.mp3" }, { quoted: locationEmbed });
            } else if (/sticker/.test(mime)) {
                await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: locationEmbed });
            }
        } else {
            await conn.sendMessage(m.chat, { text: formattedMessage, mentions: users }, { quoted: locationEmbed });
        }
    } catch (error) {
        console.error("Errore in .hidetag:", error);
        conn.reply(m.chat, "❌ Errore nell'esecuzione del comando!", m);
    }
};

// 📌 Configurazione del comando
handler.command = /^(hidetag|tag)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
