// plugins/fun-cantina.js

let cantina = [];
const MAX_RAPITI = 10;

/**
 * Verifica se un utente è già nella cantina.
 * @param {string} userId - L'ID dell'utente da verificare.
 * @returns {boolean} - True se l'utente è nella cantina, false altrimenti.
 */
function isInCantina(userId) {
  return cantina.includes(userId);
}

/**
 * Aggiunge un utente alla cantina se c'è spazio.
 * @param {string} userId - L'ID dell'utente da aggiungere.
 * @returns {boolean} - True se l'utente è stato aggiunto, false altrimenti.
 */
function aggiungiInCantina(userId) {
  if (cantina.length < MAX_RAPITI && !isInCantina(userId)) {
    cantina.push(userId);
    return true;
  }
  return false;
}

/**
 * Rimuove un utente dalla cantina.
 * @param {string} userId - L'ID dell'utente da rimuovere.
 * @returns {boolean} - True se l'utente è stato rimosso, false altrimenti.
 */
function rimuoviDaCantina(userId) {
  const index = cantina.indexOf(userId);
  if (index > -1) {
    cantina.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Ottiene lo stato attuale della cantina.
 * @returns {Array<string>} - Un array contenente gli ID degli utenti rapiti.
 */
function getCantina() {
  return cantina;
}

export { isInCantina, aggiungiInCantina, rimuoviDaCantina, getCantina, MAX_RAPITI };