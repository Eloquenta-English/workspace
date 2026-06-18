/* ============================================================
   VocabForge — App Skeleton
   ============================================================ */

var VF = {

  /* ---------- State ---------- */
  screen: 'home',

  user: {
    xp: 0,
    level: 1,
    hearts: 5,
    streak: 0,
    bestStreak: 0,
    wordsLearned: [],
    achievements: []
  },

  settings: {
    sound: true,
    tts: true,
    theme: 'eloquent',
    font: 'nunito',
    dailyGoal: 100
  },

  /* Theme definitions: key -> label, color */
  themes: [
    { key: 'eloquent',  label: 'Eloquent',  color: '#22d3ee' },
    { key: 'charlime',  label: 'Char-Lime',  color: '#a3e635' },
    { key: 'midnight',  label: 'Midnight',   color: '#818cf8' },
    { key: 'sunset',    label: 'Sunset',     color: '#fb923c' },
    { key: 'forest',    label: 'Forest',     color: '#34d399' },
    { key: 'rose',      label: 'Rose',       color: '#fb7185' },
    { key: 'violet',    label: 'Violet',     color: '#a78bfa' },
    { key: 'ocean',     label: 'Ocean',      color: '#38bdf8' },
    { key: 'amber',     label: 'Amber',      color: '#fbbf24' },
    { key: 'crimson',   label: 'Crimson',    color: '#f87171' },
    { key: 'teal',      label: 'Teal',       color: '#2dd4bf' },
    { key: 'sakura',    label: 'Sakura',     color: '#f9a8d4' },
    { key: 'ice',       label: 'Ice',        color: '#67e8f9' },
    { key: 'burgundy',  label: 'Burgundy',   color: '#e879f9' },
    { key: 'slime',     label: 'Slime',      color: '#a855f7' },
    { key: 'geranium',  label: 'Geranium',   color: '#fb7185' },
    { key: 'light',     label: 'Light',      color: '#2563eb' }
  ],
  _themeIndex: 0,

  /* Font definitions */
  fonts: [
    { key: 'nunito',    label: 'Nunito',    family: "'Nunito', sans-serif" },
    { key: 'fredoka',   label: 'Fredoka',   family: "'Fredoka', sans-serif" },
    { key: 'quicksand', label: 'Quicksand', family: "'Quicksand', sans-serif" },
    { key: 'comfortaa', label: 'Comfortaa', family: "'Comfortaa', cursive" },
    { key: 'baloo',     label: 'Baloo 2',   family: "'Baloo 2', cursive" },
    { key: 'poppins',   label: 'Poppins',   family: "'Poppins', sans-serif" }
  ],
  _fontKey: 'nunito',

  /* Vocab definitions lookup: word (lowercase) → definition */
  vocabDefs: {},

  /* Session tracking */
  _sessionXP: 0,

  /* ---------- Confetti System ---------- */
  _confettiCanvas: null,
  _confettiCtx: null,
  _confettiParticles: [],
  _confettiAnimId: null,
  _confettiCleanupTimer: null,

  initConfettiSystem: function() {
    if (this._confettiCanvas) return;
    var container = document.createElement('div');
    container.className = 'confetti-container';
    container.id = 'confettiContainer';
    var canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    container.appendChild(canvas);
    document.body.appendChild(container);
    this._confettiCanvas = canvas;
    this._confettiCtx = canvas.getContext('2d');
    this._resizeConfetti();
    var self = this;
    window.addEventListener('resize', function() { self._resizeConfetti(); });
  },

  _resizeConfetti: function() {
    if (!this._confettiCanvas) return;
    this._confettiCanvas.width = window.innerWidth;
    this._confettiCanvas.height = window.innerHeight;
  },

  fireConfetti: function(x, y) {
    this.initConfettiSystem();

    // Default to center of screen
    if (x === undefined || x === null) x = window.innerWidth / 2;
    if (y === undefined || y === null) y = window.innerHeight / 2;

    var colors = [
      'var(--accent)', 'var(--success)', 'var(--warning)',
      '#22d3ee', '#a78bfa', '#fb923c', '#f472b6', '#60a5fa'
    ];

    var particleCount = 60;
    for (var i = 0; i < particleCount; i++) {
      var angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      var speed = 3 + Math.random() * 8;
      this._confettiParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        gravity: 0.12 + Math.random() * 0.08,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    // Play confetti sound
    if (typeof VFAudio !== 'undefined') VFAudio.playConfetti();

    // Start animation loop if not running
    if (!this._confettiAnimId) {
      this._animateConfetti();
    }

    // Auto-cleanup after 3 seconds
    if (this._confettiCleanupTimer) clearTimeout(this._confettiCleanupTimer);
    var self = this;
    this._confettiCleanupTimer = setTimeout(function() {
      self._cleanupConfetti();
    }, 3000);
  },

  _animateConfetti: function() {
    var ctx = this._confettiCtx;
    var canvas = this._confettiCanvas;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var alive = [];
    for (var i = 0; i < this._confettiParticles.length; i++) {
      var p = this._confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.008;

      if (p.opacity > 0) {
        alive.push(p);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    this._confettiParticles = alive;

    if (this._confettiParticles.length > 0) {
      var self = this;
      this._confettiAnimId = requestAnimationFrame(function() { self._animateConfetti(); });
    } else {
      this._confettiAnimId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },

  _cleanupConfetti: function() {
    this._confettiParticles = [];
    if (this._confettiAnimId) {
      cancelAnimationFrame(this._confettiAnimId);
      this._confettiAnimId = null;
    }
    if (this._confettiCtx && this._confettiCanvas) {
      this._confettiCtx.clearRect(0, 0, this._confettiCanvas.width, this._confettiCanvas.height);
    }
  },

  /* ---------- Heart Break Animation ---------- */
  triggerHeartBreak: function() {
    var heartsDisplay = document.getElementById('heartsDisplay');
    if (!heartsDisplay) return;

    // Add shake class
    heartsDisplay.classList.add('hearts-shake');

    // Flash red on the hearts text
    var heartsText = document.getElementById('heartsText');
    if (heartsText) {
      heartsText.style.color = 'var(--danger)';
      heartsText.style.transition = 'color 0.2s ease';
    }

    // Play heart loss sound
    if (typeof VFAudio !== 'undefined') VFAudio.playHeartLoss();

    // Remove shake class after animation
    var self = this;
    setTimeout(function() {
      heartsDisplay.classList.remove('hearts-shake');
      if (heartsText) {
        setTimeout(function() {
          heartsText.style.color = '';
        }, 400);
      }
    }, 500);

    // If hearts reach 0, show game over modal with stats
    if (this.user.hearts <= 0) {
      setTimeout(function() {
        self._showGameOver();
      }, 600);
    }
  },

  _showGameOver: function() {
    var elScore = document.getElementById('goScore');
    var elCorrect = document.getElementById('goCorrect');
    if (elScore) elScore.textContent = this.user.streak;
    if (elCorrect) elCorrect.textContent = this.user.bestStreak;
    this.openModal('modalGameOver');
  },

  /* ---------- Level Up Celebration ---------- */
  triggerLevelUp: function() {
    var newLevel = this.user.level;

    // Update modal content
    var el = document.getElementById('levelUpTo');
    if (el) el.textContent = 'Level ' + newLevel;

    var xpEl = document.getElementById('levelUpXP');
    if (xpEl) xpEl.textContent = '+' + this._sessionXP + ' XP this session';

    // Open modal
    this.openModal('modalLevelUp');

    // Fire confetti from center
    this.fireConfetti(window.innerWidth / 2, window.innerHeight / 2);

    // Play success sound
    if (typeof VFAudio !== 'undefined') VFAudio.playLevelUp();
  },

  /* ---------- Init ---------- */
  init: function() {
    this._themeIndex = this.themes.findIndex(function(t) { return t.key === VF.settings.theme; });
    if (this._themeIndex < 0) this._themeIndex = 0;

    this._sessionXP = 0;

    this.load();
    this._fontKey = this.settings.font || 'nunito';
    this.bindNav();
    this.bindSettings();
    this.applyTheme();
    this.renderStats();
    this.updateHeader();
    this.showScreen(this.screen);
    this.renderThemeGrid();
    this.applyFont();

    // Init audio system
    if (typeof VFAudio !== 'undefined') VFAudio.init();

    // Init confetti system (hidden until needed)
    this.initConfettiSystem();

    // Wire up TTS model/voice selectors
    var selTtsModel = document.getElementById('selTtsModel');
    var selTtsVoice = document.getElementById('selTtsVoice');
    var ttsVoices = {
      speechma: ['US Female','US Male','UK Female','UK Male','AU Female','IN Female'],
      naturalreader: ['US Female','US Male','UK Female','UK Male','AU Female'],
      lovevoice: ['Amy (UK)','Josh (US)','Joanna (US)','Matthew (US)','Brian (UK)']
    };
    function populateTtsVoices() {
      var model = selTtsModel ? selTtsModel.value : 'speechma';
      var voices = ttsVoices[model] || ttsVoices.speechma;
      if (selTtsVoice) {
        selTtsVoice.innerHTML = '';
        voices.forEach(function(v, i) {
          var opt = document.createElement('option');
          opt.value = i;
          opt.textContent = v;
          selTtsVoice.appendChild(opt);
        });
      }
      if (typeof VFAudio !== 'undefined') VFAudio.setTtsModel(model, 0);
    }
    if (selTtsModel) {
      selTtsModel.addEventListener('change', populateTtsVoices);
    }
    if (selTtsVoice) {
      selTtsVoice.addEventListener('change', function() {
        if (typeof VFAudio !== 'undefined') VFAudio.setTtsModel(selTtsModel ? selTtsModel.value : 'speechma', parseInt(selTtsVoice.value) || 0);
      });
    }
    populateTtsVoices();

    // Wire up settings button in header
    var btnSettings = document.getElementById('btnSettings');
    if (btnSettings) {
      btnSettings.addEventListener('click', function() {
        VF.openModal('modalSettings');
      });
    }

    // Wire up export/import buttons
    var btnExport = document.getElementById('btnExportProgress');
    if (btnExport) {
      btnExport.addEventListener('click', function() { VF.exportProgress(); });
    }
    var btnImport = document.getElementById('btnImportProgress');
    if (btnImport) {
      btnImport.addEventListener('click', function() { VF.importProgress(); });
    }
    var btnReset = document.getElementById('btnResetProgress');
    if (btnReset) {
      btnReset.addEventListener('click', function() { VF.resetProgressPrompt(); });
    }

    // Close modals on overlay click
    var self = this;
    document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.setAttribute('data-visible', 'false');
        }
      });
    });

    // Play click sounds on all buttons
    document.addEventListener('click', function(e) {
      if (e.target.closest('button') || e.target.closest('.nav-tab') || e.target.closest('.quiz-option') || e.target.closest('.game-card')) {
        if (typeof VFAudio !== 'undefined') VFAudio.playClick();
      }
    });

    // Vocab word click → show definition popup
    document.addEventListener('click', function(e){
      var vw = e.target.closest('.vocab-word');
      if (vw) {
        var word = vw.textContent.trim();
        var def = vw.dataset.def || VF.vocabDefs && VF.vocabDefs[word.toLowerCase()];
        if (def) {
          VF.showVocabPopup(word, def, vw);
          e.stopPropagation();
        }
      } else if (!e.target.closest('.vocab-popup')) {
        VF.hideVocabPopup();
      }
    });

    console.log('VocabForge initialized');
  },

  /* ---------- Screen Router ---------- */
  showScreen: function(name) {
    // Hide all screens
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].setAttribute('data-active', 'false');
    }

    // Show target screen
    var target = document.querySelector('.screen[data-screen="' + name + '"]');
    if (target) {
      target.setAttribute('data-active', 'true');
    }

    // Update nav tabs
    var tabs = document.querySelectorAll('.nav-tab');
    for (var j = 0; j < tabs.length; j++) {
      if (tabs[j].getAttribute('data-nav') === name) {
        tabs[j].setAttribute('data-active', 'true');
      } else {
        tabs[j].setAttribute('data-active', 'false');
      }
    }

    this.screen = name;

    // Call screen-specific renderer
    var renderer = this['render' + name.replace(/(^|-)([a-z])/g, function(m, d, c) { return c.toUpperCase(); })];
    if (typeof renderer === 'function') {
      renderer.call(this);
    }
  },

  /* ---------- Placeholder Screen Renderers ---------- */
  renderHome: function() {
    // Set hero image
    var hero = document.getElementById('homeHero');
    if(hero && typeof VFImages !== 'undefined'){
      var topics = Object.keys(VFImages);
      var randomTopic = topics[Math.floor(Math.random() * topics.length)];
      hero.style.backgroundImage = "url('" + VFImages[randomTopic] + "')";
    }
    // Update daily goal
    var goalFill = document.getElementById('dailyGoalFill');
    var goalText = document.getElementById('dailyGoalText');
    if(goalFill && goalText){
      var pct = Math.min(100, Math.round((this.user.xp / this.settings.dailyGoal) * 100));
      goalFill.style.width = pct + '%';
      goalText.textContent = this.user.xp + ' / ' + this.settings.dailyGoal + ' XP';
    }
  },

  renderFlashcards: function() {
    var container = document.querySelector('.screen[data-screen="flashcards"] .screen-content');
    if (!container) return;
    if (container.getAttribute('data-initialized') === 'true') return;
    container.setAttribute('data-initialized', 'true');
    container.innerHTML = '';
    if (typeof window.FlashcardGame !== 'undefined') {
      window.FlashcardGame.init(container);
    } else {
      container.innerHTML = '<div class="coming-soon"><p>Flashcards failed to load.</p></div>';
    }
  },

  renderGamesMenu: function() {
    // Games menu is static
  },

  renderGrammar: function() {
    var container = document.querySelector('.screen[data-screen="grammar"] .screen-content');
    if (!container) return;
    if (container.getAttribute('data-initialized') === 'true') return;
    container.setAttribute('data-initialized', 'true');
    container.innerHTML = '';
    if (typeof window.GrammarDrill !== 'undefined') {
      window.GrammarDrill.init(container);
    } else {
      container.innerHTML = '<div class="coming-soon"><p>Grammar drills failed to load.</p></div>';
    }
  },

  renderStats: function() {
    var elXP = document.getElementById('statXP');
    var elStreak = document.getElementById('statStreak');
    var elBest = document.getElementById('statBestStreak');
    var elWords = document.getElementById('statWords');

    if (elXP) elXP.textContent = this.user.xp;
    if (elStreak) elStreak.textContent = this.user.streak;
    if (elBest) elBest.textContent = this.user.bestStreak;
    if (elWords) elWords.textContent = this.user.wordsLearned.length;
  },

  renderSettings: function() {
    // Settings rendered via modal
  },

  renderGameQuiz: function() {
    var container = document.querySelector('.screen[data-screen="game-quiz"] .screen-content');
    if (!container) return;
    // Only init once — if already rendered, skip
    if (container.getAttribute('data-initialized') === 'true') return;
    container.setAttribute('data-initialized', 'true');
    container.innerHTML = '';
    if (typeof window.QuizGame !== 'undefined') {
      window.QuizGame.init(container);
    } else {
      container.innerHTML = '<div class="coming-soon"><p>Quiz game failed to load.</p></div>';
    }
  },

  renderGameTyping: function() {
    var container = document.querySelector('.screen[data-screen="game-typing"] .screen-content');
    if (!container) return;
    if (container.getAttribute('data-initialized') === 'true') return;
    container.setAttribute('data-initialized', 'true');
    container.innerHTML = '';
    if (typeof window.TypingGame !== 'undefined') {
      window.TypingGame.init(container);
    } else {
      container.innerHTML = '<div class="coming-soon"><p>Typing game failed to load.</p></div>';
    }
  },

  renderGameMemory: function() {
    var container = document.querySelector('.screen[data-screen="game-memory"] .screen-content');
    if (!container) return;
    // Only init once — if already rendered, skip
    if (container.getAttribute('data-initialized') === 'true') return;
    container.setAttribute('data-initialized', 'true');
    container.innerHTML = '';
    if (typeof window.MemoryGame !== 'undefined') {
      window.MemoryGame.init(container);
    } else {
      container.innerHTML = '<div class="coming-soon"><p>Memory game failed to load.</p></div>';
    }
  },

  renderGameWordsearch: function() {
    var container = document.querySelector('.screen[data-screen="game-wordsearch"] .screen-content');
    if (!container) return;
    // Only init once — if already rendered, skip
    if (container.getAttribute('data-initialized') === 'true') return;
    container.setAttribute('data-initialized', 'true');
    container.innerHTML = '';
    if (typeof window.WordSearchGame !== 'undefined') {
      window.WordSearchGame.init(container);
    } else {
      container.innerHTML = '<div class="coming-soon"><p>Word Search game failed to load.</p></div>';
    }
  },

  _comingSoon: function(screenName) {
    var el = document.querySelector('.screen[data-screen="' + screenName + '"] .coming-soon p');
    if (el) el.textContent = 'Coming Soon';
  },

  /* ---------- Header Updates ---------- */
  updateHeader: function() {
    var badge = document.getElementById('levelBadge');
    var xpFill = document.getElementById('xpFill');
    var xpText = document.getElementById('xpText');
    var heartsText = document.getElementById('heartsText');
    var streakText = document.getElementById('streakText');

    if (badge) badge.textContent = 'L' + this.user.level;

    var xpInLevel = this.user.xp % 100;
    if (xpFill) xpFill.style.width = xpInLevel + '%';
    if (xpText) xpText.textContent = xpInLevel + '/100';

    if (heartsText) heartsText.textContent = this.user.hearts + '/5';
    if (streakText) streakText.textContent = this.user.streak;
  },

  /* ---------- Navigation Binding ---------- */
  bindNav: function() {
    var nav = document.getElementById('bottomNav');
    if (!nav) return;

    var self = this;
    nav.addEventListener('click', function(e) {
      var tab = e.target.closest('.nav-tab');
      if (!tab) return;
      var screen = tab.getAttribute('data-nav');
      if (screen) {
        self.showScreen(screen);
      }
    });
  },

  /* ---------- Settings & Modal Binding ---------- */
  bindSettings: function() {
    var self = this;

    // Theme cycle button
    var btnTheme = document.getElementById('btnCycleTheme');
    if (btnTheme) {
      btnTheme.addEventListener('click', function() {
        VF.cycleTheme();
      });
    }

    // Sound toggle
    var toggleSound = document.getElementById('toggleSound');
    if (toggleSound) {
      toggleSound.checked = this.settings.sound;
      toggleSound.addEventListener('change', function() {
        VF.settings.sound = this.checked;
        VF.save();
      });
    }

    // TTS toggle
    var toggleTTS = document.getElementById('toggleTTS');
    if (toggleTTS) {
      toggleTTS.checked = this.settings.tts;
      toggleTTS.addEventListener('change', function() {
        VF.settings.tts = this.checked;
        VF.save();
      });
    }

    // Daily goal selector
    var selGoal = document.getElementById('selDailyGoal');
    if (selGoal) {
      selGoal.value = this.settings.dailyGoal;
      selGoal.addEventListener('change', function() {
        var val = parseInt(this.value, 10);
        if (val === 50 || val === 100 || val === 200) {
          VF.settings.dailyGoal = val;
          VF.save();
        }
      });
    }

    // Also support the old number input if present
    var inputGoal = document.getElementById('inputDailyGoal');
    if (inputGoal) {
      inputGoal.value = this.settings.dailyGoal;
      inputGoal.addEventListener('change', function() {
        var val = parseInt(this.value, 10);
        if (val >= 10 && val <= 500) {
          VF.settings.dailyGoal = val;
          VF.save();
        }
      });
    }
  },

  /* ---------- Modal Helpers ---------- */
  openModal: function(id) {
    var modal = document.getElementById(id);
    if (modal) modal.setAttribute('data-visible', 'true');
  },

  closeModal: function(id) {
    var modal = document.getElementById(id);
    if (modal) modal.setAttribute('data-visible', 'false');
  },

  /* ---------- Theme System ---------- */
  cycleTheme: function() {
    this._themeIndex = (this._themeIndex + 1) % this.themes.length;
    this.settings.theme = this.themes[this._themeIndex].key;
    this.applyTheme();
    this.save();
  },

  applyTheme: function() {
    document.documentElement.setAttribute('data-theme', this.settings.theme);
    var btn = document.getElementById('btnCycleTheme');
    if (btn) {
      btn.textContent = this.themes[this._themeIndex].label;
    }
  },

  /* ---------- Theme Picker ---------- */
  renderThemeGrid: function() {
    var grid = document.getElementById('themeGrid');
    if (!grid) return;
    var html = '';
    var self = this;
    this.themes.forEach(function(t) {
      html += '<button class="theme-swatch" data-theme="' + t.key + '" onclick="VF.setTheme(\'' + t.key + '\')" title="' + t.label + '"><span class="swatch-circle" style="background:' + t.color + '"></span></button>';
    });
    grid.innerHTML = html;
  },
  setTheme: function(key) {
    var idx = this.themes.findIndex(function(t){ return t.key === key; });
    if (idx >= 0) {
      this._themeIndex = idx;
      this.settings.theme = key;
      this.applyTheme();
      this.save();
    }
    this.toggleThemePicker(false);
  },
  toggleThemePicker: function(force) {
    var dd = document.getElementById('themePickerDropdown');
    if (!dd) return;
    // Close font picker too
    var fd = document.getElementById('fontPickerDropdown');
    if (fd) fd.classList.remove('open');
    var isOpen = dd.classList.contains('open');
    if (force === false) {
      dd.classList.remove('open');
    } else if (force === true) {
      dd.classList.add('open');
    } else {
      dd.classList.toggle('open');
    }
    if (dd.classList.contains('open')) {
      var self = this;
      setTimeout(function(){
        document.addEventListener('click', function closePicker(e){
          if (!e.target.closest('#themePicker')) {
            dd.classList.remove('open');
            document.removeEventListener('click', closePicker);
          }
        });
      }, 0);
    }
  },

  /* ---------- Font Picker ---------- */
  setFont: function(key) {
    var font = this.fonts.find(function(f){ return f.key === key; });
    if (!font) return;
    this._fontKey = key;
    this.settings.font = key;
    document.documentElement.style.setProperty('--font-family', font.family);
    document.querySelectorAll('.font-option').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-font') === key);
    });
    this.save();
    this.toggleFontPicker(false);
  },
  applyFont: function() {
    var font = this.fonts.find(function(f){ return f.key === VF._fontKey; });
    if (font) {
      document.documentElement.style.setProperty('--font-family', font.family);
      document.querySelectorAll('.font-option').forEach(function(btn){
        btn.classList.toggle('active', btn.getAttribute('data-font') === VF._fontKey);
      });
    }
  },
  toggleFontPicker: function(force) {
    var dd = document.getElementById('fontPickerDropdown');
    if (!dd) return;
    // Close theme picker too
    var td = document.getElementById('themePickerDropdown');
    if (td) td.classList.remove('open');
    var isOpen = dd.classList.contains('open');
    if (force === false) {
      dd.classList.remove('open');
    } else if (force === true) {
      dd.classList.add('open');
    } else {
      dd.classList.toggle('open');
    }
    if (dd.classList.contains('open')) {
      var self = this;
      setTimeout(function(){
        document.addEventListener('click', function closeFont(e){
          if (!e.target.closest('#fontPicker')) {
            dd.classList.remove('open');
            document.removeEventListener('click', closeFont);
          }
        });
      }, 0);
    }
  },

  /* ---------- Vocab Word Popup ---------- */
  showVocabPopup: function(word, definition, targetEl) {
    this.hideVocabPopup();
    var popup = document.createElement('div');
    popup.className = 'vocab-popup';
    popup.id = 'vocabPopup';
    popup.innerHTML = '<div class="vp-word">' + word + '</div><div class="vp-def">' + definition + '</div>';
    document.body.appendChild(popup);
    var rect = targetEl.getBoundingClientRect();
    var top = rect.bottom + 6;
    var left = rect.left + rect.width / 2 - popup.offsetWidth / 2;
    if (left < 8) left = 8;
    if (left + popup.offsetWidth > window.innerWidth - 8) left = window.innerWidth - popup.offsetWidth - 8;
    if (top + popup.offsetHeight > window.innerHeight - 8) top = rect.top - popup.offsetHeight - 6;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';
    var self = this;
    this._vocabPopupTimer = setTimeout(function(){ self.hideVocabPopup(); }, 4000);
  },
  hideVocabPopup: function() {
    var existing = document.getElementById('vocabPopup');
    if (existing) existing.remove();
    if (this._vocabPopupTimer) { clearTimeout(this._vocabPopupTimer); this._vocabPopupTimer = null; }
  },
  makeVocabClickable: function(text, vocabMap) {
    if (!vocabMap || !text) return text;
    var words = Object.keys(vocabMap).sort(function(a,b){ return b.length - a.length; });
    words.forEach(function(w){
      var escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var re = new RegExp('(\\b'+escaped+'\\b)', 'gi');
      text = text.replace(re, '<span class="vocab-word" data-vocab="'+w.toLowerCase()+'">$1</span>');
    });
    return text;
  },

  /* ---------- Persistence ---------- */
  save: function() {
    try {
      localStorage.setItem('vf_user', JSON.stringify(this.user));
      localStorage.setItem('vf_settings', JSON.stringify(this.settings));
    } catch (e) {
      console.warn('VocabForge: localStorage save failed', e);
    }
  },

  load: function() {
    try {
      var savedUser = localStorage.getItem('vf_user');
      var savedSettings = localStorage.getItem('vf_settings');

      if (savedUser) {
        var parsed = JSON.parse(savedUser);
        // Merge to preserve defaults for new fields
        for (var key in parsed) {
          if (parsed.hasOwnProperty(key) && this.user.hasOwnProperty(key)) {
            this.user[key] = parsed[key];
          }
        }
      }

      if (savedSettings) {
        var parsedS = JSON.parse(savedSettings);
        for (var sKey in parsedS) {
          if (parsedS.hasOwnProperty(sKey) && this.settings.hasOwnProperty(sKey)) {
            this.settings[sKey] = parsedS[sKey];
          }
        }
      }
    } catch (e) {
      console.warn('VocabForge: localStorage load failed', e);
    }
  },

  /* ---------- Export / Import / Reset ---------- */
  exportProgress: function() {
    var data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      vf_user: this.user,
      vf_settings: this.settings,
      vf_progress: null
    };
    try {
      var progData = localStorage.getItem('vocabforge_progress');
      if (progData) data.vf_progress = JSON.parse(progData);
    } catch (e) { /* ignore */ }

    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'vocabforge-progress-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importProgress: function() {
    var self = this;
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        try {
          var data = JSON.parse(ev.target.result);
          if (data.vf_user) {
            localStorage.setItem('vf_user', JSON.stringify(data.vf_user));
          }
          if (data.vf_settings) {
            localStorage.setItem('vf_settings', JSON.stringify(data.vf_settings));
          }
          if (data.vf_progress) {
            localStorage.setItem('vocabforge_progress', JSON.stringify(data.vf_progress));
          }
          self.load();
          self.updateHeader();
          self.renderStats();
          self.applyTheme();
          alert('Progress imported successfully!');
        } catch (err) {
          alert('Failed to import: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
    input.click();
  },

  resetProgressPrompt: function() {
    var confirmed = confirm('Are you sure you want to reset ALL progress? This cannot be undone.');
    if (!confirmed) return;

    // Double-confirm
    var doubleCheck = confirm('This will erase all XP, levels, hearts, streaks, and achievements. Proceed?');
    if (!doubleCheck) return;

    try {
      localStorage.removeItem('vf_user');
      localStorage.removeItem('vf_settings');
      localStorage.removeItem('vocabforge_progress');
    } catch (e) { /* ignore */ }

    this.user = {
      xp: 0,
      level: 1,
      hearts: 5,
      streak: 0,
      bestStreak: 0,
      wordsLearned: [],
      achievements: []
    };
    this.settings = {
      sound: true,
      tts: true,
      theme: 'eloquent',
      dailyGoal: 100
    };
    this._themeIndex = 0;
    this._sessionXP = 0;
    this.updateHeader();
    this.renderStats();
    this.applyTheme();
    this.save();
    alert('Progress has been reset.');
  },

  /* ---------- XP & Progress ---------- */
  addXP: function(amount) {
    this.user.xp += amount;
    this._sessionXP += amount;
    var xpInLevel = this.user.xp % 100;
    if (xpInLevel >= 0 && this.user.xp > 0 && xpInLevel < amount) {
      this.levelUp();
    }
    this.updateHeader();
    this.save();
  },

  levelUp: function() {
    this.user.level++;
    this.updateHeader();
    this.triggerLevelUp();
  },

  loseHeart: function() {
    if (this.user.hearts > 0) {
      this.user.hearts--;
      this.updateHeader();
      this.triggerHeartBreak();
      this.save();
    }
  }
};

/* ---------- DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', function() {
  VF.init();
  // Populate vocab definitions from vocabulary data
  if (typeof window !== 'undefined' && window.VOCAB_WORDS) {
    window.VOCAB_WORDS.forEach(function(w){
      VF.vocabDefs[w.word.toLowerCase()] = w.definition;
    });
  }
});
