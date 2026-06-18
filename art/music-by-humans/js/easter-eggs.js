/* Music By Humans — Easter Egg System */
/* Hidden developer easter eggs throughout the site */

(function () {
  'use strict';

  let idleTimer = null;
  let konamiIndex = 0;
  let clickCount = 0;
  let clickTimer = null;

  const KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  // ── 1. Konami Code → Secret Skin ────────────────────────────────────────
  function initKonami() {
    document.addEventListener('keydown', (e) => {
      if (e.key === KONAMI[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0;
          unlockSecretSkin();
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  function unlockSecretSkin() {
    // Create a special "Konami" skin dynamically
    const root = document.documentElement;
    root.style.setProperty('--skin-primary', '#ffff00');
    root.style.setProperty('--skin-accent', '#ff00ff');
    root.style.setProperty('--skin-bg', '#000033');
    root.style.setProperty('--skin-text', '#00ffff');

    showToast('🎮 KONAMI CODE ACTIVATED! Secret skin unlocked!', 5000);
    logDev('Konami code activated');
  }

  // ── 2. Click Logo 10 Times → Matrix Rain ────────────────────────────────
  function initLogoClicks() {
    const logo = document.getElementById('mbh-logo');
    if (!logo) return;

    logo.addEventListener('click', () => {
      clickCount++;

      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 3000);

      if (clickCount >= 10) {
        clickCount = 0;
        toggleMatrixRain();
      }
    });
  }

  let matrixActive = false;
  let matrixInterval = null;

  function toggleMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    matrixActive = !matrixActive;
    canvas.classList.toggle('skin-hidden', !matrixActive);

    if (matrixActive) {
      startMatrixRain();
      logDev('Matrix rain activated');
    } else {
      stopMatrixRain();
    }
  }

  function startMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    }, 33);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  function stopMatrixRain() {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
    }
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // ── 3. Type "WINAMP" → Classic Toast ────────────────────────────────────
  function initWinampType() {
    let buffer = '';
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      buffer += e.key.toUpperCase();
      if (buffer.length > 6) buffer = buffer.slice(-6);

      if (buffer.endsWith('WINAMP')) {
        showToast('🎵 WINAMP enabled! Ultimate sound machine activated.', 3000);
        logDev('WINAMP toast triggered');
      }
    });
  }

  // ── 4. Double-click Title Bar → Pane Shatter ─────────────────────────────
  function initTitleShatter() {
    const chrome = document.getElementById('mbh-chrome');
    if (!chrome) return;

    chrome.addEventListener('dblclick', (e) => {
      if (e.target.closest('.mbh-chrome-btn')) return;
      shatterPanes();
    });
  }

  function shatterPanes() {
    const panes = document.querySelectorAll('.mbh-pane:not(.skin-hidden)');
    panes.forEach(pane => {
      pane.classList.add('animate-shake');
      setTimeout(() => pane.classList.remove('animate-shake'), 500);
    });
    showToast('💥 Panes shattering... just kidding.', 2000);
    logDev('Pane shatter animation');
  }

  // ── 5. Right-click Playlist → DJ Mode ────────────────────────────────────
  function initDJMode() {
    const playlistBody = document.getElementById('playlist-pane-body');
    if (!playlistBody) return;

    playlistBody.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      toggleDJMode();
    });
  }

  let djMode = false;

  function toggleDJMode() {
    djMode = !djMode;
    const body = document.body;

    if (djMode) {
      // Add DJ mode overlay
      body.classList.add('dj-mode');
      showToast('🎧 DJ MODE activated! Crossfader enabled.', 3000);
      logDev('DJ mode ON');
    } else {
      body.classList.remove('dj-mode');
      showToast('🎧 DJ mode disabled.', 2000);
      logDev('DJ mode OFF');
    }
  }

  // ── 6. Scroll to Bottom → Hidden Credits ────────────────────────────────
  function initCreditsRoll() {
    const browserBody = document.getElementById('browser-pane-body');
    if (!browserBody) return;

    browserBody.addEventListener('scroll', () => {
      const el = browserBody;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 50) {
        showCredits();
      }
    });
  }

  function showCredits() {
    if (window._creditsShown) return;
    window._creditsShown = true;

    const console = document.getElementById('dev-console-body');
    if (console) {
      console.innerHTML += `
        <div style="color: var(--skin-primary); margin-top: 10px;">
          ═══════════════════════════════════<br>
          MUSIC BY HUMANS — CREDITS<br>
          ═══════════════════════════════════<br>
          Created by William Thomason<br>
          Concept, Design, Code<br><br>
          Genres: Jazz, Ska, Dub, Psy, DnB,<br>
          Rock, Electro, Metal<br><br>
          "Music is the universal language"<br>
          ═══════════════════════════════════
        </div>
      `;
    }
    showToast('📜 Found the credits! Check dev console (`).', 4000);
  }

  // ── 7. Backtick → Developer Console ─────────────────────────────────────
  function initDevConsole() {
    document.addEventListener('keydown', (e) => {
      if (e.key === '`') {
        e.preventDefault();
        const console = document.getElementById('dev-console');
        if (console) {
          console.classList.toggle('skin-hidden');
        }
      }
    });
  }

  // ── 8. Shift+Click Pane → Wireframe Debug View ──────────────────────────
  function initWireframeDebug() {
    document.addEventListener('click', (e) => {
      if (e.shiftKey && e.target.closest('.mbh-pane')) {
        e.preventDefault();
        const pane = e.target.closest('.mbh-pane');
        pane.classList.toggle('wireframe-debug');
      }
    });
  }

  // ── 9. Type "ANGINE" → Load First Artist ────────────────────────────────
  function initAngineType() {
    let buffer = '';
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      buffer += e.key.toUpperCase();
      if (buffer.length > 6) buffer = buffer.slice(-6);

      if (buffer.endsWith('ANGINE')) {
        showToast('🎷 Loading Angine de Poitrine...', 3000);
        // Dispatch event for app.js to handle
        window.dispatchEvent(new CustomEvent('mbh:load-artist', {
          detail: { artist: 'angine-de-poitrine' }
        }));
        logDev('ANGINE shortcut — loading first artist');
      }
    });
  }

  // ── 10. Idle 60s → Screensaver Mode ─────────────────────────────────────
  function initScreensaver() {
    resetIdleTimer();
    ['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
      document.addEventListener(event, resetIdleTimer);
    });
  }

  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    // Hide screensaver if active
    const screensaver = document.getElementById('screensaver');
    if (screensaver && !screensaver.classList.contains('skin-hidden')) {
      screensaver.classList.add('skin-hidden');
    }
    idleTimer = setTimeout(showScreensaver, 60000); // 60 seconds
  }

  function showScreensaver() {
    const screensaver = document.getElementById('screensaver');
    if (!screensaver) return;
    screensaver.classList.remove('skin-hidden');
    logDev('Screensaver activated (60s idle)');
  }

  // ── Toast Notification ───────────────────────────────────────────────────
  function showToast(message, duration = 3000) {
    let toast = document.getElementById('mbh-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mbh-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--skin-bg-elevated);
        border: var(--skin-border-primary);
        border-radius: var(--skin-radius-lg);
        padding: var(--skin-space-md) var(--skin-space-lg);
        color: var(--skin-text-bright);
        font-size: var(--skin-text-sm);
        z-index: var(--skin-z-toast);
        box-shadow: var(--skin-shadow-lg);
        animation: skin-slide-in-up 0.3s ease-out;
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
      if (toast) toast.style.display = 'none';
    }, duration);
  }

  // ── Dev Console Logger ───────────────────────────────────────────────────
  function logDev(message) {
    const console = document.getElementById('dev-console-body');
    if (!console) return;

    const time = new Date().toLocaleTimeString();
    console.innerHTML += `<div style="color: var(--skin-text-dim);">[${time}] ${message}</div>`;
    console.scrollTop = console.scrollHeight;
  }

  // ── Initialize All Easter Eggs ───────────────────────────────────────────
  function init() {
    initKonami();
    initLogoClicks();
    initWinampType();
    initTitleShatter();
    initDJMode();
    initCreditsRoll();
    initDevConsole();
    initWireframeDebug();
    initAngineType();
    initScreensaver();

    console.log('[MBH] Easter eggs loaded. Hint: try Konami code, click logo 10x, type WINAMP or ANGINE, press ` for dev console...');
  }

  // ── Public API ───────────────────────────────────────────────────────────
  window.MBH_EasterEggs = {
    init,
    showToast,
    toggleMatrixRain,
    toggleDJMode,
    logDev,
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
