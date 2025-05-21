const handler = async (m, { conn }) => {
  const user = global.db.data.users;
  let txt = `𝐋𝐈𝐒𝐓𝐀 𝐃𝐄𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐃𝐈 ${nomebot}`;
  const fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
      } 
    }, 
    "participant": "0@s.whatsapp.net" 
  };

  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
  const groupsSortedByMessages = [...groups].sort((a, b) => {
    const groupMessagesA = db.data.chats[a[0]]?.messaggi || 0;
    const groupMessagesB = db.data.chats[b[0]]?.messaggi || 0;
    return groupMessagesB - groupMessagesA;
  });

  txt += `\n\n➣ 𝐓𝐨𝐭𝐚𝐥𝐞 𝐆𝐫𝐮𝐩𝐩𝐢: ${groupsSortedByMessages.length}\n;

  for (let i = 0; i < groupsSortedByMessages.length; i++) {
    const [jid, chat] = groupsSortedByMessages[i];
    
    // Recupero dei metadati del gruppo
    let groupMetadata = {};
    try {
      groupMetadata = ((conn.chats[jid] || {}).metadata || await conn.groupMetadata(jid)) || {};
    } catch {
      // Se c'è un errore, continua con i metadati di default
    }

    const participants = groupMetadata.participants || [];
    const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
    const isBotAdmin = bot?.admin || false;
    const totalParticipants = participants.length;

    // Recupero del nome del gruppo
    let groupName = 'Nome non disponibile';
    try {
      groupName = await conn.getName(jid);
    } catch {
      // Se c'è un errore, continua con il nome di default
    }

    // Recupero dei messaggi del gruppo
    const groupMessages = db.data.chats[jid]?.messaggi || 0;
    
    // Recupero del link di invito al gruppo
    let groupInviteLink = 'Non sono admin';
    if (isBotAdmin) {
      try {
        groupInviteLink = `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || 'Errore'}`;
      } catch {
        // Se c'è un errore, continua con il link di default
      }
    }

    // Aggiungi le informazioni al testo
    txt += `➣ 𝐧𝐮𝐦𝐞𝐫𝐨: ${i + 1}\n`;
    txt += `➣ 𝐧𝐨𝐦𝐞: ${groupName}\n`; // Nome del Gruppo
    txt += `➣ 𝐦𝐞𝐦𝐛𝐫𝐢: ${totalParticipants}\n`;
    txt += `➣ 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢: ${groupMessages}\n`;
    txt += `➣ 𝐚𝐝𝐦𝐢𝐧: ${isBotAdmin ? '✓' : '☓'}\n`;
    txt += `➣ 𝐢𝐝: ${jid}\n`;
    txt += `➣ 𝐥𝐢𝐧𝐤: ${groupInviteLink}\n`;
  }

  // Invia il testo raccolto
  m.reply(txt.trim());
}
handler.command = /^(gruppi)$/i;
handler.owner = true;
export default handler;
