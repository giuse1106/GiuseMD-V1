function handler(_0x57ffa3) {
  let _0x2507ec = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': "Halo"
    },
    'message': {
      'extendedTextMessage': {
        'text': "𝐎𝐰𝐧𝐞𝐫 ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」",
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    'participant': "0@s.whatsapp.net"
  };
  const _0xc06d49 = global.owner.filter(([_0x38ba61, _0x437c83]) => _0x38ba61 && _0x437c83);
  this.sendContact(_0x57ffa3.chat, _0xc06d49.map(([_0x42018f, _0x1302d8]) => [_0x42018f, _0x1302d8]), _0x2507ec);
}
handler.help = ["owner"];
handler.tags = ["main"];
handler.command = ['proprietario', "creatore", "numero", 'contatto'];
export default handler;