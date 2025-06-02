import fs from 'fs'

const toMathematicalAlphanumericSymbols = text => {
	  const map = {
    'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 
    'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 
    'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
  }	
  return text.split('').map(char => map[char] || char).join('')
}

let handler = m => m
handler.all = async function (m) {
  let chat = global.db.data.chats[m.chat]
  let name = conn.getName(m.sender)

  if (/^@+393445461546|@393445461546$|@+19183829810|@19173829810$|@+380662815377|@380662815377$/i.test(m.text)) {
    if (m.sender === conn.user.jid) return


    let prova = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: `${toMathematicalAlphanumericSymbols("OWNER")}`,
          jpegThumbnail: null,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    }

    conn.reply(m.chat, `*NON* taggare il mio owner inutilmente!`, prova, m)
  }
  return !0
}

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
