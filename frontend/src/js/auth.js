/* ═══════════════════════════════════════════════
   GLOBIS — Auth (Firebase)
   Google · Apple · Email+Password

   SETUP (una tantum):
   1. Vai su console.firebase.google.com
   2. Crea progetto "globis"
   3. Aggiungi app Web → copia firebaseConfig
   4. Authentication → Sign-in methods → abilita
      Google, Apple, Email/Password
   5. Sostituisci firebaseConfig qui sotto
   ═══════════════════════════════════════════════ */

// ── Firebase config ──────────────────────────────
// Sostituisci con i tuoi valori da Firebase Console
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};

// ── Firebase SDK (caricato dinamicamente) ────────
let firebaseAuth  = null;
let currentUser   = null;
let authReady     = false;

async function initAuth() {
  try {
    // Import Firebase SDK v9 modular
    const { initializeApp }       = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const { getAuth, onAuthStateChanged,
            GoogleAuthProvider, OAuthProvider,
            signInWithPopup, signInWithEmailAndPassword,
            createUserWithEmailAndPassword,
            signOut: fbSignOut }  = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');

    const app  = initializeApp(FIREBASE_CONFIG);
    firebaseAuth = getAuth(app);

    // Providers
    window._googleProvider = new GoogleAuthProvider();
    window._appleProvider  = new OAuthProvider('apple.com');
    window._appleProvider.addScope('email');
    window._appleProvider.addScope('name');

    // Metodi esposti globalmente
    window.authSignInGoogle = () => signInWithPopup(firebaseAuth, window._googleProvider);
    window.authSignInApple  = () => signInWithPopup(firebaseAuth, window._appleProvider);

    window.authSignInEmail  = (email, password) =>
      signInWithEmailAndPassword(firebaseAuth, email, password);

    window.authSignUpEmail  = (email, password) =>
      createUserWithEmailAndPassword(firebaseAuth, email, password);

    window.authSignOut = () => fbSignOut(firebaseAuth);

    // Observer stato autenticazione
    onAuthStateChanged(firebaseAuth, user => {
      currentUser = user;
      authReady   = true;
      if(user) {
        onUserLoggedIn(user);
      } else {
        onUserLoggedOut();
      }
    });

  } catch(e) {
    console.warn('Firebase non configurato — modalità demo attiva', e);
    authReady = true;
    enableDemoAuth();
  }
}

// ── Callbacks stato ──────────────────────────────
function onUserLoggedIn(user) {
  currentUser = user;
  updateHeaderForUser(user);
  closeAuthModal();
}

function onUserLoggedOut() {
  currentUser = null;
  updateHeaderForGuest();
}

// ── Header aggiornato dinamicamente ──────────────
function updateHeaderForUser(user) {
  const btn = document.getElementById('btn-accedi');
  if(!btn) return;

  const name   = user.displayName || user.email?.split('@')[0] || 'Utente';
  const avatar = user.photoURL;

  btn.innerHTML = avatar
    ? `<img src="${avatar}" alt="${name}" style="width:22px;height:22px;border-radius:50%;margin-right:6px;vertical-align:middle">${name}`
    : name;

  btn.style.background = 'var(--surface)';
  btn.style.color      = 'var(--accent3)';
  btn.style.border     = '1px solid var(--border)';

  // Click sull'avatar → logout
  btn.onclick = () => {
    if(confirm('Vuoi uscire da GLOBIS?')) {
      if(window.authSignOut) window.authSignOut();
    }
  };
}

function updateHeaderForGuest() {
  const btn = document.getElementById('btn-accedi');
  if(!btn) return;
  btn.innerHTML = 'Accedi';
  btn.style.background = 'var(--accent)';
  btn.style.color      = '#03080f';
  btn.style.border     = 'none';
  btn.onclick = openAuthModal;
}

// ── Demo mode (Firebase non configurato) ─────────
function enableDemoAuth() {
  window.authSignInGoogle = async () => {
    const demoUser = { displayName:'Demo User', email:'demo@globis.app', photoURL: null, uid:'demo-001' };
    onUserLoggedIn(demoUser);
    return { user: demoUser };
  };
  window.authSignInApple = window.authSignInGoogle;
  window.authSignInEmail = async (e, p) => {
    if(!e || !p) throw new Error('Email e password richiesti');
    const demoUser = { displayName: e.split('@')[0], email: e, photoURL: null, uid:'demo-002' };
    onUserLoggedIn(demoUser);
    return { user: demoUser };
  };
  window.authSignUpEmail = window.authSignInEmail;
  window.authSignOut = async () => onUserLoggedOut();
}
