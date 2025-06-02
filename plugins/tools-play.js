import fetch from "node-fetch";
import yts from "yt-search";
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) {
        throw `> 🎧 **Per scaricare audio da YouTube**\n> ℹ️ Usa: \`${usedPrefix + command} Titolo della canzone o Link YouTube\``;
    }

    try {
        await m.reply(`*🎶 Ricerca audio per:* _"${text}"_`);

        const searchResults = await yts.search({ query: args.join(" "), hl: "it", gl: "IT" });
        if (!searchResults.videos.length) {
            throw `Non ho trovato nessun risultato per: _"${text}"_ 😔`;
        }

        const yt_info = searchResults.videos[0]; // Prendiamo il primo risultato
        const videoUrl = yt_info.url;
        const videoTitle = yt_info.title;
        const videoDuration = secondString(yt_info.duration.seconds);
        const thumbnailUrl = yt_info.thumbnail;
        const authorName = yt_info.author.name;

        let nomeDelBot = `꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」`;

        const confirmationMessage = `
*🎵 Dettagli Audio Trovato:*

*🎤 Artista:* ${authorName}
*📄 Titolo:* ${videoTitle}
*⏳ Durata:* ${videoDuration}
*🔗 Link:* ${videoUrl}

*Inviando l'audio... attendi un momento!*
`;

        await conn.sendMessage(m.chat, {
            text: confirmationMessage,
            contextInfo: {
                externalAdReply: {
                    title: videoTitle,
                    body: nomeDelBot,
                    thumbnailUrl: thumbnailUrl,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        // Pulizia del titolo per il nome del file
        const safeTitle = videoTitle.replace(/[^\w\s.-]/gi, '').substring(0, 100); // Limita la lunghezza per sicurezza
        const audioFilePath = `./temp_audio_${Date.now()}.mp3`; // Usa un nome file temporaneo unico

        try {
            // Esecuzione di yt-dlp per scaricare solo l'audio in mp3
            const { stdout, stderr } = await execPromise(`yt-dlp -x --audio-format mp3 -o "${audioFilePath}" "${videoUrl}"`);
            
            if (stderr && !stderr.includes('WARNING')) { // Ignora i warning minori
                console.error('yt-dlp stderr:', stderr);
                // Puoi decidere di lanciare un errore qui se il stderr è significativo
            }

            await conn.sendMessage(m.chat, {
                audio: { url: audioFilePath },
                mimetype: 'audio/mpeg',
                fileName: `${safeTitle}.mp3`,
                caption: `*🎵 Ecco il tuo audio:*\n*Titolo:* ${videoTitle}\n*Durata:* ${videoDuration}\n\n_Powered by ${nomeDelBot}_`
            }, { quoted: m });

            // Elimina il file temporaneo dopo l'invio
            await execPromise(`rm "${audioFilePath}"`);

        } catch (downloadError) {
            console.error("Errore durante il download o l'invio dell'audio con yt-dlp:", downloadError);
            throw `Si è verificato un problema nel scaricare l'audio. Riprova più tardi.`;
        }

    } catch (error) {
        console.error("Errore nell'handler del comando play:", error);
        await m.reply(`*❌ Errore:* ${error.message || 'Si è verificato un errore inatteso.'}`);
    }
};

handler.help = ['play <titolo/link>'];
handler.tags = ['downloader'];
handler.command = ['play']; // Il comando è solo 'play' ora
handler.group = false; // Puoi decidere se può essere usato solo in gruppi o no
handler.private = false; // Puoi decidere se può essere usato solo in chat private o no
handler.fail = null;

export default handler;

// Funzione di utilità per la ricerca (non modificata significativamente)
async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "it", gl: "IT", ...options });
    return search.videos;
}

// Funzione per formattare la durata (non modificata)
function secondString(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " giorno, " : " giorni, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " ora, " : " ore, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minuti, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " secondo" : " secondi") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
