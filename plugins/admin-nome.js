let handler = async (m, { conn, args }) => {
    if (!args || args.length === 0) {
        return conn.sendMessage(m.chat, { text: '𝐍𝐨𝐦𝐞 𝐢𝐧𝐯𝐚𝐥𝐢𝐝𝐨.' });
    }

    try {
        let groupName = args.join(' ');
        await conn.groupUpdateSubject(m.chat, groupName);
        await conn.sendMessage(m.chat, { text: `𝐍𝐨𝐦𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 𝐜𝐚𝐦𝐛𝐢𝐚𝐭𝐨 ✔︎` });
    } catch {
        await conn.sendMessage(m.chat, { text: '⚠️ 𝐄𝐫𝐫𝐨𝐫𝐞.' });
    }
};

handler.help = ['nome <nuovo nome>'];
handler.tags = ['group'];
handler.command = /^(nome)$/i;
handler.group = true;
handler.admin = true;

export default handler;
