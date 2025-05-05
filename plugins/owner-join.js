const handler = async (m, { conn, args, isOwner }) => {
    if (!isOwner) {
        return m.reply('👑 *Solo il mio creatore può usare questo comando!* 👑');
    }

    if (!args[0]) {
        return m.reply('⚠️ *Devi specificare il link del gruppo/canale!* ⚠️');
    }

    const link = args[0];
    const isInvite = link.match(/(?:https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})/i);

    if (!isInvite) {
        return m.reply('❌ *Il link fornito non sembra essere un link di invito valido per WhatsApp!* ❌');
    }

    const inviteCode = isInvite[1];

    try {
        await conn.groupAcceptInvite(inviteCode)
            .then((res) => {
                m.reply(`✅ *Bot entrato con successo nel gruppo/canale!* ✅\nID Chat: ${res}`);
            })
            .catch((err) => {
                console.error('Errore nell\'entrare nel gruppo:', err);
                m.reply(`❌ *Impossibile entrare nel gruppo/canale.* ❌\nErrore: ${err}`);
            });
    } catch (e) {
        console.error('Errore imprevisto:', e);
        m.reply(`❗ *Si è verificato un errore imprevisto!* ❗\n${e}`);
    }
};

handler.command = /^join$/i;
handler.owner = true;
handler.help = ['join <link_whatsapp>'];
handler.tags = ['owner'];

export default handler;