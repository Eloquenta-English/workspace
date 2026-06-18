/**
 * VocabForge — Audio System
 * Web Audio API sound effects + TTS wrapper.
 *
 * Exports window.VFAudio with:
 *   speak(text)        — TTS pronunciation
 *   playClick()        — UI click sound
 *   playCorrect()      — Correct answer chime
 *   playWrong()        — Wrong answer buzz
 *   playLevelUp()      — Level up fanfare
 *   playHeartLoss()    — Heart loss sound
 *   playConfetti()     — Confetti whoosh
 *   init()             — Call once to prepare audio context
 */

;(function() {
  "use strict";

  var _ctx = null;
  var _speechSynth = (typeof window !== "undefined" && window.speechSynthesis) ? window.speechSynthesis : null;

  // ─── Audio Context ───
  function getAudioContext() {
    if (!_ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        _ctx = new AC();
      }
    }
    return _ctx;
  }

  function ensureContext() {
    var ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  }

  // ─── Sound Effect Helpers ───
  function playTone(freq, duration, type, volume) {
    if (!VF.settings.sound) return;
    var ctx = ensureContext();
    if (!ctx) return;

    type = type || "sine";
    volume = volume || 0.15;

    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  function playNotes(notes) {
    if (!VF.settings.sound) return;
    var ctx = ensureContext();
    if (!ctx) return;

    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      var delay = n.delay || 0;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = n.type || "sine";
      osc.frequency.setValueAtTime(n.freq, ctx.currentTime + delay);

      var vol = n.volume || 0.15;
      gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + n.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + n.duration);
    }
  }

  // ─── Public Sound Effects ───
  function playClick() {
    playTone(800, 0.08, "square", 0.08);
  }

  function playCorrect() {
    playNotes([
      { freq: 523, duration: 0.12, delay: 0, type: "sine", volume: 0.15 },
      { freq: 659, duration: 0.12, delay: 0.08, type: "sine", volume: 0.15 },
      { freq: 784, duration: 0.18, delay: 0.16, type: "sine", volume: 0.12 }
    ]);
  }

  function playWrong() {
    playNotes([
      { freq: 200, duration: 0.2, delay: 0, type: "sawtooth", volume: 0.1 },
      { freq: 160, duration: 0.3, delay: 0.15, type: "sawtooth", volume: 0.08 }
    ]);
  }

  function playLevelUp() {
    playNotes([
      { freq: 523, duration: 0.15, delay: 0, type: "sine", volume: 0.15 },
      { freq: 659, duration: 0.15, delay: 0.12, type: "sine", volume: 0.15 },
      { freq: 784, duration: 0.15, delay: 0.24, type: "sine", volume: 0.15 },
      { freq: 1047, duration: 0.35, delay: 0.36, type: "sine", volume: 0.12 }
    ]);
  }

  function playHeartLoss() {
    playNotes([
      { freq: 400, duration: 0.15, delay: 0, type: "triangle", volume: 0.15 },
      { freq: 300, duration: 0.15, delay: 0.12, type: "triangle", volume: 0.12 },
      { freq: 200, duration: 0.3, delay: 0.24, type: "triangle", volume: 0.1 }
    ]);
  }

  function playConfetti() {
    if (!VF.settings.sound) return;
    var ctx = ensureContext();
    if (!ctx) return;

    // Shimmer noise burst
    var bufferSize = ctx.sampleRate * 0.3;
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    var source = ctx.createBufferSource();
    source.buffer = buffer;

    var filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3000, ctx.currentTime);
    filter.Q.setValueAtTime(0.5, ctx.currentTime);

    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime);

    // Add a sparkle tone on top
    playNotes([
      { freq: 1200, duration: 0.15, delay: 0, type: "sine", volume: 0.06 },
      { freq: 1600, duration: 0.12, delay: 0.08, type: "sine", volume: 0.05 },
      { freq: 2000, duration: 0.1, delay: 0.16, type: "sine", volume: 0.04 }
    ]);
  }

  // ─── TTS — 3 Models ───
  // Model 1: SpeechMa (browser SpeechSynthesis)
  // Model 2: NaturalReader (web API)
  // Model 3: LoveVoice AI (web API)
  var _ttsModel = 'speechma'; // default
  var _ttsVoiceIdx = 0;
  var _apiAudio = null;

  var TTS_VOICES = {
    speechma: [
      { name: 'US Female', lang: 'en-US' },
      { name: 'US Male',   lang: 'en-US' },
      { name: 'UK Female', lang: 'en-GB' },
      { name: 'UK Male',   lang: 'en-GB' },
      { name: 'AU Female', lang: 'en-AU' },
      { name: 'IN Female', lang: 'en-IN' }
    ],
    naturalreader: [
      { name: 'US Female',  id: 'en-US-Wavenet-F', lang: 'en-US' },
      { name: 'US Male',    id: 'en-US-Wavenet-D', lang: 'en-US' },
      { name: 'UK Female',  id: 'en-GB-Wavenet-F', lang: 'en-GB' },
      { name: 'UK Male',    id: 'en-GB-Wavenet-D', lang: 'en-GB' },
      { name: 'AU Female',  id: 'en-AU-Wavenet-F', lang: 'en-AU' }
    ],
    lovevoice: [
      { name: 'Amy (UK)',    id: 'amy',     lang: 'en-GB' },
      { name: 'Josh (US)',   id: 'josh',    lang: 'en-US' },
      { name: 'Joanna (US)', id: 'joanna',  lang: 'en-US' },
      { name: 'Matthew (US)',id: 'matthew', lang: 'en-US' },
      { name: 'Brian (UK)',  id: 'brian',   lang: 'en-GB' }
    ]
  };

  function setTtsModel(model, voiceIdx) {
    _ttsModel = model;
    _ttsVoiceIdx = voiceIdx || 0;
  }

  function speak(text) {
    if (!text || !VF.settings.tts) return;
    if (_ttsModel === 'speechma') {
      speakBrowser(text);
    } else {
      speakApi(text);
    }
  }

  function speakBrowser(text) {
    if (!_speechSynth) return;
    _speechSynth.cancel();
    var voices = TTS_VOICES.speechma;
    var v = voices[_ttsVoiceIdx] || voices[0];
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = v.lang;
    utter.rate = 0.85;
    // Try to match browser voice
    var browserVoices = _speechSynth.getVoices();
    var match = browserVoices.find(function(bv) { return bv.lang.startsWith(v.lang.substring(0,2)); });
    if (match) utter.voice = match;
    _speechSynth.speak(utter);
  }

  function speakApi(text) {
    if (_apiAudio) { _apiAudio.pause(); _apiAudio = null; }
    var voices = TTS_VOICES[_ttsModel];
    var v = voices[_ttsVoiceIdx] || voices[0];
    var url;
    if (_ttsModel === 'naturalreader') {
      url = 'https://api.naturalreaders.com/v0/tts/?text=' + encodeURIComponent(text) + '&voice=' + v.id + '&rate=0.85';
    } else if (_ttsModel === 'lovevoice') {
      url = 'https://api.lovevoice.ai/v1/tts?text=' + encodeURIComponent(text) + '&voice=' + v.id + '&format=mp3';
    }
    if (url) {
      _apiAudio = new Audio(url);
      _apiAudio.play().catch(function() { speakBrowser(text); });
    }
  }

  // ─── Init ───
  function init() {
    // Pre-warm audio context on first user interaction
    var handler = function() {
      ensureContext();
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("keydown", handler);
    };
    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);
    document.addEventListener("keydown", handler);
  }

  // ─── Export ───
  var VFAudio = {
    init: init,
    speak: speak,
    playClick: playClick,
    playCorrect: playCorrect,
    playWrong: playWrong,
    playLevelUp: playLevelUp,
    playHeartLoss: playHeartLoss,
    playConfetti: playConfetti
  };

  if (typeof window !== "undefined") {
    window.VFAudio = VFAudio;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { VFAudio: VFAudio };
  }

})();
