import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, isOwner }) => {
    if (!isOwner) {
        m.reply('Solo il proprietario del bot può usare questo comando.');
        return;
    }

    if (!text) {
        m.reply('Inserisci il messaggio del podcast.');
        return;
    }

    let animazioniReazione = ['🔊', '📢', '📣', '🎧'];
    let animazioneCasuale = animazioniReazione[Math.floor(Math.random() * animazioniReazione.length)];

    let groups = Object.entries(conn.chats)
        .filter(([jid, chat]) => jid.endsWith('@g.us') && !chat.isReadOnly)
        .map(v => v[0]);

    m.reply(`Inizio trasmissione podcast a ${groups.length} gruppi...`);

    for (let jid of groups) {
        try {
            const template = generateWAMessageFromContent(jid, proto.Message.fromObject({
                templateMessage: {
                    hydratedTemplate: {
                        hydratedContentText: text,
                        hydratedFooterText: `🎙️ Podcast trasmesso da ${await conn.getName(m.sender)} (Owner)`,
                        hydratedButtons: [],
                        hydratedTitleText: '📢 Annuncio Podcast!',
                    }
                }
            }), { userJid: conn.user.jid });

            await conn.relayMessage(jid, template.message, { messageId: template.key.id });
            await conn.sendMessage(jid, { react: { text: animazioneCasuale, key: template.key } });
            await delay(1500); // Attendere un breve periodo per evitare flood
        } catch (e) {
            console.error(`Errore durante l'invio al gruppo ${jid}: ${e}`);
        }
    }

    m.reply(`Trasmissione podcast completata a ${groups.length} gruppi.`);
};

handler.help = ['podcast <messaggio>'];
handler.tags = ['owner'];
handler.command = /^podcast$/i;
handler.owner = true;

export default handler;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
