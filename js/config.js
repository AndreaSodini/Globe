/* ═══════════════════════════════════════════════
   GLOBIS — Config
   Unico file da modificare per cambiare token,
   stile mappa, e parametri globali
   ═══════════════════════════════════════════════ */

const GLOBIS_CONFIG = {

  // ── Mapbox ──────────────────────────────────
  // Sostituisci con il tuo token da mapbox.com/account/tokens
  mapboxToken: 'pk.eyJ1IjoiYW5kYWwwMDEiLCJhIjoiY21tMXk5cHNjMDF4azJwcjJrZG52bGx3cyJ9.eqGt3cxbgar5QOWtRv_AYg',

  // Stile mappa — puoi creare il tuo su studio.mapbox.com
  mapStyle: 'mapbox://styles/mapbox/navigation-night-v1',

  // ── Vista iniziale ──────────────────────────
  initialView: {
    center: [15, 20],   // [lng, lat]
    zoom:   1.5,
  },

  // ── Limiti zoom ─────────────────────────────
  minZoom: 0.5,
  maxZoom: 20,

  // ── Sensibilità scroll zoom ──────────────────
  // Aumenta per zoom più veloce (default Mapbox: 1/450)
  scrollZoomRate: 1.5,

  // ── Soglie zoom per UI adattiva ─────────────
  zoomLevels: {
    globe:      2.5,   // < 2.5 = "Vista globale"
    continent:  5.0,   // 2.5–5 = "Vista continente"
    country:    8.0,   // 5–8   = "Vista paese"
    city:       12.0,  // 8–12  = "Vista città"
    // > 12 = "Vista quartiere / strada"
  },

  // ── Soglia per mostrare marker locali ───────
  localMarkersZoom: 5,

  // ── Atmosfera globo ─────────────────────────
  fog: {
    color:          'rgb(3, 8, 16)',
    'high-color':   'rgb(8, 20, 45)',
    'horizon-blend': 0.04,
    'space-color':  'rgb(3, 8, 16)',
    'star-intensity': 0.9,
  },

};
