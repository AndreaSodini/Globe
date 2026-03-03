/* ═══════════════════════════════════════════════
   GLOBIS — UI
   Aggiornamento componenti interfaccia
   ═══════════════════════════════════════════════ */

// ── Zoom pill ────────────────────────────────────
function updateZoomUI(z) {
  const pill  = document.getElementById('zpill');
  const cfg   = GLOBIS_CONFIG.zoomLevels;
  let label, active;

  if(z < cfg.globe) {
    label  = 'Vista globale';
    active = false;
  } else if(z < cfg.continent) {
    label  = 'Vista continente';
    active = true;
  } else if(z < cfg.country) {
    label  = 'Vista paese';
    active = true;
  } else if(z < cfg.city) {
    label  = 'Vista città';
    active = true;
  } else {
    label  = 'Vista quartiere / strada';
    active = true;
  }

  pill.textContent = label;
  pill.classList.toggle('active', active);
}

// ── Feed ─────────────────────────────────────────
function renderFeed() {
  const list = document.getElementById('flist');
  list.innerHTML = '';

  FEED_DATA.slice(0, 5).forEach(item => {
    const el = document.createElement('div');
    el.className = 'fitem';
    el.innerHTML = `
      <div class="fmeta">
        <div class="fdot ${item.type}"></div>
        <span class="freg">${item.region}</span>
        <span class="ftime">${item.time} fa</span>
      </div>
      <div class="ftitle">${item.title}</div>
      ${item.weight ? `<div class="fweight">${item.weight}</div>` : ''}
    `;
    list.appendChild(el);
  });
}

// Ruota il feed ogni 4.2 secondi
function startFeedRotation() {
  renderFeed();
  setInterval(() => {
    FEED_DATA.unshift(FEED_DATA.pop());
    renderFeed();
  }, 4200);
}

// ── Stats live (simulazione) ──────────────────────
function startStatsSimulation() {
  setInterval(() => {
    const v = document.getElementById('sv');
    const n = document.getElementById('sn');
    const u = document.getElementById('su');

    v.textContent = parseInt(v.textContent) + Math.floor(Math.random() * 2);
    n.textContent = (parseInt(n.textContent.replace('.', '')) + Math.floor(Math.random() * 5))
      .toLocaleString('it-IT');
    u.textContent = (parseFloat(u.textContent) + Math.random() * 0.1).toFixed(1) + 'K';
  }, 3500);
}
