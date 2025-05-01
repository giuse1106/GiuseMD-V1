let setig = async (m, { text, conn }) => {
    let userId = m.sender;
    let userData = global.db.data.users[userId];

    if (!text) {
        return conn.reply(m.chat, "❌ *Errore:* Devi specificare il tuo nome utente Instagram!\n📌 *Esempio:* `.setig nomeutente`", m);
    }

    if (text.length > 30) {
        return conn.reply(m.chat, "⚠️ *Errore:* Il nome utente di Instagram non può superare i 30 caratteri.", m);
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(text)) {
        return conn.reply(m.chat, "⚠️ *Errore:* Il nome utente può contenere solo lettere, numeri, punti e underscore.", m);
    }

    userData.instagram = text;
    conn.reply(m.chat, `✅ *Instagram impostato con successo!*\n📸 Ora nel tuo profilo apparirà: instagram.com/${text}`, m);
};

setig.command = /^(setig)$/i;
export default setig;