import { areJidsSameUser } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, isGroupAdmin, isSuperAdmin }) => {
    if (!isGroupAdmin && !isSuperAdmin) {
        return m.reply('Solo gli amministratori possono usare questo comando.');
    }

    if (!text) {
        return m.reply('Inserisci il numero di messaggi da eliminare (massimo 30).');
    }

    const count = parseInt(text);

    if (isNaN(count) || count <= 0 || count > 30) {
        return m.reply('Il numero di messaggi da eliminare deve essere compreso tra 1 e 30.');
    }

    const chat = m.chat;
    const messagesToDelete = [];
    let deletedCount = 0;
    const participants = {};

    const allMessages = await conn.loadMessages(chat, count);

    for (const msg of allMessages) {
        if (messagesToDelete.length < count) {
            messagesToDelete.push({ id: msg.key.id, participant: msg.key.participant });
            const sender = msg.key.participant || msg.key.remoteJid;
            participants[sender] = (participants[sender] || 0) + 1;
            deletedCount++;
        } else {
            break;
        }
    }

    if (messagesToDelete.length > 0) {
        try {
            await conn.sendMessage(chat, { delete: { keys: messagesToDelete } });

            let summary = `Eliminati ${deletedCount} messaggi da:\n`;
            for (const sender in participants) {
                const name = await conn.getName(sender);
                summary += `- ${name} (${participants[sender]} messaggi)\n`;
            }

            m.reply(summary.trim());

        } catch (error) {
            console.error('Errore durante l\'eliminazione dei messaggi:', error);
            m.reply('Si è verificato un errore durante l\'eliminazione dei messaggi.');
        }
    } else {
        m.reply('Nessun messaggio trovato da eliminare.');
    }
};

handler.help = ['.purge <numero>'];
handler.tags = ['group', 'admin'];
handler.command = /^purge$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true; // Il bot deve essere admin per eliminare i messaggi

export default handler;
