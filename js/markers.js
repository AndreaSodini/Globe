/* ═══════════════════════════════════════════════
   GLOBIS — Markers
   Sistema pallini adattivo per zoom:

   ZOOM < 5  → 1 pallino per paese (capitale)
               hover = mostra top topic del paese
   ZOOM 5-8  → pallini si espandono verso regioni
   ZOOM > 8  → pallini locali distribuiti su territorio
   ═══════════════════════════════════════════════ */

// Tutti i marker istanziati, per zona e livello
const _state = {
  capitalMarkers:  [],   // 1 per paese
  regionalMarkers: [],   // per regione
  localMarkers:    [],   // per città/quartiere
  currentLevel:    null, // 'capital' | 'regional' | 'local'
  openPopup:       null,
};

// ── Entry point ──────────────────────────────────
function initMarkers(mapInstance) {
  renderCapitalMarkers();
}

// ── LIVELLO 1: Capitali (1 pallino per paese) ────
function renderCapitalMarkers() {
  if(_state.currentLevel === 'capital') return;
  _state.currentLevel = 'capital';

  // Rimuovi livelli precedenti
  clearMarkers(_state.regionalMarkers);
  clearMarkers(_state.localMarkers);

  EVENTS.capitals.forEach((country, idx) => {
    const el  = buildCapitalDot(country);
    const marker = new mapboxgl.Marker({ element:el, anchor:'center' })
      .setLngLat([country.lng, country.lat])
      .addTo(map);

    // Hover — mostra topics inline senza popup fisso
    el.addEventListener('mouseenter', e => showCountryTopics(e, country, el));
    el.addEventListener('mouseleave', () => hideCountryTopics());
    el.addEventListener('click', () => {
      map.flyTo({ center:[country.lng, country.lat], zoom:5, duration:1000 });
    });

    _state.capitalMarkers.push(marker);
  });
}

function buildCapitalDot(country) {
  const wrap = document.createElement('div');
  wrap.className = 'marker-capital';

  // Colore basato sul topic più urgente del paese
  const dominantType = getDominantType(country.topics);
  const color = EVENTS.colors[dominantType];

  wrap.innerHTML = `
    <div class="capital-dot" style="--mc:${color}">
      <div class="capital-ring"></div>
      <div class="capital-count">${country.topics.length}</div>
    </div>
  `;
  return wrap;
}

function getDominantType(topics) {
  const priority = ['emergency','vote','news','civic'];
  for(const p of priority) {
    if(topics.some(t => t.type === p)) return p;
  }
  return 'civic';
}

// ── Tooltip hover capitale ───────────────────────
let _topicTooltip = null;

function showCountryTopics(e, country, anchor) {
  hideCountryTopics();

  const tip = document.createElement('div');
  tip.className = 'country-tooltip';
  tip.innerHTML = `
    <div class="ct-header">
      <span class="ct-flag">${country.flag || ''}</span>
      <span class="ct-name">${country.name}</span>
      <span class="ct-count">${country.topics.length} topic</span>
    </div>
    <div class="ct-topics">
      ${country.topics.slice(0,4).map(t => `
        <div class="ct-topic">
          <div class="ct-dot" style="background:${EVENTS.colors[t.type]}"></div>
          <span class="ct-label">${t.label}</span>
          <span class="ct-info">${t.info}</span>
        </div>
      `).join('')}
      ${country.topics.length > 4 ? `<div class="ct-more">+${country.topics.length-4} altri</div>` : ''}
    </div>
    <div class="ct-cta">Click per esplorare →</div>
  `;

  document.body.appendChild(tip);
  _topicTooltip = tip;

  // Posiziona vicino al marker
  const rect = anchor.getBoundingClientRect();
  const tipW = 240;
  let left = rect.left + rect.width/2 - tipW/2;
  let top  = rect.top - 8;

  // Evita uscita schermo
  left = Math.max(8, Math.min(window.innerWidth - tipW - 8, left));
  if(top - 200 < 0) top = rect.bottom + 8;

  tip.style.left      = left + 'px';
  tip.style.top       = top  + 'px';
  tip.style.transform = 'translateY(-100%)';

  requestAnimationFrame(() => tip.classList.add('visible'));
}

function hideCountryTopics() {
  if(_topicTooltip) {
    _topicTooltip.remove();
    _topicTooltip = null;
  }
}

// ── LIVELLO 2: Regionali (zoom 5-8) ─────────────
function renderRegionalMarkers() {
  if(_state.currentLevel === 'regional') return;
  _state.currentLevel = 'regional';

  clearMarkers(_state.capitalMarkers);
  clearMarkers(_state.localMarkers);

  EVENTS.regional.forEach(ev => {
    const el = buildEventDot(ev, 'medium');
    const marker = new mapboxgl.Marker({ element:el, anchor:'center' })
      .setLngLat([ev.lng, ev.lat])
      .setPopup(buildPopup(ev))
      .addTo(map);
    _state.regionalMarkers.push(marker);
  });
}

// ── LIVELLO 3: Locali (zoom > 8) ────────────────
function renderLocalMarkers() {
  if(_state.currentLevel === 'local') return;
  _state.currentLevel = 'local';

  clearMarkers(_state.capitalMarkers);

  // Mantieni regionali come contesto
  if(!_state.regionalMarkers.length) {
    EVENTS.regional.forEach(ev => {
      const el = buildEventDot(ev, 'small');
      const marker = new mapboxgl.Marker({ element:el, anchor:'center' })
        .setLngLat([ev.lng, ev.lat])
        .setPopup(buildPopup(ev))
        .addTo(map);
      _state.regionalMarkers.push(marker);
    });
  }

  // Aggiungi locali
  if(!_state.localMarkers.length) {
    EVENTS.local.forEach(ev => {
      const el = buildEventDot(ev, 'small');
      const marker = new mapboxgl.Marker({ element:el, anchor:'center' })
        .setLngLat([ev.lng, ev.lat])
        .setPopup(buildPopup(ev))
        .addTo(map);
      _state.localMarkers.push(marker);
    });
  }
}

// ── Dot generico per eventi ──────────────────────
function buildEventDot(ev, size) {
  const wrap = document.createElement('div');
  wrap.className = `marker-event marker-${size}`;
  const color = EVENTS.colors[ev.type];
  wrap.innerHTML = `<div class="event-dot" style="background:${color};color:${color}"></div>`;
  return wrap;
}

// ── Popup Mapbox ─────────────────────────────────
function buildPopup(ev) {
  return new mapboxgl.Popup({ closeButton:true, closeOnClick:false, offset:12, maxWidth:'240px' })
    .setHTML(`
      <strong>${ev.label}</strong>
      <span>${ev.info}</span>
      <em>${EVENTS.cta[ev.type]}</em>
    `);
}

// ── Zoom update ──────────────────────────────────
function updateMarkersForZoom(z) {
  hideCountryTopics();

  if(z < GLOBIS_CONFIG.zoomLevels.continent) {
    // Vista globale / continente → capitali
    renderCapitalMarkers();
  } else if(z < GLOBIS_CONFIG.zoomLevels.country) {
    // Vista paese → regionali
    renderRegionalMarkers();
  } else {
    // Vista città / strada → locali
    renderLocalMarkers();
  }
}

// ── Utils ────────────────────────────────────────
function clearMarkers(arr) {
  arr.forEach(m => m.remove());
  arr.length = 0;
}
