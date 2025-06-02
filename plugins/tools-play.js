import fetch from "node-fetch";
import yts from "yt-search";
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:\n> ${usedPrefix + command} Daddy Yankee - Con Calma`;

    try {
        const yt_play = await search(args.join(" "));
        let additionalText = '';

        if (command === 'play') {
            additionalText = `𝐝𝐞𝐥𝐥'𝐚𝐮𝐝𝐢𝐨`;
        } else if (command === 'video') {
            additionalText = '𝐝𝐞𝐥 𝐯𝐢𝐝𝐞𝐨';
        }

        // Nuovo nome del bot
        let nomeDelBot = `꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」`;

        const BixbyChar = (str) => {
            return str.split('').map(char => {
                switch (char) {
                    case 'A': return '𝐀'; case 'B': return '𝐁'; case 'C': return '��'; case 'D': return '𝐃'; case 'E': return '𝐄';
                    case 'F': return '𝐅'; case 'G': return '𝐆'; case 'H': return '𝐇'; case 'I': return '𝐈'; case 'J': return '𝐉';
                    case 'K': return '𝐊'; case 'L': return '𝐋'; case 'M': return '𝐌'; case 'N': return '𝐍'; case 'O': return '𝐎';
                    case 'P': return '𝐏'; case 'Q': return '𝐐'; case 'R': return '𝐑'; case 'S': return '𝐒'; case 'T': return '𝐓';
                    case 'U': return '𝐔'; case 'V': return '𝐕'; case 'W': return '𝐖'; case 'X': return '𝐗'; case 'Y': return '𝐘';
                    case 'Z': return '𝐙'; case 'a': return '𝐚'; case 'b': return '𝐛'; case 'c': return '𝐜'; case 'd': return '𝐝';
                    case 'e': return '𝐞'; case 'f': return '𝐟'; case 'g': return '𝐠'; case 'h': return '𝐡'; case 'i': return '𝐢';
                    case 'j': return '𝐣'; case 'k': return '𝐤'; case 'l': return '𝐥'; case 'm': return '𝐦'; case 'n': return '𝐧';
                    case 'o': return '𝐨'; case 'p': return '𝐩'; case 'q': return '𝐪'; case 'r': return '𝐫'; case 's': return '𝐬';
                    case 't': return '��'; case 'u': return '𝐮'; case 'v': return '𝐯'; case 'w': return '𝐰'; case 'x': return '𝐱';
                    case 'y': return '𝐲'; case 'z': return '𝐳';
                    default: return char;
                }
            }).join('');
        };

        const formattedText = BixbyChar(`
──────────────
- 🗣 ${BixbyChar(yt_play[0].author.name)}
- 🔖 ${BixbyChar(yt_play[0].title)}
- 🕛 ${secondString(yt_play[0].duration.seconds)}
- 🟢 𝐈𝐧𝐯𝐢𝐨 ${additionalText} 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...
──────────────`);

        await conn.sendMessage(m.chat, { text: formattedText, contextInfo: { externalAdReply: { title: yt_play[0].title, body: nomeDelBot, thumbnailUrl: yt_play[0].thumbnail, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: true } } }, { quoted: m });

        const videoUrl = yt_play[0].url;
        const videoTitle = yt_play[0].title.replace(/[^\w\s.-]/gi, ''); // Pulisce il titolo per nomi file
        const thumbnail = await fetch(yt_play[0].thumbnail);

        if (command == 'play') {
            try {
                // Comando yt-dlp per scaricare solo l'audio in mp3
                const audioFilePath = `./${videoTitle}_audio.mp3`;
                await execPromise(`yt-dlp -x --audio-format mp3 -o "${audioFilePath}" "${videoUrl}"`);
                
                await conn.sendMessage(m.chat, { audio: { url: audioFilePath }, mimetype: 'audio/mpeg', fileName: `${videoTitle}.mp3` }, { quoted: m });
            } catch (error) {
                console.error("Errore durante il download dell'audio con yt-dlp:", error);
                throw `Si è verificato un errore durante il download dell'audio. Riprova più tardi.`;
            }
        }

        if (command == 'video') {
            try {
                // Comando yt-dlp per scaricare il video in mp4
                const videoFilePath = `./${videoTitle}_video.mp4`;
                await execPromise(`yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${videoFilePath}" "${videoUrl}"`);
                
                await conn.sendMessage(m.chat, { video: { url: videoFilePath }, fileName: `${videoTitle}.mp4`, mimetype: 'video/mp4', caption: `${videoTitle}`, thumbnail: thumbnail.buffer() }, { quoted: m });
            } catch (error) {
                console.error("Errore durante il download del video con yt-dlp:", error);
                throw `Si è verificato un errore durante il download del video. Riprova più tardi.`;
            }
        }
    } catch (error) {
        console.error("Errore generale nell'handler:", error);
        throw `Si è verificato un errore: ${error.message || error}`;
    }
}

handler.command = ['play', 'video'];

export default handler;

// Funzioni di utilità (rimaste invariate)
async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "it", gl: "IT", ...options });
    return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1.";
    let arr = number.toString().split(".");
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join(".") : arr[0];
}

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
