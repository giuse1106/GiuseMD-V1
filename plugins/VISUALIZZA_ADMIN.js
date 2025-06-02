const handler = _0x507190 => _0x507190;
handler.all = async function (_0x160d58) {
  if (_0x160d58.messageStubType == 29) {
    let _0x53e3b7;
    try {
      _0x53e3b7 = await conn.profilePictureUrl(_0x160d58.messageStubParameters[0], "image");
    } catch (_0x27ab16) {
      _0x53e3b7 = null;
    }
    conn.sendMessage(_0x160d58.chat, {
      'text': '@' + _0x160d58.messageStubParameters[0].split('@')[0] + " 𝐜𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐳𝐢𝐨𝐧𝐢, 𝐬𝐞𝐢 𝐬𝐭𝐚𝐭𝐨 𝐩𝐫𝐨𝐦𝐨𝐬𝐬𝐨 𝐚𝐝 𝐚𝐝𝐦𝐢𝐧 𝐝𝐚 @" + _0x160d58.sender.split('@')[0] + "! 🥳",
      'contextInfo': {
        'mentionedJid': [_0x160d58.sender, _0x160d58.messageStubParameters[0]],
        'forwardingScore': 0x63,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': '120363259442839354@newsletter',
          'serverMessageId': '',
          'newsletterName': '' + nomebot
        },
        'externalAdReply': {
          'title': "𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐩𝐫𝐨𝐦𝐨𝐳𝐢𝐨𝐧𝐞 👑",
          'thumbnail': _0x53e3b7 ? await (await fetch(_0x53e3b7)).buffer() : await (await fetch("https://telegra.ph/file/17e7701f8b0a63806e312.png")).buffer()
        }
      }
    }, {
      'quoted': null
    });
  }
  if (_0x160d58.messageStubType == 30) {
    let _0x20cd89;
    try {
      _0x20cd89 = await conn.profilePictureUrl(_0x160d58.messageStubParameters[0], "image");
    } catch (_0x3ab5bb) {
      _0x20cd89 = null;
    }
    conn.sendMessage(_0x160d58.chat, {
      'text': '@' + _0x160d58.messageStubParameters[0].split('@')[0] + " 𝐦𝐢 𝐝𝐢𝐬𝐩𝐢𝐚𝐜𝐞 𝐦𝐚 @" + _0x160d58.sender.split('@')[0] + " 𝐭𝐢 𝐡𝐚 𝐭𝐨𝐥𝐭𝐨 𝐢 𝐩𝐞𝐫𝐦𝐞𝐬𝐬𝐢 𝐝𝐚 𝐚𝐝𝐦𝐢𝐧! 😕",
      'contextInfo': {
        'mentionedJid': [_0x160d58.sender, _0x160d58.messageStubParameters[0]],
        'forwardingScore': 0x63,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': '120363259442839354@newsletter',
          'serverMessageId': '',
          'newsletterName': '' + nomebot
        },
        'externalAdReply': {
          'title': "𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐨𝐧𝐞 🙇🏻‍♂️",
          'thumbnail': _0x20cd89 ? await (await fetch(_0x20cd89)).buffer() : await (await fetch("https://telegra.ph/file/17e7701f8b0a63806e312.png")).buffer()
        }
      }
    }, {
      'quoted': null
    });
  }
};
export default handler;
