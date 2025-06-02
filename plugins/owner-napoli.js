import { owner } from '../config.js'; // Adjust the path if config.js is in a different location

let handler = async (m, { conn, usedPrefix, participants, text }) => {
    // Filter out the bot's own JID and the owner's JID from the participants
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && !owner.includes(v));

    try {
        // You can add any additional logic here if needed before demotion
    } catch (e) {
        console.error("Error during demotion process:", e);
    } finally {
        conn.groupParticipantsUpdate(m.chat, users, 'demote');
    }
};

handler.help = ['*593xxx*', '*@usuario*', '*responder chat*'].map(v => 'demote ' + v);
handler.tags = ['group'];
handler.command = /^(napoli)$/i;
handler.group = true;
handler.owner = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
