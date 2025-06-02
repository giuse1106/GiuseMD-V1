// Plugin fatto da Gabs & 333 Staff
const handler = async (m, { conn, participants, groupMetadata, args }) => {
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins
        .map((v, i) => `✧👑 ${i + 1}. @${v.id.split('@')[0]}`)
        .join('\n');
    const owner = groupMetadata.owner || 
        groupAdmins.find(p => p.admin === 'superadmin')?.id || 
        `${m.chat.split`-`[0]}@s.whatsapp.net`;

    let pesan = args.join(' ');
    let message = pesan ? pesan : '❌ Nessun messaggio fornito';

    let text = `
✎ *Messaggio:*  
➥ ${message}

♔ *Lista Admin:*  
${listAdmin}
`.trim();

    conn.reply(m.chat, text, m, { mentions: [...groupAdmins.map(v => v.id), owner] });
};

handler.command = ['tagadm', '@admins', 'dmins'];
handler.tags = ['group'];
handler.help = ['tagadm <messaggio>'];
handler.group = true;
handler.admin = true;

export default handler;
