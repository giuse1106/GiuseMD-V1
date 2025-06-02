import fetch from 'node-fetch';

// Importa owners da config.js. Assicurati che il percorso sia corretto!
import { owner } from '../config.js'; 

// Non abbiamo più bisogno di definire 'owners' e 'bots' qui se li gestiamo dinamicamente
// const owners = ["393445461546@s.whatsapp.net", "27620870446@s.whatsapp.net", "393272790038@s.whatsapp.net"];
// const bots = ["390813657301@s.whatsapp.net", "19173829810@s.whatsapp.net"];

// Funzione per determinare il ruolo dell'utente
export function getRole(userId, userDisplayName, groupAdmins, botJid) {
    // 1. OWNER - da config.js
    if (owner.includes(userId)) {
        return 'OWNER';
    }
    
    // 2. FROST STAN - rileva #FROST / #frost nel nome utente
    if (userDisplayName && (userDisplayName.includes('#FROST') || userDisplayName.includes('#frost'))) {
        return 'FROST STAN';
    }

    // 3. ADMIN - se l'utente è admin del gruppo
    if (groupAdmins && groupAdmins.includes(userId)) {
        return 'ADMIN';
    }

    // 4. BANNED - verificato dal database, se il ruolo è esplicitamente BANNED
    // (Questo sarà gestito dall'esistenza della proprietà .role nel database)

    // Se l'utente è il bot stesso
    if (userId === botJid) {
        return 'BOT'; // Un ruolo aggiuntivo per il bot, utile per visualizzazione
    }

    // 5. UTENTE - se non ha ruoli speciali o è il ruolo predefinito
    return 'UTENTE';
}

let handler = async (m, { conn, text, participants, isAdmin }) => {
    try {
        let userId;
        let isSender = false;

        if (text) {
            userId = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (!global.db.data.users[userId]) {
                throw '*L\'utente taggato non è registrato nel database.*';
            }
        } else if (m.quoted && m.quoted.sender) {
            userId = m.quoted.sender;
            if (!global.db.data.users[userId]) {
                throw '*L\'utente a cui hai risposto non è registrato nel database.*';
            }
        } else {
            userId = m.sender;
            isSender = true;
        }

        let userData = global.db.data.users[userId];
        
        // Inizializza l'utente se non esiste (dovrebbe essere già registrato se ha inviato messaggi)
        if (!userData) {
            global.db.data.users[userId] = {
                name: (await conn.getName(userId)) || 'Sconosciuto',
                messaggi: 0,
                warn: 0,
                blasphemy: 0,
                instagram: '',
                role: 'UTENTE' // Ruolo predefinito
            };
            userData = global.db.data.users[userId]; // Aggiorna userData dopo l'inizializzazione
        }


        let userBlasphemy = userData.blasphemy || 0;
        let userWarns = userData.warn || 0;
        let userInstagram = userData.instagram ? `instagram.com/${userData.instagram}` : 'Non impostato';
        
        // --- Determinazione del Ruolo ---
        let groupAdmins = [];
        if (m.isGroup) {
            groupAdmins = participants.filter(p => p.admin).map(p => p.id);
        }
        
        // Determina il ruolo basato sulla logica definita
        let currentRole = getRole(userId, userData.name, groupAdmins, conn.user.jid);
        
        // Se il ruolo è stato impostato manualmente con .setrole, prevale
        if (userData.role) {
            currentRole = userData.role;
        }

        let profileMessage = `———————————————
👤 *Utente: ${userData.name || 'Sconosciuto'}*
✨ *Ruolo: ${currentRole}* 💬 *Messaggi: ${userData.messaggi || 0}*
⚠️ *Warns: ${userWarns}/3*
🤬 *Bestemmie: ${userBlasphemy}*
📸 *Instagram:* ${userInstagram}
———————————————
꧁ *Versione* ${global.vs || 'Sconosciuta'} ꧂ `;

        let profilePicUrl = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png');
        let imageBuffer = await fetch(profilePicUrl).then(res => res.buffer());

        // Embed di posizione (rimane come prima, ma con il ruolo)
        let locationEmbed = {
            key: {
                participants: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                fromMe: false,
                id: "ProfilePic"
            },
            message: {
                locationMessage: {
                    name: `👤 ${userData.name || 'Sconosciuto'} | Ruolo: ${currentRole}`, // Aggiorna il nome nell'embed
                    jpegThumbnail: imageBuffer,
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;User;;;\nFN:User\nORG:Profile Picture\nEND:VCARD"
                }
            },
            participant: '0@s.whatsapp.net'
        };

        await conn.sendMessage(m.chat, {
            text: profileMessage,
            contextInfo: {
                mentionedJid: [userId],
                externalAdReply: {
                    title: `👤 ${userData.name || 'Sconosciuto'} | Ruolo: ${currentRole}`, // Aggiorna il titolo
                    body: `Messaggi: ${userData.messaggi || 0} | Ruolo: ${currentRole}`, // Aggiorna il corpo
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    thumbnail: imageBuffer,
                    sourceUrl: `${userInstagram}`.startsWith('instagram.com') ? `https://${userInstagram}` : `https://instagram.com/${userInstagram}`
                },
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418973546282@newsletter',
                    serverMessageId: '',
                    newsletterName: global.config?.bot?.name || '꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」'
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error("Errore nel comando info:", error);
        conn.reply(m.chat, `❌ Errore nell'esecuzione del comando! ${error.message || ''}`, m);
    }
};

handler.command = /^(info)$/i;
export default handler;
