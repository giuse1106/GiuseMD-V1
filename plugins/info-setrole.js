import { owner } from '../config.js'; // Assicurati che il percorso a config.js sia corretto
import { getRole } from './info-msg.js'; // Importiamo la funzione per determinare il ruolo

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
    // Comando solo per gli Owner
    if (!owner.includes(m.sender)) {
        throw 'Questo comando può essere usato solo dagli *Owner* del bot.';
    }

    if (!text) {
        throw `*Uso corretto:* ${usedPrefix}${command} <numero/@tag> <ruolo>\n\nEsempio: ${usedPrefix}${command} @${m.sender.split('@')[0]} OWNER\n\nRuoli disponibili: OWNER, FROST STAN, ADMIN, BANNED, UTENTE`;
    }

    let args = text.split(' ');
    let target = args[0];
    let newRole = args.slice(1).join(' ').toUpperCase(); // Il resto del testo è il ruolo

    let userId;
    // Cerca l'ID utente dal numero o dal tag
    if (target.startsWith('@')) {
        let mentionedJid = m.mentionedJid && m.mentionedJid[0];
        if (mentionedJid) {
            userId = mentionedJid;
        } else {
            // Se non è stato taggato correttamente ma c'è un @
            let number = target.replace(/[^0-9]/g, '');
            if (number) userId = number + '@s.whatsapp.net';
        }
    } else if (target.match(/^\d+$/)) { // Se è un numero
        userId = target + '@s.whatsapp.net';
    } else {
        throw `Formato utente non valido. Usa un numero o tagga l'utente.`;
    }

    if (!userId || !global.db.data.users[userId]) {
        throw `*Utente non trovato o non registrato nel database.* Assicurati che l'utente abbia inviato almeno un messaggio al bot.`;
    }

    const validRoles = ['OWNER', 'FROST STAN', 'ADMIN', 'BANNED', 'UTENTE'];
    if (!validRoles.includes(newRole)) {
        throw `Ruolo non valido. I ruoli disponibili sono: ${validRoles.join(', ')}`;
    }

    // Caso speciale: OWNER può essere impostato solo se l'utente è in config.js
    if (newRole === 'OWNER') {
        if (!owner.includes(userId)) {
            throw `Non puoi impostare il ruolo OWNER a un utente che non è presente nella lista owners di config.js.`;
        }
    }
    
    // Non permettere di bannare il bot o un owner
    if (newRole === 'BANNED' && (owner.includes(userId) || userId === conn.user.jid)) {
        throw `Non puoi bannare un Owner o il bot.`;
    }

    // Imposta il ruolo nel database
    global.db.data.users[userId].role = newRole;

    await conn.reply(m.chat, `✅ Il ruolo di @${userId.split('@')[0]} è stato impostato su *${newRole}*.`, null, { mentions: [userId] });
};

handler.help = ['.setrole <numero/@tag> <ruolo>'];
handler.tags = ['owner'];
handler.command = /^setrole$/i;
handler.owner = true; // Solo owner può usare questo comando
handler.group = true; // Funziona in gruppo
handler.botAdmin = false;
handler.fail = null;

export default handler;
