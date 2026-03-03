/* ═══════════════════════════════════════════════
   GLOBIS — Dati eventi
   Struttura gerarchica: capitali → regionali → locali
   ═══════════════════════════════════════════════ */

const EVENTS = {

  colors: {
    vote:      '#00c8ff',
    news:      '#ff6b35',
    civic:     '#7fff6b',
    emergency: '#ff3b5c',
  },

  cta: {
    vote:      '→ Vota ora',
    news:      '→ Leggi articolo',
    civic:     '→ Partecipa',
    emergency: '→ Urgente',
  },

  // ── CAPITALI — 1 pallino per paese ──────────────
  // Visibili a zoom < 5
  // topics = lista dei temi attivi nel paese
  capitals: [
    {
      name:'Italia', flag:'🇮🇹', lat:41.9, lng:12.5,
      topics: [
        { type:'vote',  label:'Riforma pensioni',        info:'12.8K voti · in corso' },
        { type:'news',  label:'PNRR avanzamento',        info:'Report trimestrale' },
        { type:'civic', label:'Piano verde Roma',        info:'Consultazione aperta' },
        { type:'vote',  label:'Autonomia differenziata', info:'Referendum proposto' },
      ],
    },
    {
      name:'Francia', flag:'🇫🇷', lat:48.8, lng:2.3,
      topics: [
        { type:'news',  label:'Accordo climatico UE',    info:'Misure approvate' },
        { type:'vote',  label:'Riforma universitaria',   info:'45K voti' },
        { type:'civic', label:'Budget Paris 2025',       info:'3.2K partecipanti' },
      ],
    },
    {
      name:'Germania', flag:'🇩🇪', lat:52.5, lng:13.4,
      topics: [
        { type:'vote',      label:'Politica migrazione UE',  info:'45K voti' },
        { type:'emergency', label:'Crisi energetica',        info:'Votazione urgente' },
        { type:'news',      label:'Accordo rinnovabili',     info:'Aggiornamento' },
      ],
    },
    {
      name:'UK', flag:'🇬🇧', lat:51.5, lng:-0.1,
      topics: [
        { type:'civic', label:'Piano urbano Londra',     info:'Consultazione aperta' },
        { type:'vote',  label:'NHS riforma',             info:'22K voti' },
        { type:'news',  label:'Housing crisis',          info:'Report ufficiale' },
      ],
    },
    {
      name:'Spagna', flag:'🇪🇸', lat:40.4, lng:-3.7,
      topics: [
        { type:'vote',  label:'Indipendenza Catalogna',  info:'Referendum locale' },
        { type:'news',  label:'Metro Madrid L11',        info:'Nuova fermata' },
        { type:'civic', label:'Agenda urbana 2030',      info:'Piano nazionale' },
      ],
    },
    {
      name:'USA', flag:'🇺🇸', lat:38.9, lng:-77.0,
      topics: [
        { type:'vote',      label:'Politica sanitaria',  info:'89K voti federali' },
        { type:'emergency', label:'Sicurezza MX border', info:'Votazione urgente' },
        { type:'news',      label:'Fed rate decision',   info:'Impatto mercati' },
        { type:'civic',     label:'Climate bill 2025',   info:'140K firme' },
      ],
    },
    {
      name:'Brasile', flag:'🇧🇷', lat:-15.8, lng:-47.9,
      topics: [
        { type:'emergency', label:'Allerta climatica AM',  info:'Votazione urgente' },
        { type:'vote',      label:'Riforma previdenziale', info:'34K voti' },
        { type:'news',      label:'Amazzonia deforestaz.', info:'Dati 2024' },
      ],
    },
    {
      name:'Giappone', flag:'🇯🇵', lat:35.7, lng:139.7,
      topics: [
        { type:'news',  label:'Energia nucleare',        info:'Dibattito parlamentare' },
        { type:'vote',  label:'Riforma costituzionale',  info:'Sondaggio nazionale' },
        { type:'civic', label:'Smart city Tokyo',        info:'Piano 2030' },
      ],
    },
    {
      name:'India', flag:'🇮🇳', lat:28.6, lng:77.2,
      topics: [
        { type:'news',  label:'Economia digitale',       info:'+12% trimestrale' },
        { type:'vote',  label:'Riforma agricola',        info:'180K voti' },
        { type:'civic', label:'Smart cities mission',    info:'100 città coinvolte' },
      ],
    },
    {
      name:'Cina', flag:'🇨🇳', lat:39.9, lng:116.4,
      topics: [
        { type:'vote',  label:'Standard ambientali',     info:'Sondaggio industriale' },
        { type:'news',  label:'Belt and Road update',    info:'Nuovi accordi' },
      ],
    },
    {
      name:'Russia', flag:'🇷🇺', lat:55.7, lng:37.6,
      topics: [
        { type:'civic', label:'Media liberi',            info:'230K firme petizione' },
        { type:'news',  label:'Sanzioni economiche',     info:'Impatto Q4' },
      ],
    },
    {
      name:'Messico', flag:'🇲🇽', lat:19.4, lng:-99.1,
      topics: [
        { type:'emergency', label:'Sicurezza urbana',    info:'Votazione urgente' },
        { type:'vote',      label:'Riforma giudiziaria', info:'67K voti' },
        { type:'news',      label:'Economia nearshoring', info:'Crescita +8%' },
      ],
    },
    {
      name:'Sud Africa', flag:'🇿🇦', lat:-25.7, lng:28.2,
      topics: [
        { type:'civic', label:'Risorse idriche',         info:'Consultazione regionale' },
        { type:'vote',  label:'Riforma terra',           info:'Referendum proposto' },
      ],
    },
    {
      name:'Australia', flag:'🇦🇺', lat:-35.3, lng:149.1,
      topics: [
        { type:'civic', label:'Reef protection',         info:'18K firme' },
        { type:'vote',  label:'Energia rinnovabile',     info:'Piano nazionale' },
        { type:'news',  label:'Indigenous rights',       info:'Referendum 2025' },
      ],
    },
    {
      name:'Singapore', flag:'🇸🇬', lat:1.3, lng:103.8,
      topics: [
        { type:'vote',  label:'Smart city 2030',         info:'7.4K partecipanti' },
        { type:'civic', label:'Mobilità sostenibile',    info:'Piano trasporti' },
      ],
    },
    {
      name:'Grecia', flag:'🇬🇷', lat:37.98, lng:23.72,
      topics: [
        { type:'civic', label:'Atene pedonale',          info:'2.4K firme' },
        { type:'vote',  label:'Riforma pensioni',        info:'28K voti' },
        { type:'news',  label:'Crisi isole migranti',    info:'Aggiornamento' },
      ],
    },
    {
      name:'Danimarca', flag:'🇩🇰', lat:55.68, lng:12.57,
      topics: [
        { type:'vote',  label:'Copenhagen ciclabili',    info:'Piano zona nord' },
        { type:'civic', label:'Green transition',        info:'Obiettivo 2035' },
      ],
    },
    {
      name:'Belgio', flag:'🇧🇪', lat:50.85, lng:4.35,
      topics: [
        { type:'news',  label:'Quartiere EU',            info:'Riqualificazione' },
        { type:'vote',  label:'Riforma istituzionale',   info:'Consultazione' },
      ],
    },
  ],

  // ── REGIONALI — visibili zoom 5-8 ───────────────
  regional: [
    { lng:12.5,  lat:41.9,  type:'vote',      label:'Riforma pensioni IT',    info:'Votazione · 12.8K voti' },
    { lng:12.5,  lat:45.4,  type:'news',      label:'PNRR Veneto',            info:'Aggiornamento fondi' },
    { lng:9.2,   lat:45.5,  type:'vote',      label:'Piano verde Milano',     info:'4.1K firme' },
    { lng:2.3,   lat:48.8,  type:'news',      label:'Accordo climatico UE',   info:'Misure approvate' },
    { lng:2.35,  lat:48.86, type:'vote',      label:'Budget Paris 20e',       info:'3.2K partecipanti' },
    { lng:-0.1,  lat:51.5,  type:'civic',     label:'Piano urbano Londra',    info:'Consultazione aperta' },
    { lng:-0.08, lat:51.52, type:'vote',      label:'Hackney housing',        info:'1.1K partecipanti' },
    { lng:13.4,  lat:52.5,  type:'vote',      label:'Migrazione EU',          info:'45K voti' },
    { lng:13.43, lat:52.5,  type:'civic',     label:'Kreuzberg green',        info:'890 firme' },
    { lng:-74.0, lat:40.7,  type:'vote',      label:'Politica sanitaria USA', info:'89K voti' },
    { lng:139.7, lat:35.6,  type:'news',      label:'Energia nucleare JP',    info:'Dibattito' },
    { lng:-46.6, lat:-23.5, type:'emergency', label:'Allerta climatica BR',   info:'Urgente' },
    { lng:77.2,  lat:28.6,  type:'news',      label:'Economia digitale IN',   info:'+12%' },
    { lng:116.4, lat:39.9,  type:'vote',      label:'Standard CN',            info:'Sondaggio' },
    { lng:-99.1, lat:19.4,  type:'emergency', label:'Sicurezza MX',           info:'Urgente' },
    { lng:18.4,  lat:-33.9, type:'civic',     label:'Risorse idriche ZA',     info:'Consultazione' },
    { lng:37.6,  lat:55.7,  type:'civic',     label:'Media liberi RU',        info:'230K firme' },
    { lng:103.8, lat:1.3,   type:'vote',      label:'Smart city SG',          info:'7.4K partec.' },
    { lng:4.35,  lat:50.85, type:'news',      label:'Bruxelles EU quarter',   info:'Riqualificazione' },
    { lng:23.73, lat:37.98, type:'civic',     label:'Atene pedonale',         info:'2.4K firme' },
    { lng:12.57, lat:55.68, type:'vote',      label:'Copenhagen ciclabili',   info:'Zone nord' },
  ],

  // ── LOCALI — visibili zoom > 8 ───────────────────
  local: [
    { lng:12.482, lat:41.893, type:'vote',  label:'Municipio Roma I',       info:'Bilancio partecipativo' },
    { lng:12.496, lat:41.900, type:'news',  label:'Colosseo area pedonale', info:'Progetto mobilità' },
    { lng:12.610, lat:41.840, type:'news',  label:'Lavori via Appia',       info:'Aggiornamento cantieri' },
    { lng:12.470, lat:41.910, type:'civic', label:'Prati quartiere verde',  info:'45 firme' },
    { lng:9.190,  lat:45.464, type:'vote',  label:'Piano verde Milano',     info:'Parco Lambro' },
    { lng:9.185,  lat:45.470, type:'civic', label:'Isola distretto',        info:'Riqualificazione' },
    { lng:9.200,  lat:45.460, type:'news',  label:'M4 metro apertura',      info:'Nuove fermate' },
    { lng:7.686,  lat:45.074, type:'civic', label:'ZTL Torino centro',      info:'Consultazione' },
    { lng:11.256, lat:43.769, type:'vote',  label:'Tramvia Firenze L4',     info:'Referendum' },
    { lng:2.352,  lat:48.863, type:'vote',  label:'Budget Paris 20e',       info:'Budget partecipativo' },
    { lng:2.340,  lat:48.870, type:'civic', label:'Belleville verde',       info:'Parco urbano' },
    { lng:13.430, lat:52.497, type:'civic', label:'Kreuzberg spazi verdi',  info:'890 firme' },
    { lng:13.420, lat:52.505, type:'news',  label:'Mitte riqualificazione', info:'Piano B 2030' },
    { lng:-0.075, lat:51.522, type:'vote',  label:'Hackney housing',        info:'Piano abitativo' },
    { lng:-0.090, lat:51.515, type:'civic', label:'Shoreditch green',       info:'Giardini condivisi' },
    { lng:-3.703, lat:40.416, type:'news',  label:'Metro Madrid L11',       info:'Nuova fermata' },
    { lng:23.727, lat:37.983, type:'civic', label:'Monastiraki pedonale',   info:'2.4K firme' },
    { lng:14.268, lat:40.851, type:'news',  label:'Napoli porto',           info:'Waterfront' },
    { lng:14.260, lat:40.840, type:'civic', label:'Quartieri spagnoli',     info:'Piano recupero' },
    { lng:12.335, lat:45.438, type:'civic', label:'Venezia mobilità',       info:'Vaporetti elettrici' },
  ],
};
