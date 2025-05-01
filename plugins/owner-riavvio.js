const handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) throw '❌ *Errore:* Usa `node index.js` invece di `node main.js`';

    // 📍 Embed con posizione
    let locationEmbed = {
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: "Reboot"
        },
        message: {
            locationMessage: {
                degreesLatitude: 48.858844,  // Latitudine fittizia (modifica se necessario)
                degreesLongitude: 2.294351,  // Longitudine fittizia (modifica se necessario)
                name: "𝐌𝐨𝐨𝐧𝐌𝐃 - 𝐒𝐞𝐫𝐯𝐞𝐫",
                address: "Server principale di MoonMD"
            }
        },
        participant: "0@s.whatsapp.net"
    };

    const { key } = await conn.sendMessage(m.chat, { text: `𝐑𝐢𝐚𝐯𝐯𝐢𝐨 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨... ` }, { quoted: locationEmbed });
    await delay(1000 * 1);

    const steps = [
        '𝐄𝐓𝐀: 30𝐬', '⬜⬜⬜⬜⬜⬜⬜⬜⬜  🔄',
        '🟩⬜⬜⬜⬜⬜⬜⬜⬜  🔃', '🟩🟩⬜⬜⬜⬜⬜⬜⬜  🔄',
        '🟩🟩🟩⬜⬜⬜⬜⬜⬜  🔃', '🟩🟩🟩🟩⬜⬜⬜⬜⬜  🔄',
        '🟩🟩🟩🟩🟩⬜⬜⬜⬜  🔃', '🟩🟩🟩🟩🟩🟩⬜⬜⬜  🔄',
        '🟩🟩🟩🟩🟩🟩🟩⬜⬜  🔃', '🟩🟩🟩🟩🟩🟩🟩🟩⬜  🔄',
        '🟩🟩🟩🟩🟩🟩🟩🟩🟩  🔃', '✅ 𝐑𝐢𝐚𝐯𝐯𝐢𝐨 𝐞𝐟𝐟𝐞𝐭𝐭𝐮𝐚𝐭𝐨 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨!'
    ];

    for (let step of steps) {
        await conn.sendMessage(m.chat, { text: step, edit: key });
        await delay(1000 * 1);
    }

    process.exit(0);
};

handler.help = ['riavvia'];
handler.tags = ['owner'];
handler.command = ['riavvia', 'reiniciar'];
handler.owner = true;

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));