/*⚠ VIETATO MODIFICARE  ⚠

Il codice in questo file è stato modificato e corretto da:
- MoonContentCreator >> https://github.com/MoonContentCreator

Funzione adattata da:
- MoonContentCreator >> https://github.com/MoonContentCreator
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
- AzamiJs >> https://github.com/AzamiJs

Altri crediti:
- Aiden_NotLogic >> https://github.com/ferhacks
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino
*/

const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import('@whiskeysockets/baileys');
import _0x4ff56e from 'qrcode';
import _0x5c72be from 'node-cache';
import _0x2e2754 from 'fs';
import 'path';
import _0x23ade6 from 'pino';
import 'util';
import 'ws';
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
let handler = async (_0x256af8, {
  conn: _0x209ed9,
  args: _0x44af58,
  usedPrefix: _0x10fa73,
  command: _0x3ca1f1,
  isOwner: _0x2da5ee
}) => {
  if (!global.db.data.settings[_0x209ed9.user.jid].jadibot) {
    throw "ⓘ 𝐀𝐭𝐭𝐢𝐯𝐚 𝐣𝐚𝐝𝐢𝐛𝐨𝐭";
  }
  if (_0x209ed9.user.jid !== global.conn.user.jid) {
    return _0x209ed9.reply(_0x256af8.chat, "ⓘ Vai sul numero principale del bot\nwa.me/" + global.conn.user.jid.split`@`[0] + '&text=' + (_0x10fa73 + _0x3ca1f1), _0x256af8);
  }
  const _0x5b1ef9 = _0x44af58[0] && _0x44af58[0].includes("--code") ? true : !!(_0x44af58[1] && _0x44af58[1].includes("--code"));
  let _0x399497 = _0x256af8.mentionedJid && _0x256af8.mentionedJid[0] ? _0x256af8.mentionedJid[0] : _0x256af8.fromMe ? _0x209ed9.user.jid : _0x256af8.sender;
  let _0xe04cfb = '' + _0x399497.split`@`[0];
  if (_0x5b1ef9) {
    _0x44af58[0] = _0x44af58[0].replace("--code", '').trim();
    if (_0x44af58[1]) {
      _0x44af58[1] = _0x44af58[1].replace("--code", '').trim();
    }
    if (_0x44af58[0] == '') {
      _0x44af58[0] = undefined;
    }
    console.log(_0x44af58[0]);
  }
  if (!_0x2e2754.existsSync("./jadibts/" + _0xe04cfb)) {
    _0x2e2754.mkdirSync('./jadibts/' + _0xe04cfb, {
      'recursive': true
    });
  }
  if (_0x44af58[0] && _0x44af58[0] != undefined) {
    _0x2e2754.writeFileSync("./jadibts/" + _0xe04cfb + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(_0x44af58[0], "base64").toString("utf-8")), null, "\t"));
  } else {
    '';
  }
  if (_0x2e2754.existsSync("./jadibts/" + _0xe04cfb + "/creds.json")) {
    let _0x259690 = JSON.parse(_0x2e2754.readFileSync("./jadibts/" + _0xe04cfb + "/creds.json"));
    if (_0x259690) {
      if (_0x259690.registered = false) {
        _0x2e2754.unlinkSync("./jadibts/" + _0xe04cfb + "/creds.json");
      }
    }
  }
  const _0x23ea55 = Buffer.from("Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz", "base64");
  exec(_0x23ea55.toString("utf-8"), async (_0x3917fa, _0x350f50, _0x2b21cb) => {
    const _0x588ea2 = Buffer.from("wqkg8J2QgfCdkKLwnZCx8J2Qm/CdkLLwnZCB8J2QqPCdkK0t8J2QjPCdkJ0g8J+Urg==", "base64");
    async function _0x3b38c0() {
      let _0x34014f = _0x256af8.mentionedJid && _0x256af8.mentionedJid[0] ? _0x256af8.mentionedJid[0] : _0x256af8.fromMe ? _0x209ed9.user.jid : _0x256af8.sender;
      let _0x24aa08 = '' + _0x34014f.split`@`[0];
      if (!_0x2e2754.existsSync("./jadibts/" + _0x24aa08)) {
        _0x2e2754.mkdirSync("./jadibts/" + _0x24aa08, {
          'recursive': true
        });
      }
      if (_0x44af58[0]) {
        _0x2e2754.writeFileSync('./jadibts/' + _0x24aa08 + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(_0x44af58[0], "base64").toString('utf-8')), null, "\t"));
      } else {
        '';
      }
      let {
        version: _0x1b60fb,
        isLatest: _0x202bbd
      } = await fetchLatestBaileysVersion();
      const _0x2c911b = _0x2c74ff => {};
      const _0x1384da = new _0x5c72be();
      const {
        state: _0x24236e,
        saveState: _0x17b703,
        saveCreds: _0x555c8b
      } = await useMultiFileAuthState("./jadibts/" + _0x24aa08);
      const _0x480528 = {
        'printQRInTerminal': false,
        'logger': _0x23ade6({
          'level': 'silent'
        }),
        'auth': {
          'creds': _0x24236e.creds,
          'keys': makeCacheableSignalKeyStore(_0x24236e.keys, _0x23ade6({
            'level': 'silent'
          }))
        },
        'msgRetry': _0x2c911b,
        'msgRetryCache': _0x1384da,
        'version': _0x1b60fb,
        'syncFullHistory': true,
        'browser': _0x5b1ef9 ? ["Ubuntu", 'Chrome', "110.0.5585.95"] : ["BixbyBot-Md", "Opera", "5.0"],
        'defaultQueryTimeoutMs': undefined,
        'getMessage': async _0x5918d0 => {
          if (store) {
            const _0xb4b881 = store.loadMessage(_0x5918d0.remoteJid, _0x5918d0.id);
            return _0xb4b881.message && undefined;
          }
          return {
            'conversation': "BixbyBot-Md"
          };
        }
      };
      let _0x42375e = makeWASocket(_0x480528);
      _0x42375e.isInit = false;
      let _0x428c0d = true;
      async function _0x38ed5a(_0x3c8cd5) {
        const {
          connection: _0x1438d5,
          lastDisconnect: _0x18a65d,
          isNewLogin: _0x4770b3,
          qr: _0x3e5ffc
        } = _0x3c8cd5;
        if (_0x4770b3) {
          _0x42375e.isInit = false;
        }
        if (_0x3e5ffc && !_0x5b1ef9) {
          return _0x209ed9.sendMessage(_0x256af8.chat, {
            'image': await _0x4ff56e.toBuffer(_0x3e5ffc, {
              'scale': 0x8
            }),
            'caption': "🚀 𝐉𝐚𝐝𝐢𝐁𝐨𝐭 - ᵇᵉᵗᵃ\n──────────────\nⓘ 𝐒𝐜𝐚𝐧𝐬𝐢𝐨𝐧𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐐𝐑 𝐩𝐞𝐫 𝐜𝐨𝐥𝐥𝐞𝐠𝐚𝐫𝐞 𝐮𝐧 𝐬𝐮𝐛-𝐛𝐨𝐭\n\n𝟏. 𝐂𝐥𝐢𝐜𝐜𝐚 𝐬𝐮𝐢 𝐭𝐫𝐞 𝐩𝐮𝐧𝐭𝐢 𝐧𝐞𝐥𝐥'𝐚𝐧𝐠𝐨𝐥𝐨 𝐢𝐧 𝐚𝐥𝐭𝐨 𝐚 𝐝𝐞𝐬𝐭𝐫𝐚.\n𝟐. 𝐂𝐥𝐢𝐜𝐜𝐚 𝐬𝐮 𝐃𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐢 𝐚𝐜𝐜𝐨𝐩𝐩𝐢𝐚𝐭𝐢.\n𝟑. 𝐂𝐥𝐢𝐜𝐜𝐚 𝐬𝐮 𝐀𝐬𝐬𝐨𝐜𝐢𝐚 𝐮𝐧 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨.\n𝟒. 𝐒𝐜𝐚𝐧𝐬𝐢𝐨𝐧𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐐𝐑.\n\n> ⚠️ 𝐈𝐥 𝐐𝐑 𝐬𝐜𝐚𝐝𝐞 𝐭𝐫𝐚 𝟐𝟎 𝐬𝐞𝐜𝐨𝐧𝐝𝐢.\n──────────────\n" + _0x588ea2.toString("utf-8")
          }, {
            'quoted': _0x256af8
          });
        }
        if (_0x3e5ffc && _0x5b1ef9) {
          _0x209ed9.sendMessage(_0x256af8.chat, {
            'text': "🚀 𝐉𝐚𝐝𝐢𝐁𝐨𝐭 - ᵇᵉᵗᵃ\n──────────────\nⓘ 𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐝𝐢𝐜𝐞 𝐩𝐞𝐫 𝐜𝐨𝐥𝐥𝐞𝐠𝐚𝐫𝐞 𝐮𝐧 𝐬𝐮𝐛-𝐛𝐨𝐭\n\n𝟏. 𝐂𝐥𝐢𝐜𝐜𝐚 𝐬𝐮𝐢 𝐭𝐫𝐞 𝐩𝐮𝐧𝐭𝐢 𝐧𝐞𝐥𝐥'𝐚𝐧𝐠𝐨𝐥𝐨 𝐢𝐧 𝐚𝐥𝐭𝐨 𝐚 𝐝𝐞𝐬𝐭𝐫𝐚.\n𝟐. 𝐂𝐥𝐢𝐜𝐜𝐚 𝐬𝐮 𝐃𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐢 𝐚𝐜𝐜𝐨𝐩𝐩𝐢𝐚𝐭𝐢.\n𝟑. 𝐂𝐥𝐢𝐜𝐜𝐚 𝐬𝐮 𝐀𝐬𝐬𝐨𝐜𝐢𝐚 𝐮𝐧 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨.\n𝟒. 𝐂𝐥𝐢𝐜𝐜𝐚 𝐬𝐮 𝐂𝐨𝐥𝐥𝐞𝐠𝐚𝐦𝐞𝐧𝐭𝐨 𝐜𝐨𝐧 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐢 𝐭𝐞𝐥𝐞𝐟𝐨𝐧𝐨.\n𝟓. 𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐢𝐥 𝐬𝐞𝐠𝐮𝐞𝐧𝐭𝐞 𝐜𝐨𝐝𝐢𝐜𝐞.\n\n> ⚠️ 𝐄𝐬𝐞𝐠𝐮𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐝𝐚𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭 𝐜𝐡𝐞 𝐝𝐞𝐬𝐢𝐝𝐞𝐫𝐢 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐞 𝐜𝐨𝐦𝐞 𝐬𝐮𝐛-𝐛𝐨𝐭.\n──────────────\n" + _0x588ea2.toString("utf-8")
          }, {
            'quoted': _0x256af8
          });
          await sleep(5000);
          let _0x383962 = await _0x42375e.requestPairingCode(_0x256af8.sender.split`@`[0]);
          await _0x256af8.reply(_0x383962);
        }
        const _0x52469d = _0x18a65d?.["error"]?.["output"]?.["statusCode"] || _0x18a65d?.["error"]?.["output"]?.["payload"]?.['statusCode'];
        console.log(_0x52469d);
        const _0x1b9602 = async _0x1f264b => {
          if (!_0x1f264b) {
            try {
              _0x42375e.ws.close();
            } catch {}
            _0x42375e.ev.removeAllListeners();
            let _0xc21f61 = global.conns.indexOf(_0x42375e);
            if (_0xc21f61 < 0) {
              return;
            }
            delete global.conns[_0xc21f61];
            global.conns.splice(_0xc21f61, 1);
          }
        };
        const _0x4d4752 = _0x18a65d?.['error']?.["output"]?.['statusCode'] || _0x18a65d?.['error']?.['output']?.["payload"]?.["statusCode"];
        if (_0x1438d5 === "close") {
          console.log(_0x4d4752);
          if (_0x4d4752 == 405) {
            await _0x2e2754.unlinkSync('./jadibts/' + _0x24aa08 + '/creds.json');
            return await _0x42375e.reply(_0x256af8.chat, "⚠️ Connessione chiusa", _0x256af8);
          }
          if (_0x4d4752 === DisconnectReason.restartRequired) {
            _0x3b38c0();
            return console.log("⚠️ Connessione sostituita, e' stata aperta un'altra nuova sessione, chiudere prima la sessione corrente");
          } else {
            if (_0x4d4752 === DisconnectReason.loggedOut) {
              sleep(4000);
              return _0x42375e.reply(_0x256af8.chat, "⚠️ La connessione e' stata chiusa, dovrai riconnetterti utilizzando:\n.deletesesion (Per eliminare i dati e poter richiedere nuovamente il codice QR o il codice di abbinamento", _0x256af8);
            } else {
              if (_0x4d4752 == 428) {
                await _0x1b9602(false);
                return _0x42375e.reply(_0x256af8.chat, "⚠️ La connessione e' stata chiusa inaspettatamente, riconnessione in corso...", _0x256af8);
              } else {
                if (_0x4d4752 === DisconnectReason.connectionLost) {
                  await _0x3b38c0();
                  return console.log("⚠️ Connessione persa al server, riconnessione in corso...");
                } else {
                  if (_0x4d4752 === DisconnectReason.badSession) {
                    return await _0x42375e.reply(_0x256af8.chat, "⚠️ La connessione e' stata chiusa, e' necessario connettersi manualmente", _0x256af8, fake);
                  } else {
                    if (_0x4d4752 === DisconnectReason.timedOut) {
                      await _0x1b9602(false);
                      return console.log("⚠️ Connessione scaduta, riconnessione in corso....");
                    } else {
                      console.log("⚠️ Motivo della disconnessione sconosciuto: ${reason || \"\"} >> ${connection || \"\"}");
                    }
                  }
                }
              }
            }
          }
        }
        if (global.db.data == null) {
          loadDatabase();
        }
        if (_0x1438d5 == "open") {
          _0x42375e.isInit = true;
          global.conns.push(_0x42375e);
          await _0x209ed9.sendMessage(_0x256af8.chat, {
            'text': _0x44af58[0] ? "✅ 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐨 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨" : "✅ 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐨 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨\n\n𝐔𝐬𝐚 𝐢𝐥 𝐭𝐮𝐨 𝐈𝐃 𝐩𝐞𝐫 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐭𝐭𝐞𝐫𝐭𝐢"
          }, {
            'quoted': _0x256af8
          });
          await _0x209ed9.sendMessage(_0x256af8.chat, {
            'text': "ⓘ 𝐒𝐞𝐢 𝐜𝐨𝐥𝐥𝐞𝐠𝐚𝐭𝐨, 𝐚𝐬𝐩𝐞𝐭𝐭𝐚 𝐮𝐧 𝐚𝐭𝐭𝐢𝐦𝐨"
          }, {
            'quoted': _0x256af8
          });
          await sleep(5000);
          if (!_0x44af58[0]) {
            _0x209ed9.sendMessage(_0x256af8.chat, {
              'text': _0x10fa73 + _0x3ca1f1 + " " + Buffer.from(_0x2e2754.readFileSync('./jadibts/' + _0x24aa08 + '/creds.json'), "utf-8").toString('base64')
            }, {
              'quoted': _0x256af8
            });
          }
        }
      }
      setInterval(async () => {
        if (!_0x42375e.user) {
          try {
            _0x42375e.ws.close();
          } catch (_0x265b47) {
            console.log(await _0x22f7a4(true)["catch"](console.error));
          }
          _0x42375e.ev.removeAllListeners();
          let _0x524736 = global.conns.indexOf(_0x42375e);
          if (_0x524736 < 0) {
            return;
          }
          delete global.conns[_0x524736];
          global.conns.splice(_0x524736, 1);
        }
      }, 60000);
      let _0xa4a956 = await import("../handler.js");
      let _0x22f7a4 = async function (_0x189d1a) {
        try {
          const _0x2c7599 = await import("../handler.js?update=" + Date.now())['catch'](console.error);
          if (Object.keys(_0x2c7599 || {}).length) {
            _0xa4a956 = _0x2c7599;
          }
        } catch (_0x83c17d) {
          console.error(_0x83c17d);
        }
        if (_0x189d1a) {
          const _0x5be01f = _0x42375e.chats;
          try {
            _0x42375e.ws.close();
          } catch {}
          _0x42375e.ev.removeAllListeners();
          _0x42375e = makeWASocket(_0x480528, {
            'chats': _0x5be01f
          });
          _0x428c0d = true;
        }
        if (!_0x428c0d) {
          _0x42375e.ev.off("messages.upsert", _0x42375e.handler);
          _0x42375e.ev.off("group-participants.update", _0x42375e.participantsUpdate);
          _0x42375e.ev.off("groups.update", _0x42375e.groupsUpdate);
          _0x42375e.ev.off("message.delete", _0x42375e.onDelete);
          _0x42375e.ev.off("call", _0x42375e.onCall);
          _0x42375e.ev.off("connection.update", _0x42375e.connectionUpdate);
          _0x42375e.ev.off("creds.update", _0x42375e.credsUpdate);
        }
        _0x42375e.welcome = "*• Hola, Gracias por unirte!!*\n*━━━━━━━━━━━━━━━━━━━*\n\n🍧 *• Nombre:* @user\n🗓️ *• Fecha:* @date\n⏰ *• Hora:* @time\n\n*⚠️  Recuerda leer la descripción*\n@readMore\n@desc";
        _0x42375e.bye = "*• Gracias por haber sido parte del grupo*\n*━━━━━━━━━━━━━━━━━━━━━━━━━*\n\n🍧 *• Nombre:* @user\n🗓️ *• Fecha:* @date\n⏰ *• Hora:* @time";
        _0x42375e.spromote = "*@user* ¡Se suma al grupo de admins¡";
        _0x42375e.sdemote = "*@user* ¡Abandona el grupo!";
        _0x42375e.sDesc = "¡Se ha modificado la descripción!\n\n*Nueva descripción:* @desc";
        _0x42375e.sSubject = "¡Se ha modificado el título del grupo!";
        _0x42375e.sIcon = "¡Se ha cambiado la foto del grupo!";
        _0x42375e.sRevoke = "¡Se ha actualizado el enlace del grupo!*\n*Nuevo enlace:* @revoke";
        _0x42375e.handler = _0xa4a956.handler.bind(_0x42375e);
        _0x42375e.participantsUpdate = _0xa4a956.participantsUpdate.bind(_0x42375e);
        _0x42375e.groupsUpdate = _0xa4a956.groupsUpdate.bind(_0x42375e);
        _0x42375e.onDelete = _0xa4a956.deleteUpdate.bind(_0x42375e);
        _0x42375e.onCall = _0xa4a956.callUpdate.bind(_0x42375e);
        _0x42375e.connectionUpdate = _0x38ed5a.bind(_0x42375e);
        _0x42375e.credsUpdate = _0x555c8b.bind(_0x42375e, true);
        const _0x4ee332 = new Date();
        const _0x5a53fb = new Date(_0x42375e.ev * 1000);
        if (_0x4ee332.getTime() - _0x5a53fb.getTime() <= 300000) {
          console.log("Lettura del messaggio in arrivo:", _0x42375e.ev);
          Object.keys(_0x42375e.chats).forEach(_0x8f22fd => {
            _0x42375e.chats[_0x8f22fd].isBanned = false;
          });
        } else {
          console.log(_0x42375e.chats, "⚠️ Hai saltato i messaggi in attesa.", _0x42375e.ev);
          Object.keys(_0x42375e.chats).forEach(_0x575c5d => {
            _0x42375e.chats[_0x575c5d].isBanned = true;
          });
        }
        _0x42375e.ev.on("messages.upsert", _0x42375e.handler);
        _0x42375e.ev.on("group-participants.update", _0x42375e.participantsUpdate);
        _0x42375e.ev.on("groups.update", _0x42375e.groupsUpdate);
        _0x42375e.ev.on("message.delete", _0x42375e.onDelete);
        _0x42375e.ev.on("call", _0x42375e.onCall);
        _0x42375e.ev.on("connection.update", _0x42375e.connectionUpdate);
        _0x42375e.ev.on("creds.update", _0x42375e.credsUpdate);
        _0x428c0d = false;
        return true;
      };
      _0x22f7a4(false);
    }
    _0x3b38c0();
  });
};
handler.help = ['jadibot', "serbot", "getcode", "rentbot"];
handler.tags = ["jadibot"];
handler.command = /^(√)/i;
export default handler;
function sleep(_0x2c6b4c) {
  return new Promise(_0x3a0274 => setTimeout(_0x3a0274, _0x2c6b4c));
}
