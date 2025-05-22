import _0x4b8137 from 'moment-timezone';
import _0x2c74f8 from 'node-fetch';
let handler = async (_0x221549, {
  conn: _0xf8de2c,
  args: _0x133a4d
}) => {
  let _0x28ae89 = await _0x2c74f8('https://api.github.com/repos/giuse1106/giusemd');
  let _0xa006a5 = await _0x28ae89.json();
  let _0x17bfb5 = "══════ •⊰✧⊱• ══════\n";
  _0x17bfb5 += "✧ 𝐍𝐨𝐦𝐞 : " + _0xa006a5.name + "\n";
  _0x17bfb5 += "✧ 𝐕𝐢𝐬𝐢𝐭𝐚𝐭𝐨𝐫𝐢 : " + _0xa006a5.watchers_count + "\n";
  _0x17bfb5 += "✦ 𝐃𝐢𝐦𝐞𝐧𝐬𝐢𝐨𝐧𝐞 : " + (_0xa006a5.size / 0x400).toFixed(0x2) + " MB\n";
  _0x17bfb5 += "✧ 𝐀𝐠𝐠𝐢𝐨𝐫𝐧𝐚𝐭𝐨 : " + _0x4b8137(_0xa006a5.updated_at).format("DD/MM/YY - HH:mm:ss") + "\n";
  _0x17bfb5 += "✧ 𝐋𝐢𝐧𝐤 : " + _0xa006a5.html_url + "\n═══════════════\n";
  _0x17bfb5 += "\t   " + _0xa006a5.forks_count + " 𝐅𝐨𝐫𝐤𝐬 · " + _0xa006a5.stargazers_count + " 𝐒𝐭𝐚𝐫𝐬 · " + _0xa006a5.open_issues_count + " 𝐈𝐬𝐬𝐮𝐞𝐬\n══════ •⊰✦⊱• ══════";
  _0x17bfb5 += author;
  let _0x4c47d0 = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': "Halo"
    },
    'message': {
      'extendedTextMessage': {
        'text': "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」",
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    'participant': '0@s.whatsapp.net'
  };
  await _0xf8de2c.reply(_0x221549.chat, _0x17bfb5, _0x4c47d0);
};
handler.help = ["scbot"];
handler.tags = ["info"];
handler.command = ['installa'];
export default handler;
