/* ═══════════════════════════════════════════════
   GLOBIS — Auth Modal UI
   ═══════════════════════════════════════════════ */

let authModalMode = 'login'; // 'login' | 'signup'

function openAuthModal(mode = 'login') {
  authModalMode = mode;
  let modal = document.getElementById('auth-modal');
  if(!modal) {
    modal = buildAuthModal();
    document.body.appendChild(modal);
  }
  renderAuthModal(modal, mode);
  requestAnimationFrame(() => modal.classList.add('visible'));
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if(!modal) return;
  modal.classList.remove('visible');
  setTimeout(() => modal.remove(), 350);
}

function buildAuthModal() {
  const overlay = document.createElement('div');
  overlay.id = 'auth-modal';
  overlay.innerHTML = `
    <div class="auth-backdrop" onclick="closeAuthModal()"></div>
    <div class="auth-panel">
      <button class="auth-close" onclick="closeAuthModal()">✕</button>
      <div id="auth-content"></div>
    </div>
  `;
  return overlay;
}

function renderAuthModal(modal, mode) {
  const isLogin  = mode === 'login';
  const content  = modal.querySelector('#auth-content');

  content.innerHTML = `
    <div class="auth-logo">GLOBIS</div>
    <div class="auth-tagline">La polis planetaria</div>

    <h2 class="auth-title">${isLogin ? 'Accedi' : 'Crea account'}</h2>

    <!-- Social buttons -->
    <div class="auth-socials">
      <button class="auth-social-btn google" id="btn-google">
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/></svg>
        Continua con Google
      </button>
      <button class="auth-social-btn apple" id="btn-apple">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="white"><path d="M13.173 9.497c-.02-2.134 1.743-3.163 1.821-3.212-1-1.453-2.545-1.652-3.09-1.672-1.308-.134-2.56.774-3.224.774-.662 0-1.676-.757-2.76-.737-1.41.021-2.718.824-3.443 2.088C.847 9.19 2.003 13.4 3.575 15.697c.782 1.122 1.712 2.381 2.928 2.336 1.179-.048 1.622-.754 3.047-.754 1.425 0 1.824.754 3.061.73 1.267-.022 2.063-1.14 2.839-2.267.895-1.3 1.262-2.563 1.28-2.629-.028-.012-2.45-.937-2.474-3.716h-.083zM10.99 3.049C11.617 2.295 12.04 1.26 11.92.214c-.89.04-1.976.594-2.617 1.33-.574.659-1.079 1.722-.943 2.735.99.076 2.001-.503 2.63-1.23z"/></svg>
        Continua con Apple
      </button>
    </div>

    <div class="auth-divider"><span>oppure</span></div>

    <!-- Email form -->
    <form class="auth-form" id="auth-form">
      <div class="auth-field">
        <label>Email</label>
        <input type="email" id="auth-email" placeholder="nome@esempio.com" autocomplete="email" required>
      </div>
      <div class="auth-field">
        <label>Password</label>
        <input type="password" id="auth-password" placeholder="••••••••" autocomplete="${isLogin ? 'current-password' : 'new-password'}" required>
      </div>
      ${!isLogin ? `
      <div class="auth-field">
        <label>Conferma password</label>
        <input type="password" id="auth-password2" placeholder="••••••••" autocomplete="new-password" required>
      </div>` : ''}
      <div class="auth-error" id="auth-error"></div>
      <button type="submit" class="auth-submit" id="auth-submit">
        ${isLogin ? 'Accedi' : 'Crea account'}
      </button>
    </form>

    <div class="auth-switch">
      ${isLogin
        ? `Non hai un account? <a href="#" onclick="openAuthModal('signup');return false">Registrati</a>`
        : `Hai già un account? <a href="#" onclick="openAuthModal('login');return false">Accedi</a>`
      }
    </div>
  `;

  // ── Event listeners ──
  modal.querySelector('#btn-google').addEventListener('click', async () => {
    setAuthLoading(true);
    try {
      await window.authSignInGoogle();
    } catch(e) {
      showAuthError(e.message);
      setAuthLoading(false);
    }
  });

  modal.querySelector('#btn-apple').addEventListener('click', async () => {
    setAuthLoading(true);
    try {
      await window.authSignInApple();
    } catch(e) {
      showAuthError(e.message);
      setAuthLoading(false);
    }
  });

  modal.querySelector('#auth-form').addEventListener('submit', async e => {
    e.preventDefault();
    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const pass2    = document.getElementById('auth-password2')?.value;

    if(!isLogin && password !== pass2) {
      showAuthError('Le password non coincidono');
      return;
    }

    setAuthLoading(true);
    try {
      if(isLogin) {
        await window.authSignInEmail(email, password);
      } else {
        await window.authSignUpEmail(email, password);
      }
    } catch(e) {
      const msgs = {
        'auth/wrong-password':      'Password non corretta',
        'auth/user-not-found':      'Nessun account con questa email',
        'auth/email-already-in-use':'Email già registrata',
        'auth/weak-password':       'Password troppo debole (min 6 caratteri)',
        'auth/invalid-email':       'Email non valida',
      };
      showAuthError(msgs[e.code] || e.message);
      setAuthLoading(false);
    }
  });
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
}

function setAuthLoading(on) {
  const btn = document.getElementById('auth-submit');
  const socials = document.querySelectorAll('.auth-social-btn');
  if(btn) btn.disabled = on;
  socials.forEach(b => b.disabled = on);
  if(btn) btn.textContent = on ? 'Attendere…' : (authModalMode === 'login' ? 'Accedi' : 'Crea account');
}
