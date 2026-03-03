/* ═══════════════════════════════════════════════
   GLOBIS — Main entry point
   ═══════════════════════════════════════════════ */

window.addEventListener('DOMContentLoaded', () => {
  const lfill = document.getElementById('lfill');
  lfill.style.width = '20%';

  // 1. Auth (Firebase — non blocca il resto)
  initAuth().catch(console.warn);
  lfill.style.width = '40%';

  // 2. Mappa
  initMap();
  lfill.style.width = '70%';

  // 3. UI dinamica
  startFeedRotation();
  startStatsSimulation();

  // 4. Bottone accedi
  const btn = document.getElementById('btn-accedi');
  if(btn) btn.onclick = () => openAuthModal('login');

  // 5. Resize
  window.addEventListener('resize', () => { if(map) map.resize(); });
});
