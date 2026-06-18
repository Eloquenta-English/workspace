/* Music By Humans — App Bootstrap */
/* Initializes all modules and wires up the application */

(function () {
  'use strict';

  // ── Initialize all modules ───────────────────────────────────────────────
  function init() {
    console.log('[MBH] Music By Humans — Initializing...');

    // Skin picker (auto-inits via DOMContentLoaded in its own script)
    if (window.MBH_SkinPicker) {
      window.MBH_SkinPicker.init();
    }

    // Panes (auto-inits via DOMContentLoaded in its own script)
    if (window.MBH_Panes) {
      window.MBH_Panes.init();
    }

    // Player (auto-inits via DOMContentLoaded in its own script)
    if (window.MBH_Player) {
      window.MBH_Player.init();
    }

    // Featured artist (auto-inits via DOMContentLoaded in its own script)
    if (window.MBH_Featured) {
      window.MBH_Featured.load();
    }

    // Easter eggs (auto-inits via DOMContentLoaded in its own script)
    if (window.MBH_EasterEggs) {
      window.MBH_EasterEggs.init();
    }

    // ── Custom event listeners ────────────────────────────────────────────
    window.addEventListener('mbh:load-artist', (e) => {
      if (window.MBH_Featured && e.detail && e.detail.artist) {
        window.MBH_Featured.loadById(e.detail.artist);
      }
    });

    window.addEventListener('mbh:skin-changed', (e) => {
      console.log('[MBH] Skin changed to:', e.detail.skin);
    });

    // ── Chrome button handlers ────────────────────────────────────────────
    const minBtn = document.getElementById('mbh-min-btn');
    const maxBtn = document.getElementById('mbh-max-btn');
    const closeBtn = document.getElementById('mbh-close-btn');

    if (minBtn) minBtn.addEventListener('click', () => {
      showToast('Minimize is cosmetic in browser mode 😉');
    });
    if (maxBtn) maxBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });
    if (closeBtn) closeBtn.addEventListener('click', () => {
      showToast('You can\'t close the music! 🎵');
    });

    console.log('[MBH] Music By Humans — Ready!');
  }

  // ── Toast helper (shared with easter eggs) ───────────────────────────────
  function showToast(message, duration = 3000) {
    if (window.MBH_EasterEggs) {
      window.MBH_EasterEggs.showToast(message, duration);
    }
  }

  // ── Run ──────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
