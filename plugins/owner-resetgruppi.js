const handler = async (_0x2682b5, {
  conn: _0x1d78bd,
  usedPrefix: _0x412c7c
}) => {
  const _0x4177f3 = _0x2682b5.sender;
  const _0x42eef9 = global.db.data.users[_0x4177f3];
  if (!_0x42eef9) {
    return _0x1d78bd.reply(_0x2682b5.chat, "Errore: Utente specificato non trovato.");
  }
  if (/^(\D|_)resetgruppi/i.test(_0x2682b5.text)) {
    const _0x17b3fc = _0x2682b5.mentionedJid[0x0];
    if (!_0x17b3fc) {
      _0x42eef9.gruppiincuieadmin = undefined;
      return _0x1d78bd.reply(_0x2682b5.chat, "ⓘ I tuoi gruppi sono stati resettati con successo.", null, {
        'quoted': _0x2682b5
      });
    }
    global.db.data.users[_0x17b3fc].gruppiincuieadmin = undefined;
    return _0x1d78bd.reply(_0x2682b5.chat, "ⓘ Gruppi resettati con successo per l'utente taggato.", null, {
      'quoted': _0x2682b5
    });
  }
};
handler.command = /^(resetgruppi)$/i;
handler.rowner = true;
export default handler;
