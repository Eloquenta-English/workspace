// ═══════════════════════════════════════════
// QI GONG — GAME ENGINE + TTS
// Default: Calm Female voice
// ═══════════════════════════════════════════

// Debug logging helper
function qgLog(label, data) {
  var line = '[' + new Date().toLocaleTimeString() + '] ' + label;
  if (data !== undefined) {
    try { line += ' :: ' + JSON.stringify(data); } catch(e) { line += ' :: ' + String(data); }
  }
  console.log(line);
  var debugBox = document.getElementById('qgDebugBox');
  if (debugBox) {
    debugBox.value += line + '\n';
    debugBox.scrollTop = debugBox.scrollHeight;
  }
}

// Default: browser TTS (works offline, no keys needed)
var TTS_CONFIG = {
  currentModel: 'ss-default',
  rate: 0.85,
  volume: 0.85,
  voiceEnabled: true,
  _apiAudio: null,
  _voicesLoaded: false
};

var TTS_VOICES = [
  { id: 'ss-default',  name: '🌐 Browser Default',         model: 'browser', lang: 'en',    pitch: 1.0 },
  { id: 'speechma-f',  name: '🗣️ SpeechMa — Calm Female',  model: 'browser', lang: 'en-US', pitch: 1.1 },
  { id: 'nr-f',        name: '🎙️ NaturalReader — Calm Female', model: 'api-nr', lang: 'en-US', voiceId: 'en-US-Wavenet-F' },
  { id: 'lv-amy',      name: '💖 LoveVoice — Amy (UK)',    model: 'api-lv',  lang: 'en-GB', voiceId: 'amy' },
  { id: 'lv-joanna',   name: '💖 LoveVoice — Joanna (US)',  model: 'api-lv',  lang: 'en-US', voiceId: 'joanna' },
  { id: 'puter-nova',  name: '🌐 Puter.js — Nova (OpenAI)', model: 'puter', lang: 'en-US', voiceId: 'nova', provider: 'openai', model: 'tts-1-hd' }
];

function setVoiceModel(id) {
  TTS_CONFIG.currentModel = id;
  qgLog('Voice model set', id);
}

function getTtsVoice() {
  for (var i = 0; i < TTS_VOICES.length; i++) {
    if (TTS_VOICES[i].id === TTS_CONFIG.currentModel) return TTS_VOICES[i];
  }
  return TTS_VOICES[0];
}

function speakText(text, onEnd) {
  qgLog('speakText requested', { text: text.substring(0, 60) + (text.length > 60 ? '...' : ''), model: TTS_CONFIG.currentModel });
  if (!text || !TTS_CONFIG.voiceEnabled) {
    qgLog('speakText skipped', { noText: !text, voiceEnabled: TTS_CONFIG.voiceEnabled });
    if (typeof onEnd === 'function') onEnd();
    return;
  }
  var v = getTtsVoice();
  qgLog('Resolved TTS voice', v);
  var finish = function() {
    qgLog('TTS finished');
    if (typeof onEnd === 'function') onEnd();
  };
  speechSynthesis.cancel();
  if (TTS_CONFIG._apiAudio) { TTS_CONFIG._apiAudio.pause(); TTS_CONFIG._apiAudio = null; }

  if (v.model === 'browser') {
    if (!window.speechSynthesis) {
      qgLog('Browser TTS unavailable');
      if (typeof onEnd === 'function') onEnd();
      return;
    }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = v.lang;
    u.rate = TTS_CONFIG.rate;
    u.pitch = v.pitch || 1.1;
    u.volume = TTS_CONFIG.volume;
    if (TTS_CONFIG._voicesLoaded) {
      var voices = speechSynthesis.getVoices();
      var match = voices.find(function(bv) {
        return bv.lang.startsWith(v.lang.substring(0,2)) && (bv.name.toLowerCase().includes('female') || bv.name.toLowerCase().includes('woman') || bv.name.toLowerCase().includes('samantha') || bv.name.toLowerCase().includes('victoria') || bv.name.toLowerCase().includes('karen') || bv.name.toLowerCase().includes('moira') || bv.name.toLowerCase().includes('tessa') || bv.name.toLowerCase().includes('fiona'));
      });
      if (!match) match = voices.find(function(bv) { return bv.lang.startsWith(v.lang.substring(0,2)); });
      if (match) u.voice = match;
      qgLog('Browser voice selected', match ? match.name : 'default');
    }
    u.onend = function() { finish(); };
    u.onerror = function(e) { qgLog('Browser TTS error', e.error); finish(); };
    speechSynthesis.speak(u);
    qgLog('Browser TTS speak queued');
  } else if (v.model === 'puter') {
    if (typeof puter === 'undefined' || !puter.ai || !puter.ai.txt2speech) {
      qgLog('Puter.js txt2speech not available, falling back to browser');
      speakText(text, onEnd);
      return;
    }
    try {
      var opts = { voice: v.voiceId };
      if (v.provider) opts.provider = v.provider;
      if (v.model) opts.model = v.model;
      qgLog('Calling puter.ai.txt2speech', opts);
      puter.ai.txt2speech(text, opts)
        .then(function(audio) {
          qgLog('Puter TTS returned audio', typeof audio);
          TTS_CONFIG._apiAudio = audio;
          audio.volume = TTS_CONFIG.volume;
          audio.onended = finish;
          audio.onerror = function(e) { qgLog('Puter audio error', e); finish(); };
          return audio.play();
        })
        .then(function() {
          qgLog('Puter TTS playback started');
        })
        .catch(function(err) {
          qgLog('Puter TTS error', err.message || String(err));
          speakText(text, onEnd);
        });
    } catch (err) {
      qgLog('Puter TTS exception', err.message || String(err));
      speakText(text, onEnd);
    }
  } else {
    // API/Local TTS (NaturalReader / LoveVoice)
    var url, audio;
    if (v.model === 'api-nr') {
      url = 'https://api.naturalreaders.com/v0/tts/?text=' + encodeURIComponent(text) + '&voice=' + v.voiceId + '&rate=' + TTS_CONFIG.rate;
    } else if (v.model === 'api-lv') {
      url = 'https://api.lovevoice.ai/v1/tts?text=' + encodeURIComponent(text) + '&voice=' + v.voiceId + '&format=mp3';
    }
    if (!url) {
      qgLog('No URL for TTS model', v.model);
      speakText(text, onEnd);
      return;
    }
    qgLog('Loading TTS URL', url.substring(0, 120));
    audio = new Audio(url);
    TTS_CONFIG._apiAudio = audio;
    audio.volume = TTS_CONFIG.volume;
    audio.play().then(function() {
      qgLog('API TTS playback started');
      if (onEnd) audio.onended = finish;
    }).catch(function(err) {
      qgLog('API TTS playback failed', err.message || String(err));
      speakText(text, onEnd);
    });
  }
}

// ── RENDER EXERCISES ──
function renderExercises() {
  var list = document.getElementById('exerciseList');
  var html = '';
  EXERCISES.forEach(function(ex, i) {
    var mins = Math.floor(ex.duration / 60);
    var secs = ex.duration % 60;
    var dur = mins + ':' + (secs < 10 ? '0' : '') + secs;
    html += '<div class="exercise-card" id="exCard' + i + '">';
    html += '<div class="exercise-num"><div class="num">' + (i + 1) + '</div><div class="name">' + ex.name + '</div><div class="duration">' + dur + '</div></div>';
    html += '<div class="exercise-body">';
    html += '<p class="exercise-desc">' + ex.desc + '</p>';
    html += '<div class="exercise-script"><h4>Voiceover Script</h4><p>' + ex.script + '</p></div>';
    html += '<div class="exercise-tips">';
    ex.tips.forEach(function(t) {
      var cls = (t === 'Breath awareness' || t === 'Inhale up, exhale down') ? 'tip breath' : (t === 'Grounding' || t === 'Balance') ? 'tip align' : 'tip';
      html += '<span class="' + cls + '">' + t + '</span>';
    });
    html += '</div></div></div>';
  });
  list.innerHTML = html;
}

// ── INIT ──
(function initApp(){
  qgLog('Qi Gong app initializing');
  if (typeof puter !== 'undefined' && puter.ai && puter.ai.ready) {
    qgLog('Puter.js detected, waiting for ready');
    puter.ai.ready().then(function(){
      qgLog('Puter.ai ready');
    }).catch(function(err){
      qgLog('Puter.ai ready failed', err.message || String(err));
    });
  } else {
    qgLog('Puter.js not available');
  }
})();

renderExercises();

// Remove debug event listeners; rely on onclick in HTML
// Load browser voices
if (window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = function() { TTS_CONFIG._voicesLoaded = true; };
  speechSynthesis.getVoices();
  setTimeout(function() { TTS_CONFIG._voicesLoaded = true; }, 500);
}

// ── VOICEOVER CONTROLS ──
function toggleVoiceover() {
  TTS_CONFIG.voiceEnabled = !TTS_CONFIG.voiceEnabled;
  var btn = document.getElementById('voiceToggle');
  if (TTS_CONFIG.voiceEnabled) {
    btn.textContent = 'Voice On';
    btn.classList.add('active');
  } else {
    btn.textContent = 'Voice Off';
    btn.classList.remove('active');
    speechSynthesis.cancel();
    if (TTS_CONFIG._apiAudio) { TTS_CONFIG._apiAudio.pause(); TTS_CONFIG._apiAudio = null; }
  }
}

function setVoiceModel(id) {
  TTS_CONFIG.currentModel = id;
  qgLog('Voice model set', id);
}

function testVoice() {
  qgLog('Test voice button clicked');
  speakText('Welcome to your Qi Gong morning flow. Let us begin with deep breathing.');
}

function setExerciseVolume(val) {
  TTS_CONFIG.volume = val / 100;
  document.getElementById('exVolVal').textContent = val + '%';
}

// Hook up volume/rate sliders
var volSlider = document.getElementById('exVolume');
if (volSlider) volSlider.oninput = function() { setExerciseVolume(this.value); };

var rateSlider = document.getElementById('exRate');
if (rateSlider) rateSlider.oninput = function() {
  TTS_CONFIG.rate = this.value / 100;
  document.getElementById('exRateVal').textContent = (this.value / 100).toFixed(2) + 'x';
};

// ── TIMER ──
var timerInterval = null;
var timerRemaining = TOTAL_DURATION;
var timerTotal = TOTAL_DURATION;
var timerRunning = false;

function toggleTimer() {
  if (timerRemaining <= 0) { resetTimer(); return; }
  if (timerRunning) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
    document.getElementById('timerStartBtn').innerHTML = 'Resume';
    document.getElementById('timerLabel').textContent = 'Paused';
    exercisePaused = true;
    speechSynthesis.cancel();
    if (TTS_CONFIG._apiAudio) { TTS_CONFIG._apiAudio.pause(); }
  } else {
    timerRunning = true;
    document.getElementById('timerStartBtn').innerHTML = 'Pause';
    document.getElementById('timerLabel').textContent = 'Session in progress...';
    timerInterval = setInterval(function() {
      timerRemaining--;
      updateTimerDisplay();
      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerRunning = false;
        document.getElementById('timerStartBtn').innerHTML = 'Start';
        document.getElementById('timerLabel').textContent = 'Session complete!';
        document.getElementById('timerFill').style.width = '100%';
        speakText('Your Qi Gong session is complete. Namaste.');
      }
    }, 1000);
    if (currentExercise < 0) { startExerciseGuide(); }
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  timerRemaining = timerTotal;
  updateTimerDisplay();
  document.getElementById('timerStartBtn').innerHTML = 'Start';
  document.getElementById('timerLabel').textContent = 'Ready to begin';
  clearInterval(exerciseInterval);
  exerciseInterval = null;
  currentExercise = -1;
  exerciseTimeRemaining = 0;
  speechSynthesis.cancel();
  if (TTS_CONFIG._apiAudio) { TTS_CONFIG._apiAudio.pause(); TTS_CONFIG._apiAudio = null; }
  document.querySelectorAll('.exercise-card').forEach(function(c) { c.classList.remove('active', 'completed'); });
}

function updateTimerDisplay() {
  var m = Math.floor(timerRemaining / 60);
  var s = timerRemaining % 60;
  document.getElementById('timerDisplay').innerHTML = '<span>' + String(m).padStart(2, '0') + '</span><span class="timer-sep">:</span><span>' + String(s).padStart(2, '0') + '</span>';
  var pct = ((timerTotal - timerRemaining) / timerTotal) * 100;
  document.getElementById('timerFill').style.width = pct + '%';
}

// ── EXERCISE GUIDE ──
var currentExercise = -1;
var exerciseInterval = null;
var exerciseTimeRemaining = 0;
var exercisePaused = false;

function startExerciseGuide() {
  clearInterval(exerciseInterval);
  exerciseInterval = null;
  currentExercise = 0;
  exercisePaused = false;
  showExercise(0);
  startExerciseTimer(EXERCISES[0].duration);
}

function showExercise(idx) {
  document.querySelectorAll('.exercise-card').forEach(function(c) { c.classList.remove('active'); });
  document.getElementById('exCard' + idx).classList.add('active');
  document.getElementById('exCard' + idx).scrollIntoView({ behavior: 'smooth', block: 'center' });
  var ex = EXERCISES[idx];
  document.getElementById('timerLabel').textContent = 'Exercise ' + (idx + 1) + ' of ' + EXERCISES.length + ': ' + ex.name;
  if (TTS_CONFIG.voiceEnabled) { speakExerciseScript(idx); }
}

function speakExerciseScript(idx) {
  var ex = EXERCISES[idx];
  (async function(){
    await speakText(ex.script);
    if (currentExercise === idx && !exercisePaused) {
      showBreathing(4000);
    }
  })();
}

function showBreathing(duration) {
  var bi = document.getElementById('breathIndicator');
  bi.classList.add('active');
  setTimeout(function() { bi.classList.remove('active'); }, duration);
}

function startExerciseTimer(seconds) {
  exerciseTimeRemaining = seconds;
  clearInterval(exerciseInterval);
  exerciseInterval = setInterval(function() {
    if (exercisePaused) return;
    exerciseTimeRemaining--;
    if (exerciseTimeRemaining <= 0) {
      clearInterval(exerciseInterval);
      exerciseInterval = null;
      document.getElementById('exCard' + currentExercise).classList.add('completed');
      currentExercise++;
      if (currentExercise < EXERCISES.length) {
        showExercise(currentExercise);
        startExerciseTimer(EXERCISES[currentExercise].duration);
      } else {
        document.getElementById('timerLabel').textContent = 'All exercises complete!';
        speakText('Congratulations. You have completed your Qi Gong morning flow. Take a moment to feel the energy in your body.');
      }
    }
  }, 1000);
}

// ── MUSIC PLAYER ──
var musicAudio = document.getElementById('musicAudio');
var ytPlayer = null;
var ytInterval = null;
var isYt = false;

function showMusicTab(tab, btnEl) {
  document.querySelectorAll('.music-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.music-panel').forEach(function(p) { p.classList.remove('active'); });
  if (btnEl) btnEl.classList.add('active');
  document.getElementById('music-' + tab + '-panel').classList.add('active');
}

function extractYtId(url) {
  var m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function loadMusicUrl() {
  var url = document.getElementById('musicUrlInput').value.trim();
  if (!url) return;
  stopAllMusic();
  var ytId = extractYtId(url);
  if (ytId) {
    isYt = true;
    document.getElementById('musicName').textContent = 'YouTube Audio';
    document.getElementById('musicPlayer').classList.add('active');
    loadYtAudio(ytId);
    return;
  }
  isYt = false;
  document.getElementById('musicName').textContent = 'URL Audio';
  document.getElementById('musicPlayer').classList.add('active');
  musicAudio.src = url;
  setupMusicPlayer();
}

function loadYtAudio(videoId) {
  var container = document.getElementById('ytPlayer');
  container.style.display = 'block';
  container.innerHTML = '<div id="ytPlayerEl"></div>';
  if (!window.YT) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(tag, firstScript);
  }
  function createPlayer() {
    ytPlayer = new YT.Player('ytPlayerEl', {
      height: '1', width: '1',
      playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0 },
      videoId: videoId,
      events: { 'onReady': onYtReady, 'onStateChange': onYtStateChange }
    });
  }
  function onYtReady(e) {
    e.target.playVideo();
    e.target.setVolume(80);
    document.getElementById('musicPlayBtn').textContent = '\u23F8';
    updateYtTime();
  }
  function onYtStateChange(e) {
    if (e.data === YT.PlayerState.ENDED) {
      document.getElementById('musicPlayBtn').textContent = '\u25B6';
      clearInterval(ytInterval);
    }
    if (e.data === YT.PlayerState.PLAYING) {
      document.getElementById('musicPlayBtn').textContent = '\u23F8';
    }
  }
  if (window.YT && window.YT.Player) { createPlayer(); }
  else { window.onYouTubeIframeAPIReady = createPlayer; }
}

function updateYtTime() {
  clearInterval(ytInterval);
  ytInterval = setInterval(function() {
    if (!ytPlayer || !ytPlayer.getDuration) { clearInterval(ytInterval); return; }
    var cur = ytPlayer.getCurrentTime() || 0;
    var dur = ytPlayer.getDuration() || 0;
    document.getElementById('musicCurrentTime').textContent = fmtTime(cur);
    document.getElementById('musicTotalTime').textContent = fmtTime(dur);
    document.getElementById('musicProgressFill').style.width = (cur / dur * 100) + '%';
  }, 500);
}

function fmtTime(s) {
  var m = Math.floor(s / 60);
  var sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function loadMusicFile(input) {
  var file = input.files[0];
  if (!file) return;
  stopAllMusic();
  isYt = false;
  var url = URL.createObjectURL(file);
  musicAudio.src = url;
  document.getElementById('musicName').textContent = file.name;
  document.getElementById('musicPlayer').classList.add('active');
  setupMusicPlayer();
}

function setupMusicPlayer() {
  musicAudio.volume = 0.8;
  musicAudio.onloadedmetadata = function() {
    document.getElementById('musicTotalTime').textContent = fmtTime(musicAudio.duration);
  };
  musicAudio.ontimeupdate = function() {
    document.getElementById('musicCurrentTime').textContent = fmtTime(musicAudio.currentTime);
    if (musicAudio.duration) {
      document.getElementById('musicProgressFill').style.width = (musicAudio.currentTime / musicAudio.duration * 100) + '%';
    }
  };
  musicAudio.onended = function() {
    document.getElementById('musicPlayBtn').textContent = '\u25B6';
  };
  musicAudio.play();
  document.getElementById('musicPlayBtn').textContent = '\u23F8';
}

function toggleMusic() {
  if (isYt && ytPlayer) {
    if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) { ytPlayer.pauseVideo(); document.getElementById('musicPlayBtn').textContent = '\u25B6'; }
    else { ytPlayer.playVideo(); document.getElementById('musicPlayBtn').textContent = '\u23F8'; }
    return;
  }
  if (musicAudio.paused) { musicAudio.play(); document.getElementById('musicPlayBtn').textContent = '\u23F8'; }
  else { musicAudio.pause(); document.getElementById('musicPlayBtn').textContent = '\u25B6'; }
}

function seekMusic(e) {
  if (isYt || !musicAudio.duration) return;
  var rect = e.target.getBoundingClientRect();
  var pct = (e.clientX - rect.left) / rect.width;
  musicAudio.currentTime = pct * musicAudio.duration;
}

function setMusicVol(val) {
  var v = val / 100;
  musicAudio.volume = v;
  if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(val);
}

function stopAllMusic() {
  musicAudio.pause();
  musicAudio.src = '';
  if (ytPlayer && ytPlayer.destroy) { ytPlayer.destroy(); ytPlayer = null; }
  clearInterval(ytInterval);
  isYt = false;
  document.getElementById('musicPlayer').classList.remove('active');
  document.getElementById('ytPlayer').style.display = 'none';
}

// ── DRAG & DROP ──
var dropZone = document.getElementById('musicDropZone');
if (dropZone) {
  dropZone.addEventListener('dragover', function(e) { e.preventDefault(); this.style.borderColor = 'var(--accent2)'; });
  dropZone.addEventListener('dragleave', function() { this.style.borderColor = 'var(--border)'; });
  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = 'var(--border)';
    var file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      var url = URL.createObjectURL(file);
      stopAllMusic();
      isYt = false;
      musicAudio.src = url;
      document.getElementById('musicName').textContent = file.name;
      document.getElementById('musicPlayer').classList.add('active');
      setupMusicPlayer();
    }
  });
}
