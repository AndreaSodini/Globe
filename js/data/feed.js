/* ═══════════════════════════════════════════════
   GLOBIS — Dati feed
   In produzione arriveranno dall'API in real-time
   ═══════════════════════════════════════════════ */

const FEED_DATA = [
  { type:'vote',      region:'Italia',    title:'Riforma pensioni: 12.847 voti',   time:'2m',  weight:'Peso medio: 2.1×' },
  { type:'news',      region:'Germania',  title:'Accordo UE energia rinnovabile',  time:'5m',  weight:'' },
  { type:'civic',     region:'Brasile',   title:'Emergenza climatica aperta',      time:'8m',  weight:'Pertinenza globale' },
  { type:'vote',      region:'USA',       title:'Politica sanitaria: 89.2K voti', time:'12m', weight:'Peso medio: 1.8×' },
  { type:'emergency', region:'Messico',   title:'Sicurezza urbana: urgente',       time:'15m', weight:'Alta priorità' },
  { type:'news',      region:'Giappone',  title:'Energia nucleare: dibattito',     time:'19m', weight:'' },
];
