const _0x533e2d = _0x6970;

(function (_0x363953, _0x3b12b5) {
    const _0x2bf6b5 = _0x6970;
    const _0x160b73 = _0x363953();

    while (true) {
        try {
            const _0x4abfaf =
                (parseInt(_0x2bf6b5(0x1c1)) / 1) * (parseInt(_0x2bf6b5(0x1d5)) / 2) +
                parseInt(_0x2bf6b5(0x1d8)) / 3 -
                parseInt(_0x2bf6b5(0x1d6)) / 4 +
                (parseInt(_0x2bf6b5(0x1be)) / 5) * (-parseInt(_0x2bf6b5(0x1c7)) / 6) +
                parseInt(_0x2bf6b5(0x1d3)) / 7 +
                (parseInt(_0x2bf6b5(0x1c9)) / 8) * (-parseInt(_0x2bf6b5(0x1d2)) / 9) +
                parseInt(_0x2bf6b5(0x1d9)) / 10;

            if (_0x4abfaf === _0x3b12b5) break;
            else _0x160b73.push(_0x160b73.shift());
        } catch (_0x5888c4) {
            _0x160b73.push(_0x160b73.shift());
        }
    }
})(_0x4b48, 0x95bc0);

const handler = async (_0x2e6072, { conn: _0x3c9141, text: _0x5128e9, args: _0xe83882, usedPrefix: _0x2b8f88, command: _0x274959 }) => {
    const _0x48e36b = _0x6970;
    const example =
        '𝐄𝐬𝐞𝐦𝐩𝐢𝐨:\x0a✧‌⃟ᗒ ' +
        (_0x2b8f88 + _0x274959) +
        ' @' +
        _0x2e6072[_0x48e36b(0x1c6)].split('@')[0] +
        _0x48e36b(0x1ce) +
        (_0x2b8f88 + _0x274959) +
        ' ' +
        _0x2e6072[_0x48e36b(0x1c6)].split('@')[0] +
        '\x0a✧‌⃟ᗒ ' +
        (_0x2b8f88 + _0x274959) +
        _0x48e36b(0x1c3);

    const target =
        _0x2e6072[_0x48e36b(0x1d1)][0]
            ? _0x2e6072[_0x48e36b(0x1d1)][0]
            : _0x2e6072[_0x48e36b(0x1d7)]
            ? _0x2e6072[_0x48e36b(0x1d7)][_0x48e36b(0x1c6)]
            : _0x5128e9
            ? _0x5128e9[_0x48e36b(0x1d0)](/[^0-9]/g, '') + _0x48e36b(0x1c8)
            : false;

    if (!target)
        return _0x3c9141['reply'](_0x2e6072[_0x48e36b(0x1bc)], example, _0x2e6072, { mentions: [_0x2e6072[_0x48e36b(0x1c6)]] });

    switch (_0x274959) {
        case _0x48e36b(0x1cd):
            const numberToAdd = target;
            global[_0x48e36b(0x1d4)].push([numberToAdd]);
            let messageAdd = {
                key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                message: { extendedTextMessage: { text: _0x48e36b(0x1cc), vcard: _0x48e36b(0x1cf) } },
                participant: '0@s.whatsapp.net',
            };
            await _0x3c9141['reply'](
                _0x2e6072[_0x48e36b(0x1bc)],
                '𝐐𝐮𝐞𝐬𝐭𝐨 𝐧𝐮𝐦𝐞𝐫𝐨 𝐞́ 𝐬𝐭𝐚𝐭𝐨 𝐚𝐠𝐠𝐢𝐮𝐧𝐭𝐨 𝐚𝐥𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞𝐠𝐥𝐢 𝐨𝐰𝐧𝐞𝐫',
                messageAdd
            );
            break;

        case _0x48e36b(0x1c5):
            const numberToRemove = target;
            const index = global[_0x48e36b(0x1d4)].findIndex((_0x460f79) => _0x460f79[0] === numberToRemove);

            if (index !== -1) {
                global[_0x48e36b(0x1d4)].splice(index, 1);
                let messageRemove = {
                    key: { participants: _0x48e36b(0x1c4), fromMe: false, id: _0x48e36b(0x1ca) },
                    message: { extendedTextMessage: { text: _0x48e36b(0x1cc), vcard: _0x48e36b(0x1cf) } },
                    participant: _0x48e36b(0x1c4),
                };
                await _0x3c9141['reply'](
                    _0x2e6072[_0x48e36b(0x1bc)],
                    '𝐐𝐮𝐞𝐬𝐭𝐨 𝐧𝐮𝐦𝐞𝐫𝐨 𝐞́ 𝐬𝐭𝐚𝐭𝐨 𝐫𝐢𝐦𝐨𝐬𝐬𝐨 𝐝𝐚𝐥𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞𝐠𝐥𝐢 𝐨𝐰𝐧𝐞𝐫',
                    messageRemove
                );
            }
            break;
    }
};

function _0x6970(_0x248cd4, _0x4c1c5b) {
    const _0x4b48a0 = _0x4b48();
    return (_0x6970 = function (_0x69705, _0x193082) {
        _0x69705 = _0x69705 - 0x1bc;
        let _0x5e5afe = _0x4b48a0[_0x69705];
        return _0x5e5afe;
    })(_0x248cd4, _0x4c1c5b);
}

function _0x4b48() {
    const _0x46c2e8 = [
        'rowner',
        '𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐬𝐞𝐠𝐮𝐢𝐭𝐨 ✓',
        'addowner',
        '\x0a✧‌⃟ᗒ ',
        'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=15395490858:+1\x20(539)\x20549-0858\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD',
        'replace',
        'mentionedJid',
        '1309059KZnOBq',
        '4932081oeqWpt',
        'owner',
        '2LCxrHn',
        '4259848bpbaNb',
        'quoted',
        '1316190mNzVsU',
        '8005590bzqoEP',
        'chat',
        'findIndex',
        '2660665MxKNra',
        'splice',
        'split',
        '944119ISVatW',
        'reply',
        '\x20<𝐫𝐢𝐩𝐫𝐞𝐧𝐝𝐢