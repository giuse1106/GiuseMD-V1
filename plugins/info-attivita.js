function messaggioAttivita() {
  console.log(`╭───────────────────────────────────···`);
  console.log(`│🟢  BOT ATTIVO E FUNZIONANTE!`);
  console.log(`───────────────────────────────────···`);
}

// Esegui la funzione per la prima volta
messaggioAttivita();

// Imposta l'intervallo per eseguire la funzione ogni 25 secondi (25000 millisecondi)
setInterval(messaggioAttivita, 25000);

console.log("Il bot mostrerà un messaggio di attività ogni 25 secondi.");
