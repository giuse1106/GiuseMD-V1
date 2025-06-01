/*⚠ VIETATO MODIFICARE  ⚠

Il codice di questo file è stato completamente creato da:
- Aiden_NotLogic >> https://github.com/ferhacks

Funzione adattata da:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
- AzamiJs >> https://github.com/AzamiJs

Altri crediti:
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino
*/

const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import("@whiskeysockets/baileys");
import qrcode from 'qrcode';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import util from 'util';
import ws from 'ws';
const {
  child,
  spawn,
  exec
} = await import("child_process");
import { makeWASocket } from '../lib/simple.js';

if (global.conns instanceof Array) {
  console.log();
} else {
  global.conns = [];
}

let handler = async (m, {
  conn,
  args,
  usedPrefix,
  command,
  isOwner
}) => {
  if (!global.db.data.settings[conn.user.jid].jadibot) {
    return conn.reply(m.chat, "ⓘ 𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐝𝐢𝐬𝐚𝐛𝐢𝐥𝐢𝐭𝐚𝐭𝐨 𝐝𝐚𝐥 𝐦𝐢𝐨 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐞.", m, rcanal);
  }

  const usePairingCode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : !!(args[1] && /(--code|code)/.test(args[1].trim()));
  let pairingCodeMessage;
  let qrMessage;
  let codeMessage;

  let userJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let userId = userJid.split`@`[0];

  if (usePairingCode) {
    args[0] = args[0].replace(/^--code$|^code$/, '').trim();
    if (args[1]) {
      args[1] = args[1].replace(/^--code$|^code$/, '').trim();
    }
    if (args[0] == '') {
      args[0] = undefined;
    }
  }

  const sessionPath = `./jadibts/${userId}`;
  if (!fs.existsSync(sessionPath)) {
    fs.mkdirSync(sessionPath, {
      recursive: true
    });
  }

  if (args[0] && args[0] != undefined) {
    fs.writeFileSync(`${sessionPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
  } else {
    ''; // No-op
  }

  if (fs.existsSync(`${sessionPath}/creds.json`)) {
    let creds = JSON.parse(fs.readFileSync(`${sessionPath}/creds.json`));
    if (creds) {
      if (creds.registered = false) {
        fs.unlinkSync(`${sessionPath}/creds.json`);
      }
    }
  }

  const md5sumCommand = Buffer.from("Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz", "base64");
  exec(md5sumCommand.toString("utf-8"), async (error, stdout, stderr) => {
    const additionalInfo = Buffer.from("", "base64"); // This seems to be an empty buffer, can be removed if not used.

    async function startBotConnection() {
      let currentJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let currentUserId = currentJid.split`@`[0];
      const currentSessionPath = `./jadibts/${currentUserId}`;

      if (!fs.existsSync(currentSessionPath)) {
        fs.mkdirSync(currentSessionPath, {
          recursive: true
        });
      }

      if (args[0]) {
        fs.writeFileSync(`${currentSessionPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
      } else {
        ''; // No-op
      }

      let {
        version,
        isLatest
      } = await fetchLatestBaileysVersion();

      const logger = pino({
        level: 'silent'
      }).child({
        level: 'silent'
      });
      const msgRetryCache = new NodeCache();

      const {
        state,
        saveState,
        saveCreds
      } = await useMultiFileAuthState(currentSessionPath);

      const socketOptions = {
        printQRInTerminal: false,
        logger: logger,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        msgRetry: (msg) => {}, // Placeholder for message retry logic
        msgRetryCache: msgRetryCache,
        version: [2, 3000, 1014169723], // Baileys version (can be adjusted if needed)
        syncFullHistory: true,
        browser: usePairingCode ? ["Ubuntu", 'Chrome', "110.0.5585.95"] : ["GiuseMD (Sub Bot)", 'Chrome', '2.0.0'],
        defaultQueryTimeoutMs: undefined,
        getMessage: async (key) => {
          if (global.store) {
            const msg = global.store.loadMessage(key.remoteJid, key.id);
            return msg.message && undefined; // Ensure message exists
          }
          return {
            conversation: "GiuseMD"
          };
        }
      };

      let GiuseMD = makeWASocket(socketOptions);
      GiuseMD.isInit = false;
      let isFirstConnection = true;

      async function connectionUpdate(update) {
        const {
          connection,
          lastDisconnect,
          isNewLogin,
          qr
        } = update;

        if (isNewLogin) {
          GiuseMD.isInit = false;
        }

        if (qr && !usePairingCode) {
          qrMessage = await conn.sendMessage(m.chat, {
            image: await qrcode.toBuffer(qr, {
              scale: 8
            }),
            caption: "🚀 𝐉𝐚𝐝𝐢𝐁𝐨𝐭 - 𝐆𝐢𝐮𝐬𝐞𝐌𝐃 ᵇᵉᵗᵃ \n\n──────────────\n\nⓘ 𝐂𝐨𝐧 𝐮𝐧 𝐚𝐥𝐭𝐫𝐨 𝐜𝐞𝐥𝐥𝐮𝐥𝐚𝐫𝐞 𝐨 𝐏𝐂, 𝐬𝐜𝐚𝐧𝐬𝐢𝐨𝐧𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐐𝐑 𝐩𝐞𝐫 𝐝𝐢𝐯𝐞𝐧𝐭𝐚𝐫𝐞 𝐮𝐧 𝐒𝐮𝐛𝐁𝐨𝐭\n\n𝟏 𝐅𝐚𝐫𝐞 𝐜𝐥𝐢𝐜 𝐬𝐮𝐢 𝐭𝐫𝐞 𝐩𝐮𝐧𝐭𝐢 𝐧𝐞𝐥𝐥'𝐚𝐧𝐠𝐨𝐥𝐨 𝐢𝐧 𝐚𝐥𝐭𝐨 𝐚 𝐝𝐞𝐬𝐭𝐫𝐚\n𝟐 𝐓𝐨𝐜𝐜𝐚 𝐢 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐢 𝐚𝐬𝐬𝐨𝐜𝐢𝐚𝐭𝐢\n𝟑 𝐒𝐜𝐚𝐧𝐬𝐢𝐨𝐧𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐝𝐢𝐜𝐞 𝐐𝐑 𝐩𝐞𝐫 𝐚𝐜𝐜𝐞𝐝𝐞𝐫𝐞\n\n──────────────\n\n> ⚠️ 𝐈𝐥 𝐐𝐑 𝐬𝐜𝐚𝐝𝐞 𝐭𝐫𝐚 𝟒𝟓 𝐬𝐞𝐜𝐨𝐧𝐝𝐢\n\n──────────────\n" + additionalInfo.toString("utf-8")
          }, {
            quoted: m
          });
        }

        if (qr && usePairingCode) {
          pairingCodeMessage = await conn.sendMessage(m.chat, {
            text: "🚀 𝐉𝐚𝐝𝐢𝐁𝐨𝐭 - 𝐆𝐢𝐮𝐬𝐞𝐌𝐃 ᵇᵉᵗᵃ \n\n──────────────\n\nⓘ 𝐔𝐬𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐝𝐢𝐜𝐞 𝐩𝐞𝐫 𝐝𝐢𝐯𝐞𝐧𝐭𝐚𝐫𝐬𝐞 𝐮𝐧 𝐒𝐮𝐛𝐁𝐨𝐭\n\n𝟏 𝐅𝐚𝐫𝐞 𝐜𝐥𝐢𝐜 𝐬𝐮𝐢 𝐭𝐫𝐞 𝐩𝐮𝐧𝐭𝐢 𝐧𝐞𝐥𝐥'𝐚𝐧𝐠𝐨𝐥𝐨 𝐢𝐧 𝐚𝐥𝐭𝐨 𝐚 𝐝𝐞𝐬𝐭𝐫𝐚\n𝟐 𝐓𝐨𝐜𝐜𝐚 𝐢 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐢 𝐚𝐬𝐬𝐨𝐜𝐢𝐚𝐭𝐢\n𝟑 𝐒𝐞𝐥𝐞𝐳𝐢𝐨𝐧𝐚 𝐜𝐨𝐥𝐥𝐞𝐠𝐚 𝐜𝐨𝐧 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐢 𝐭𝐞𝐥𝐞𝐟𝐨𝐧𝐨\n𝟒 𝐒𝐜𝐫𝐢𝐯𝐢 𝐢𝐥 𝐜𝐨𝐝𝐢𝐜𝐞\n\n──────────────\n\n> ⚠️ 𝐄𝐬𝐞𝐠𝐮𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐝𝐚𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭 𝐜𝐡𝐞 𝐝𝐞𝐬𝐢𝐝𝐞𝐫𝐢 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐞 𝐜𝐨𝐦𝐞 𝐬𝐮𝐛-𝐛𝐨𝐭\n\n──────────────\n" + additionalInfo.toString("utf-8")
          }, {
            quoted: m
          });
          await sleep(3000);
          let code = await GiuseMD.requestPairingCode(m.sender.split`@`[0]);
          codeMessage = await m.reply(code);
        }

        const statusCode = lastDisconnect?.["error"]?.["output"]?.["statusCode"] || lastDisconnect?.["error"]?.['output']?.["payload"]?.['statusCode'];
        console.log(statusCode);

        const cleanUpConnection = async (shouldReconnect) => {
          if (!shouldReconnect) {
            try {
              GiuseMD.ws.close();
            } catch {}
            GiuseMD.ev.removeAllListeners();
            let index = global.conns.indexOf(GiuseMD);
            if (index < 0) {
              return;
            }
            delete global.conns[index];
            global.conns.splice(index, 1);
          }
        };

        if (connection === 'close') {
          console.log(statusCode);
          if (statusCode == 405) { // Unauthorized or invalid session
            await fs.unlinkSync(`${currentSessionPath}/creds.json`);
            return await m.reply("ⓘ 𝐈𝐧𝐯𝐢𝐚 𝐧𝐮𝐨𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐢𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.");
          }
          if (statusCode === DisconnectReason.restartRequired) {
            startBotConnection();
            return console.log("\n⌛ 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐬𝐜𝐚𝐝𝐮𝐭𝐚, 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...");
          } else if (statusCode === DisconnectReason.loggedOut) {
            sleep(2500);
            return m.reply("ⓘ 𝐋𝐚 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐞̀ 𝐬𝐭𝐚𝐭𝐚 𝐜𝐡𝐢𝐮𝐬𝐚, 𝐝𝐞𝐯𝐫𝐚𝐢 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐭𝐭𝐞𝐫𝐭𝐢 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐧𝐝𝐨:*\n!deletesesion (𝐏𝐞𝐫 𝐜𝐚𝐧𝐜𝐞𝐥𝐥𝐚𝐫𝐞 𝐢 𝐝𝐚𝐭𝐢 𝐞 𝐩𝐨𝐭𝐞𝐫 𝐫𝐢𝐜𝐡𝐢𝐞𝐝𝐞𝐫𝐞 𝐧𝐮𝐨𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐢𝐥 𝐐𝐑 𝐨 𝐢𝐥 𝐜𝐨𝐝𝐢𝐜𝐞 𝐝𝐢 𝐚𝐛𝐛𝐢𝐧𝐚𝐦𝐞𝐧𝐭𝐨.");
          } else if (statusCode == 428) { // Connection closed unexpectedly
            await cleanUpConnection(false);
            return m.reply("ⓘ 𝐋𝐚 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐞̀ 𝐬𝐭𝐚𝐭𝐚 𝐜𝐡𝐢𝐮𝐬𝐚 𝐢𝐧𝐚𝐬𝐩𝐞𝐭𝐭𝐚𝐭𝐚𝐦𝐞𝐧𝐭𝐞, 𝐩𝐫𝐨𝐯𝐞𝐫𝐞𝐦𝐨 𝐚 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐭𝐭𝐞𝐫𝐜𝐢...");
          } else if (statusCode === DisconnectReason.connectionLost) {
            await startBotConnection();
            return console.log("\n⚠️ 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐩𝐞𝐫𝐬𝐚 𝐚𝐥 𝐬𝐞𝐫𝐯𝐞𝐫, 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...");
          } else if (statusCode === DisconnectReason.badSession) {
            return await m.reply("ⓘ 𝐋𝐚 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐞̀ 𝐬𝐭𝐚𝐭𝐚 𝐜𝐡𝐢𝐮𝐬𝐚, 𝐞̀ 𝐧𝐞𝐜𝐞𝐬𝐬𝐚𝐫𝐢𝐨 𝐜𝐨𝐧𝐧𝐞𝐭𝐭𝐞𝐫𝐬𝐢 𝐦𝐚𝐧𝐮𝐚𝐥𝐦𝐞𝐧𝐭𝐞.");
          } else if (statusCode === DisconnectReason.timedOut) {
            await cleanUpConnection(false);
            return console.log("\n⌛ 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐬𝐜𝐚𝐝𝐮𝐭𝐚, 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...");
          } else {
            console.log("\n⚠️ 𝐌𝐨𝐭𝐢𝐯𝐨 𝐝𝐞𝐥𝐥𝐚 𝐝𝐢𝐬𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐬𝐜𝐨𝐧𝐨𝐬𝐜𝐢𝐮𝐭𝐨: " + (statusCode || '') + " >> " + (connection || ''));
          }
        }

        if (global.db.data == null) {
          await loadDatabase(); // Assuming loadDatabase is defined elsewhere
        }

        if (connection == "open") {
          GiuseMD.isInit = true;
          global.conns.push(GiuseMD);
          await joinChannels(GiuseMD); // Assuming joinChannels is defined elsewhere
          await conn.sendMessage(m.chat, {
            text: args[0] ? "ⓘ 𝐒𝐞𝐢 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐨!! 𝐏𝐞𝐫 𝐟𝐚𝐯𝐨𝐫𝐞 𝐚𝐭𝐭𝐞𝐧𝐝𝐢, 𝐢 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢 𝐬𝐨𝐧𝐨 𝐢𝐧 𝐜𝐚𝐫𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐨..." : "✅️ 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐨 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨!! 𝐏𝐮𝐨𝐢 𝐜𝐨𝐧𝐧𝐞𝐭𝐭𝐞𝐫𝐭𝐢 𝐮𝐬𝐚𝐧𝐝𝐨" + (" " + (usedPrefix + command))
          }, {
            quoted: m
          });
          if (!args[0]) {
            conn.sendMessage(m.chat, {
              text: usedPrefix + command + " " + Buffer.from(fs.readFileSync(`${currentSessionPath}/creds.json`), "utf-8").toString("base64")
            }, {
              quoted: m
            });
          }
        }
      }

      setInterval(async () => {
        if (!GiuseMD.user) {
          try {
            GiuseMD.ws.close();
          } catch (e) {
            console.log(await reloadHandler(true)['catch'](console.error));
          }
          GiuseMD.ev.removeAllListeners();
          let index = global.conns.indexOf(GiuseMD);
          if (index < 0) {
            return;
          }
          delete global.conns[index];
          global.conns.splice(index, 1);
        }
      }, 60000); // Check every 1 minute

      let handlerModule = await import("../handler.js");
      let reloadHandler = async function (restart = false) {
        try {
          const updatedHandlerModule = await import("../handler.js?update=" + Date.now())['catch'](console.error);
          if (Object.keys(updatedHandlerModule || {}).length) {
            handlerModule = updatedHandlerModule;
          }
        } catch (e) {
          console.error(e);
        }

        if (restart) {
          const chats = GiuseMD.chats;
          try {
            GiuseMD.ws.close();
          } catch {}
          GiuseMD.ev.removeAllListeners();
          GiuseMD = makeWASocket(socketOptions, {
            chats: chats
          });
          isFirstConnection = true;
        }

        if (!isFirstConnection) {
          GiuseMD.ev.off("messages.upsert", GiuseMD.handler);
          GiuseMD.ev.off("connection.update", GiuseMD.connectionUpdate);
          GiuseMD.ev.off("creds.update", GiuseMD.credsUpdate);
        }

        const now = new Date();
        const lastEventTime = new Date(GiuseMD.ev * 1000); // Assuming GiuseMD.ev stores timestamp in seconds
        if (now.getTime() - lastEventTime.getTime() <= 300000) { // If last event was within 5 minutes (300,000 ms)
          console.log("Lettura del messaggio in arrivo:", GiuseMD.ev);
          Object.keys(GiuseMD.chats).forEach(chatId => {
            GiuseMD.chats[chatId].isBanned = false;
          });
        } else {
          console.log(GiuseMD.chats, "ⓘ Saltare i messaggi in attesa.", GiuseMD.ev);
          Object.keys(GiuseMD.chats).forEach(chatId => {
            GiuseMD.chats[chatId].isBanned = true;
          });
        }

        GiuseMD.handler = handlerModule.handler.bind(GiuseMD);
        GiuseMD.connectionUpdate = connectionUpdate.bind(GiuseMD);
        GiuseMD.credsUpdate = saveCreds.bind(GiuseMD, true);
        GiuseMD.ev.on('messages.upsert', GiuseMD.handler);
        GiuseMD.ev.on("connection.update", GiuseMD.connectionUpdate);
        GiuseMD.ev.on("creds.update", GiuseMD.credsUpdate);
        isFirstConnection = false;
        return true;
      };
      reloadHandler(false);
    }
    startBotConnection();
  });
};

handler.help = ['serbot', "serbot --code"];
handler.tags = ["serbot"];
handler.command = ["jadibot", "serbot"];
handler.private = true;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
