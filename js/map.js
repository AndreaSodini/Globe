/* ═══════════════════════════════════════════════
   GLOBIS — Map
   Mapbox GL JS — globo pulito, hover stati,
   niente strade né etichette superflue
   ═══════════════════════════════════════════════ */

let map = null;

function initMap() {
  mapboxgl.accessToken = GLOBIS_CONFIG.mapboxToken;

  map = new mapboxgl.Map({
    container:  'map',
    style:      buildGlobisStyle(),
    center:     GLOBIS_CONFIG.initialView.center,
    zoom:       GLOBIS_CONFIG.initialView.zoom,
    projection: 'globe',
    minZoom:    GLOBIS_CONFIG.minZoom,
    maxZoom:    GLOBIS_CONFIG.maxZoom,
  });

  map.scrollZoom.setWheelZoomRate(GLOBIS_CONFIG.scrollZoomRate);
  map.addControl(new mapboxgl.NavigationControl({ showCompass:false }), 'bottom-right');
  map.on('load',       onMapLoad);
  map.on('zoom',       onMapZoom);
  map.on('style.load', onStyleLoad);
  return map;
}

function buildGlobisStyle() {
  return {
    version: 8,
    glyphs:  'mapbox://fonts/mapbox/{fontstack}/{range}',
    sprite:  'mapbox://sprites/mapbox/navigation-night-v1',
    sources: {
      'mapbox-streets': { type:'vector', url:'mapbox://mapbox.mapbox-streets-v8' },
    },
    layers: [
      { id:'background', type:'background', paint:{ 'background-color':'#030c1a' } },
      {
        id:'water', type:'fill', source:'mapbox-streets', 'source-layer':'water',
        paint: { 'fill-color':['interpolate',['linear'],['zoom'],0,'#030c1a',8,'#041a2e',14,'#041e36'] },
      },
      {
        id:'admin-1-boundary', type:'line', source:'mapbox-streets', 'source-layer':'admin',
        filter:['==','admin_level',1],
        paint: {
          'line-color':'#122a38','line-width':0.6,
          'line-opacity':['interpolate',['linear'],['zoom'],3,0,5,0.7],
          'line-dasharray':[3,2],
        },
      },
      {
        id:'admin-0-boundary', type:'line', source:'mapbox-streets', 'source-layer':'admin',
        filter:['all',['==','admin_level',0],['==','disputed','false']],
        paint: {
          'line-color':'#1a3a50',
          'line-width':['interpolate',['linear'],['zoom'],0,0.5,4,1.0,8,1.5],
          'line-opacity':0.9,
        },
      },
      {
        id:'building', type:'fill', source:'mapbox-streets', 'source-layer':'building',
        paint: {
          'fill-color':'#0a1a22',
          'fill-opacity':['interpolate',['linear'],['zoom'],13,0,15,0.8],
        },
      },
      {
        id:'building-outline', type:'line', source:'mapbox-streets', 'source-layer':'building',
        paint: {
          'line-color':'#1a3040','line-width':0.5,
          'line-opacity':['interpolate',['linear'],['zoom'],14,0,16,0.6],
        },
      },
      {
        id:'country-hover', type:'fill', source:'mapbox-streets', 'source-layer':'admin',
        filter:['==','admin_level',0],
        paint: {
          'fill-color':'#00c8ff',
          'fill-opacity':['case',['boolean',['feature-state','hover'],false],0.07,0],
        },
      },
      {
        id:'country-hover-line', type:'line', source:'mapbox-streets', 'source-layer':'admin',
        filter:['all',['==','admin_level',0],['==','disputed','false']],
        paint: {
          'line-color':'#00c8ff',
          'line-width':['case',['boolean',['feature-state','hover'],false],2.5,0],
          'line-opacity':['case',['boolean',['feature-state','hover'],false],0.75,0],
          'line-blur':1,
        },
      },
    ],
  };
}

function onStyleLoad() {
  try { map.setFog(GLOBIS_CONFIG.fog); } catch(e) {}
}

function onMapLoad() {
  setupCountryHover();
  initMarkers(map);
  document.getElementById('lfill').style.width = '100%';
  setTimeout(() => {
    const loading = document.getElementById('loading');
    loading.classList.add('hide');
    setTimeout(() => loading.style.display='none', 700);
  }, 400);
}

let hoveredFeatureId = null;

function setupCountryHover() {
  map.on('mousemove', 'country-hover', e => {
    if(!e.features.length) return;
    map.getCanvas().style.cursor = 'pointer';
    if(hoveredFeatureId !== null) {
      map.setFeatureState({ source:'mapbox-streets', sourceLayer:'admin', id:hoveredFeatureId }, { hover:false });
    }
    hoveredFeatureId = e.features[0].id;
    map.setFeatureState({ source:'mapbox-streets', sourceLayer:'admin', id:hoveredFeatureId }, { hover:true });
  });
  map.on('mouseleave', 'country-hover', () => {
    map.getCanvas().style.cursor = '';
    if(hoveredFeatureId !== null) {
      map.setFeatureState({ source:'mapbox-streets', sourceLayer:'admin', id:hoveredFeatureId }, { hover:false });
      hoveredFeatureId = null;
    }
  });
}

function onMapZoom() {
  const z = map.getZoom();
  updateZoomUI(z);
  updateMarkersForZoom(z);
}
