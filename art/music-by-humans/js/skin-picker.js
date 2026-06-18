/* Music By Humans — Skin Picker & Color Theme System */
/* Loads skins, handles color theme picker, persists to localStorage */

(function () {
  'use strict';

  const STORAGE_KEY = 'mbh_skin';
  const THEME_KEY = 'mbh_theme';

  const SKINS = [
    { id: 'winamp-classic', name: 'Winamp Classic', file: 'winamp-classic.css', icon: '🟢' },
    { id: 'retro-broadcast', name: 'Retro Broadcast', file: 'retro-broadcast.css', icon: '📺' },
    { id: 'bold-graphic', name: 'Bold Graphic', file: 'bold-graphic.css', icon: '🎨' },
    { id: 'textured-art', name: 'Textured Art', file: 'textured-art.css', icon: '🖌️' },
    { id: 'cyberpunk', name: 'Cyberpunk', file: 'cyberpunk.css', icon: '💜' },
    { id: 'vaporwave', name: 'Vaporwave', file: 'vaporwave.css', icon: '🌊' },
  ];

  // ── Load a skin ──────────────────────────────────────────────────────────
  function loadSkin(skinId) {
    const skin = SKINS.find(s => s.id === skinId);
    if (!skin) return;

    // Remove any previously loaded skin link
    const existing = document.getElementById('mbh-skin-link');
    if (existing) existing.remove();

    // Create new link element
    const link = document.createElement('link');
    link.id = 'mbh-skin-link';
    link.rel = 'stylesheet';
    link.href = `css/skins/${skin.file}`;
    document.head.appendChild(link);

    // Persist
    localStorage.setItem(STORAGE_KEY, skinId);

    // Update picker UI
    document.querySelectorAll('.skin-option').forEach(el => {
      el.classList.toggle('active', el.dataset.skin === skinId);
    });

    // Dispatch event
    window.dispatchEvent(new CustomEvent('mbh:skin-changed', { detail: { skin: skinId } }));
  }

  // ── Apply custom color theme ─────────────────────────────────────────────
  function applyTheme(hue, saturation, lightness) {
    const root = document.documentElement;
    root.style.setProperty('--skin-primary', `hsl(${hue}, ${saturation}%, ${lightness}%)`);
    root.style.setProperty('--skin-primary-dim', `hsl(${hue}, ${saturation}%, ${Math.max(lightness - 15, 0)}%)`);
    root.style.setProperty('--skin-primary-glow', `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`);

    // Derive accent from complementary hue
    const accentHue = (hue + 180) % 360;
    root.style.setProperty('--skin-accent', `hsl(${accentHue}, ${saturation}%, ${Math.min(lightness + 20, 90)}%)`);
    root.style.setProperty('--skin-accent-dim', `hsl(${accentHue}, ${saturation}%, ${Math.min(lightness + 5, 80)}%)`);
    root.style.setProperty('--skin-accent-glow', `hsla(${accentHue}, ${saturation}%, ${lightness}%, 0.3)`);

    localStorage.setItem(THEME_KEY, JSON.stringify({ hue, saturation, lightness }));
  }

  // ── Random theme (Easter egg) ─────────────────────────────────────────────
  function randomTheme() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.floor(Math.random() * 30);
    const lightness = 50 + Math.floor(Math.random() * 20);
    applyTheme(hue, saturation, lightness);

    // Update sliders if picker is open
    const hueSlider = document.getElementById('theme-hue');
    const satSlider = document.getElementById('theme-saturation');
    const litSlider = document.getElementById('theme-lightness');
    if (hueSlider) hueSlider.value = hue;
    if (satSlider) satSlider.value = saturation;
    if (litSlider) litSlider.value = lightness;
  }

  // ── Build skin picker modal ───────────────────────────────────────────────
  function buildSkinPicker() {
    const modal = document.getElementById('skin-picker-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="skin-picker-overlay" onclick="window.MBH_SkinPicker.close()"></div>
      <div class="skin-picker-content">
        <div class="skin-picker-header">
          <h2>🎨 Choose Your Skin</h2>
          <button class="skin-picker-close" onclick="window.MBH_SkinPicker.close()">✕</button>
        </div>
        <div class="skin-picker-grid">
          ${SKINS.map(skin => `
            <div class="skin-option" data-skin="${skin.id}" onclick="window.MBH_SkinPicker.load('${skin.id}')">
              <div class="skin-preview skin-preview--${skin.id}"></div>
              <span class="skin-name">${skin.icon} ${skin.name}</span>
            </div>
          `).join('')}
        </div>
        <div class="theme-picker">
          <h3>🎛️ Color Theme</h3>
          <div class="theme-sliders">
            <label>
              Hue
              <input type="range" id="theme-hue" min="0" max="360" value="330"
                oninput="window.MBH_SkinPicker.applyTheme(this.value,
                  document.getElementById('theme-saturation').value,
                  document.getElementById('theme-lightness').value)">
            </label>
            <label>
              Saturation
              <input type="range" id="theme-saturation" min="0" max="100" value="80"
                oninput="window.MBH_SkinPicker.applyTheme(
                  document.getElementById('theme-hue').value,
                  this.value,
                  document.getElementById('theme-lightness').value)">
            </label>
            <label>
              Lightness
              <input type="range" id="theme-lightness" min="20" max="80" value="60"
                oninput="window.MBH_SkinPicker.applyTheme(
                  document.getElementById('theme-hue').value,
                  document.getElementById('theme-saturation').value,
                  this.value)">
            </label>
          </div>
          <button class="theme-random-btn" onclick="window.MBH_SkinPicker.randomTheme()">
            🎲 Random Theme
          </button>
        </div>
      </div>
    `;
  }

  // ── Open / Close ──────────────────────────────────────────────────────────
  function open() {
    const modal = document.getElementById('skin-picker-modal');
    if (modal) {
      modal.classList.add('active');
      buildSkinPicker();
    }
  }

  function close() {
    const modal = document.getElementById('skin-picker-modal');
    if (modal) modal.classList.remove('active');
  }

  // ── Initialize ───────────────────────────────────────────────────────────
  function init() {
    // Load saved skin or default
    const savedSkin = localStorage.getItem(STORAGE_KEY) || 'retro-broadcast';
    loadSkin(savedSkin);

    // Load saved theme
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      try {
        const { hue, saturation, lightness } = JSON.parse(savedTheme);
        applyTheme(hue, saturation, lightness);
      } catch (e) { /* ignore */ }
    }

    // Build picker on first open
    document.addEventListener('DOMContentLoaded', buildSkinPicker);
  }

  // ── Public API ───────────────────────────────────────────────────────────
  window.MBH_SkinPicker = {
    load: loadSkin,
    applyTheme,
    randomTheme,
    open,
    close,
    init,
    skins: SKINS,
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
