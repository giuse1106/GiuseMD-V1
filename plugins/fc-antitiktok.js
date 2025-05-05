// cc by Giusee.

// Definiamo una funzione che contiene un array di stringhe "offuscate".
// Questa funzione e la successiva (_0x8b52) servono a rendere il codice meno leggibile.
// In un codice più comprensibile, queste stringhe sarebbero scritte direttamente.
function getObfuscatedStrings() {
    const obfuscatedArray = [
        'jid', '0@s.whatsapp.net', 'groupParticipantsUpdate', 'sender', '82851kPccdO', 'users',
        'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD',
        'settings', '3806472FwYEzY', 'vm.tiktok.com',
        '⚠\x20𝐋𝐈𝐍𝐊\x20𝐓𝐈𝐊\x20𝐓𝐎𝐊\x20𝐍𝐎𝐍\x20𝐒𝐎𝐍𝐎\x20𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈\x20\x20\x0a\x20*',
        '80ziIaog', '*\x20°\x20𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐎', 'warn', '643886btFqVI', 'key',
        'https://telegra.ph/file/5dd0169efd3a5c1b99017.png', 'user', '2423331JsAcNq', 'reply',
        '4299705xrrMWQ', 'data', 'antitiktok', '1116061aAckoS', '17106wByFSU', 'chat', 'exec',
        '100yOmRnR', 'fromMe', '2842oZJtbl', '𝐀𝐧𝐭𝐢\x20-\x20𝐓𝐢𝐤𝐓𝐨𝐤\x20', 'remove', 'isGroup',
        'text', '⛔\x20𝐔𝐓𝐄𝐍𝐓𝐄\x20𝐑𝐈𝐌𝐎𝐒𝐒𝐎\x20𝐃𝐎𝐏𝐎\x20𝟑\x20𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐈'
    ];
    // Questa parte assicura che la funzione restituisca sempre l'array.
    getObfuscatedStrings = function () {
        return obfuscatedArray;
    };
    return getObfuscatedStrings();
}

// Questa funzione prende un indice numerico e restituisce la stringa corrispondente dall'array "offuscato".
function getDecodedString(index) {
    const obfuscatedArray = getObfuscatedStrings();
    // L'indice viene "aggiustato" sottraendo un valore fisso (0x1cc).
    // Questo è parte del meccanismo di offuscamento.
    index = index - 0x1cc;
    // Restituisce la stringa all'indice specificato.
    return obfuscatedArray[index];
}

// Questa è una Immediately Invoked Function Expression (IIFE).
// Prende come argomenti la funzione getObfuscatedStrings e un valore numerico (0x9a91f).
// Il suo scopo è quello di rendere il codice più difficile da capire tramite manipolazioni dell'array di stringhe.
(function (obfuscationFunction, magicNumber) {
    const stringGetter = getDecodedString;
    const initialArray = obfuscationFunction();
    // Questo ciclo while continua indefinitamente (!![] è sempre vero).
    while (!![]) {
        try {
            // In questa sezione vengono eseguite operazioni matematiche complesse
            // utilizzando le stringhe "decodificate". Questo è un altro modo per offuscare il codice.
            const result = -parseInt(stringGetter(0x1cd)) / 0x1 + -parseInt(stringGetter(0x1e7)) / 0x2 +
                -parseInt(stringGetter(0x1dd)) / 0x3 * (-parseInt(stringGetter(0x1d1)) / 0x4) +
                parseInt(stringGetter(0x1ed)) / 0x5 + parseInt(stringGetter(0x1ce)) / 0x6 *
                (-parseInt(stringGetter(0x1d3)) / 0x7) + -parseInt(stringGetter(0x1e1)) / 0x8 +
                -parseInt(stringGetter(0x1eb)) / 0x9 * (-parseInt(stringGetter(0x1e4)) / 0xa);
            // Se il risultato è uguale al "magicNumber", il ciclo si interrompe.
            if (result === magicNumber) break;
            else initialArray['push'](initialArray['shift']());
        } catch (error) {
            // Se si verifica un errore, l'array viene manipolato.
            initialArray['push'](initialArray['shift']());
        }
    }
})(getObfuscatedStrings, 0x9a91f);

// Definiamo una regular expression (un modello di testo) per trovare i link di TikTok.
// /vm\.tiktok\.com/i significa: cerca la stringa "vm.tiktok.com" senza distinzione tra maiuscole e minuscole (il flag "i").
const tiktokLinkRegex = /vm\.tiktok\.com/i;

// Questa è la funzione principale che verrà eseguita prima che un messaggio venga processato.
// "m" rappresenta l'oggetto del messaggio, e il secondo argomento è un oggetto contenente varie informazioni sul contesto.
export async function before(m, { isAdmin, groupMetadata, isBotAdmin }) {
    // Usiamo la funzione getDecodedString per ottenere le stringhe originali.
    const DECODED_STRING = getDecodedString;

    // Se il messaggio è stato inviato dal bot stesso (isBaileys) e ha un tag "fromMe" nella chiave, lo ignoriamo.
    if (m['isBaileys'] && m['key'] && m['key']['fromMe']) {
        return true; // Indica che il messaggio è stato gestito e non deve essere processato ulteriormente.
    }
    // Se il messaggio non proviene da una chat (ha un tipo diverso da "chat"), lo ignoriamo.
    if (!m['chat']) {
        return true;
    }

    // Otteniamo le impostazioni della chat dal database globale.
    let chatSettings = global['db']['data']['chats'][m['chat']];
    // Se le impostazioni della chat non esistono, usciamo.
    if (!chatSettings) return;

    // Definiamo il limite di avvertimenti prima di rimuovere un utente.
    const WARNING_LIMIT = 3;
    // Otteniamo l'ID del mittente del messaggio. Gestiamo diversi scenari (gruppo o chat privata).
    const senderId = m['sender'] ? .participant ? ? m['key'] ? .remoteJid;
    // Otteniamo l'ID della chat da cui proviene il messaggio.
    const chatId = m['chat'];
    // Otteniamo i dati dell'utente dal database globale. Se non esistono, ne creiamo uno vuoto.
    let userDatabase = global['db']['data']['users'][senderId] || {};

    // Verifichiamo se il messaggio contiene un link di TikTok usando la regular expression.
    const isTikTokLink = tiktokLinkRegex['test'](m['text']);
    // Otteniamo la stringa "antitiktok" (probabilmente una chiave per abilitare/disabilitare la funzione).
    const antiTikTokFeature = DECODED_STRING(0x1cc); // Corretto l'indice

    // Se l'utente è un amministratore, la funzione anti-TikTok è abilitata nella chat,
    // e il testo del messaggio include la stringa "antitiktok", permettiamo il messaggio.
    // Questo probabilmente serve per permettere agli admin di disabilitare la funzione.
    if (isAdmin && chatSettings[antiTikTokFeature] && m['text'] && m['text']['includes'](antiTikTokFeature)) {
        return; // Non facciamo nulla, il messaggio passa.
    }

    // Se la funzione anti-TikTok è abilitata nella chat, il messaggio contiene un link di TikTok,
    // l'utente non è un amministratore e il bot è un amministratore nel gruppo.
    if (chatSettings[antiTikTokFeature] && isTikTokLink && !isAdmin && isBotAdmin) {
        // Se l'utente non ha un contatore di avvertimenti, lo inizializziamo a 0.
        if (!userDatabase['antiTikTokWarn']) {
            userDatabase['antiTikTokWarn'] = 0;
        }

        // Incrementiamo il contatore di avvertimenti dell'utente.
        userDatabase['antiTikTokWarn'] += 1;
        // Eliminiamo il messaggio contenente il link di TikTok.
        await conn['sendMessage'](chatId, { 'delete': { 'remoteJid': chatId, 'fromMe': false, 'id': m['key'] ? .id, 'participant': senderId } });

        // Otteniamo il numero attuale di avvertimenti per l'utente.
        const userWarnings = global['db']['data']['users'][senderId]['antiTikTokWarn'];
        // Otteniamo i dati della chat.
        const chatData = global['db']['data']['chats'][chatId];

        // Se l'utente ha ricevuto meno del limite di avvertimenti.
        if (userWarnings < WARNING_LIMIT) {
            // Creiamo un messaggio di avvertimento.
            const warningMessage = {
                key: { participant: '0@s.whatsapp.net', fromMe: false, id: 'Warning' },
                message: {
                    locationMessage: {
                        name: DECODED_STRING(0x1d4), // "* ° AVVERTIMENTO",
                        jpegThumbnail: await (await fetch(DECODED_STRING(0x1e9)))['buffer'](), // Link all'immagine
                        vcard: DECODED_STRING(0x1df) // Informazioni del contatto
                    }
                },
                participant: DECODED_STRING(0x1da) // "user"
            };
            // Inviamo il messaggio di avvertimento all'utente.
            await conn['sendMessage'](chatId, { text: `*${DECODED_STRING(0x1db)}*\n${DECODED_STRING(0x1e5)} ${userWarnings}/${WARNING_LIMIT}\n\n${DECODED_STRING(0x1d5)}`, ...warningMessage });
        } else if (userWarnings === WARNING_LIMIT) {
            // Se l'utente ha raggiunto il limite di avvertimenti, lo rimuoviamo dal gruppo.
            await conn['groupParticipantsUpdate'](chatId, [m['key']['remoteJid']], DECODED_STRING(0x1e3)); // "remove"
            // Resettiamo il contatore di avvertimenti dell'utente.
            global['db']['data']['users'][senderId]['antiTikTokWarn'] = 0;
            // Creiamo un messaggio di rimozione.
            const removeMessage = {
                key: { participant: '0@s.whatsapp.net', fromMe: false, id: 'Remove' },
                message: {
                    locationMessage: {
                        name: DECODED_STRING(0x1d4), // "* ° AVVERTIMENTO"
                        jpegThumbnail: await (await fetch(DECODED_STRING(0x1e9)))['buffer'](), // Link all'immagine
                        vcard: DECODED_STRING(0x1df) // Informazioni del contatto
                    }
                },
                participant: DECODED_STRING(0x1da) // "user"
            };
            // Inviamo un messaggio di notifica della rimozione al gruppo.
            await conn['sendMessage'](chatId, { text: `*${DECODED_STRING(0x1f0)}*\n${DECODED_STRING(0x1ef)}`, ...removeMessage }); // "⛔ UTENTE RIMOSSO DOPO 3 AVVERTIMENTI", "𝐀𝐧𝐭𝐢 - 𝐓𝐢𝐤𝐓𝐨𝐤 "
        }
    }
    // Indica che il messaggio deve essere processato (o bloccato, a seconda della logica).
    return true;
}