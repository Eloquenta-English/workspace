/**
 * VocabForge — Flashcard Game
 * Spaced-repetition flashcard review with 3D flip animation.
 *
 * Exports window.FlashcardGame with init(container) and destroy().
 */

;(function() {
  "use strict";

  // ─── State ───
  var _container = null;
  var _words = [];        // shuffled deck for this session
  var _reviewQueue = [];  // words marked "still learning" go here
  var _index = 0;         // current position in _words
  var _flipped = false;
  var _sessionTotal = 0;
  var _knownCount = 0;
  var _missedCount = 0;
  var _xpEarned = 0;
  var _progressState = null;
  var _boundHandlers = {};
  var _speechSynth = (typeof window !== "undefined" && window.speechSynthesis) ? window.speechSynthesis : null;

  // ─── Helpers ───
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function speak(text) {
    if (!_speechSynth || !VF.settings.tts) return;
    _speechSynth.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85;
    _speechSynth.speak(utter);
  }

  // ─── Render the entire flashcard screen ───
  function renderGame() {
    if (!_container) return;

    var currentWord = _words[_index] || null;
    var total = _sessionTotal;
    var pos = total === 0 ? 0 : _index + 1;
    var pct = total === 0 ? 0 : Math.round(((_index) / total) * 100);

    var html = "";

    // Progress bar
    html += '<div class="fc-progress-wrap" style="margin-bottom:16px;">';
    html += '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">';
    html += '    <span style="font-size:0.8rem;color:var(--text-muted);">' + pos + ' / ' + total + ' cards</span>';
    html += '    <span style="font-size:0.8rem;color:var(--text-muted);">' + pct + '%</span>';
    html += '  </div>';
    html += '  <div style="height:8px;background:var(--surface2);border-radius:99px;overflow:hidden;">';
    html += '    <div style="height:100%;width:' + pct + '%;background:var(--accent);border-radius:99px;transition:width 0.3s ease;"></div>';
    html += '  </div>';
    html += '</div>';

    if (currentWord) {
      // Card container
      html += '<div class="flashcard-container" style="margin:0 auto 20px;">';
      html += '  <div class="flashcard' + (_flipped ? ' flipped' : '') + '" id="fcCard">';

      // Front — with Pixabay topic image background
      var imgFront = currentWord.imgFront || currentWord.img || 'https://cdn.pixabay.com/photo/2015/09/09/16/12/book-921316_640.jpg';
      html += '    <div class="flashcard-face flashcard-front" style="background-image:url(\'' + imgFront + '\');background-size:cover;background-position:center;">';
      html += '      <div class="fc-front-overlay">';
      html += '        <span class="fc-word" id="fcWord">' + esc(currentWord.word) + '</span>';
      html += '        <span style="font-size:0.9rem;color:rgba(255,255,255,0.8);text-shadow:0 1px 3px rgba(0,0,0,0.5);">' + esc(currentWord.phonetic) + '</span>';
      html += '        <button class="btn btn-secondary btn-sm" id="fcAudio" style="margin-top:8px;" onclick="event.stopPropagation();">';
      html += '          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
      html += '          <span>Listen</span>';
      html += '        </button>';
      html += '        <span class="fc-hint">Tap to reveal</span>';
      html += '      </div>';
      html += '    </div>';

      // Back — with Pixabay topic image header
      var imgBack = currentWord.imgBack || currentWord.img || 'https://cdn.pixabay.com/photo/2015/06/09/16/12/dog-803587_640.jpg';
      html += '    <div class="flashcard-face flashcard-back">';
      html += '      <div class="fc-back-img" style="background-image:url(\'' + imgBack + '\');background-size:cover;background-position:center;height:80px;border-radius:12px 12px 0 0;margin:-20px -20px 12px -20px;width:calc(100% + 40px);"></div>';
      html += '      <span class="fc-word" style="font-size:1.4rem;">' + esc(currentWord.word) + '</span>';
      html += '      <span style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">' + esc(currentWord.pos || "noun") + '</span>';
      html += '      <span class="fc-def">' + VF.makeVocabClickable(esc(currentWord.definition), VF.vocabDefs) + '</span>';
      html += '      <span class="fc-example">"' + VF.makeVocabClickable(esc(currentWord.example), VF.vocabDefs) + '"</span>';
      html += '    </div>';

      html += '  </div>'; // .flashcard
      html += '</div>';   // .flashcard-container

      // Controls
      html += '<div class="flashcard-controls">';
      html += '  <button class="btn btn-danger" id="btnStillLearning">';
      html += '    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/></svg>';
      html += '    <span>Still Learning</span>';
      html += '  </button>';
      html += '  <button class="btn btn-success" id="btnKnewThis">';
      html += '    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      html += '    <span>I Knew This</span>';
      html += '  </button>';
      html += '</div>';

    } else {
      // Should not reach here — results screen handles end state
      html += '<div class="fc-results"><p>Loading...</p></div>';
    }

    _container.innerHTML = html;
    bindCardEvents(currentWord);
  }

  // ─── Render results screen ───
  function renderResults() {
    if (!_container) return;

    var accuracy = _sessionTotal > 0 ? Math.round((_knownCount / _sessionTotal) * 100) : 0;

    var html = '';
    html += '<div style="text-align:center;padding:40px 16px;">';
    html += '  <div style="font-size:3rem;margin-bottom:12px;">' + (accuracy >= 80 ? '🎉' : accuracy >= 50 ? '💪' : '📚') + '</div>';
    html += '  <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:4px;">Session Complete!</h2>';
    html += '  <p style="color:var(--text-muted);margin-bottom:24px;">Great work reviewing your vocabulary.</p>';

    html += '  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px;">';
    html += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    html += '      <div style="font-size:1.5rem;font-weight:700;color:var(--success);">' + _knownCount + '</div>';
    html += '      <div style="font-size:0.75rem;color:var(--text-muted);">Known</div>';
    html += '    </div>';
    html += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    html += '      <div style="font-size:1.5rem;font-weight:700;color:var(--warning);">' + _missedCount + '</div>';
    html += '      <div style="font-size:0.75rem;color:var(--text-muted);">Review</div>';
    html += '    </div>';
    html += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    html += '      <div style="font-size:1.5rem;font-weight:700;color:var(--accent);">+' + _xpEarned + '</div>';
    html += '      <div style="font-size:0.75rem;color:var(--text-muted);">XP Earned</div>';
    html += '    </div>';
    html += '  </div>';

    html += '  <div style="background:var(--surface);border-radius:var(--radius);padding:12px;margin-bottom:24px;">';
    html += '    <span style="font-size:0.9rem;color:var(--text-muted);">Accuracy: </span>';
    html += '    <span style="font-weight:700;">' + accuracy + '%</span>';
    html += '  </div>';

    html += '  <div style="display:flex;gap:12px;justify-content:center;">';
    html += '    <button class="btn btn-primary" id="fcRestart">';
    html += '      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>';
    html += '      <span>Review Again</span>';
    html += '    </button>';
    html += '    <button class="btn btn-secondary" id="fcBackHome">Back to Home</button>';
    html += '  </div>';
    html += '</div>';

    _container.innerHTML = html;

    var btnRestart = document.getElementById("fcRestart");
    var btnBack = document.getElementById("fcBackHome");
    if (btnRestart) {
      btnRestart.addEventListener("click", function() {
        startSession();
      });
    }
    if (btnBack) {
      btnBack.addEventListener("click", function() {
        VF.showScreen("home");
      });
    }
  }

  // ─── Bind card-level events ───
  function bindCardEvents(word) {
    var card = document.getElementById("fcCard");
    var btnAudio = document.getElementById("fcAudio");
    var btnKnew = document.getElementById("btnKnewThis");
    var btnLearn = document.getElementById("btnStillLearning");

    if (card) {
      _boundHandlers.cardClick = function() {
        _flipped = !_flipped;
        if (_flipped) {
          card.classList.add("flipped");
          // Speak the word when flipped to back
          if (typeof VFAudio !== "undefined") VFAudio.speak(currentWord.word);
        } else {
          card.classList.remove("flipped");
        }
      };
      card.addEventListener("click", _boundHandlers.cardClick);
    }

    if (btnAudio && word) {
      _boundHandlers.audioClick = function(e) {
        e.stopPropagation();
        speak(word.word);
      };
      btnAudio.addEventListener("click", _boundHandlers.audioClick);
    }

    if (btnKnew && word) {
      _boundHandlers.knewClick = function() {
        handleAnswer(true, word);
      };
      btnKnew.addEventListener("click", _boundHandlers.knewClick);
    }

    if (btnLearn && word) {
      _boundHandlers.learnClick = function() {
        handleAnswer(false, word);
      };
      btnLearn.addEventListener("click", _boundHandlers.learnClick);
    }
  }

  // ─── Handle user answer ───
  function handleAnswer(knewIt, word) {
    if (knewIt) {
      _knownCount++;
      _xpEarned += 10;
      VF.addXP(10);
      if (_progressState) {
        Progress.recordAnswer(_progressState, true, word.id);
      }
    } else {
      _missedCount++;
      _xpEarned += 5;
      VF.addXP(5);
      // Spaced repetition: put back in the queue
      _reviewQueue.push(word);
      if (_progressState) {
        Progress.recordAnswer(_progressState, false, word.id);
      }
    }

    nextCard();
  }

  // ─── Advance to next card ───
  function nextCard() {
    _index++;
    _flipped = false;

    // If we've gone through all cards and have review items, refill
    if (_index >= _words.length && _reviewQueue.length > 0) {
      _words = shuffle(_reviewQueue);
      _reviewQueue = [];
      _index = 0;
    }

    if (_index >= _words.length) {
      // Session complete
      renderResults();
    } else {
      renderGame();
    }
  }

  // ─── Start a new session ───
  function startSession() {
    // Filter words by current level
    var level = VF.user.level || 1;
    var allWords = (typeof VOCAB_WORDS !== "undefined") ? VOCAB_WORDS : [];

    // For A1 all words are level 1; filter by level field if available
    var filtered = allWords;
    if (level <= 1) {
      // At level 1, show all A1 words
      filtered = allWords.filter(function(w) { return w.level === "A1"; });
    } else {
      filtered = allWords.filter(function(w) {
        return w.level && w.level.toUpperCase() === "A" + level;
      });
    }
    // Fallback: if filter yields nothing, use all
    if (filtered.length === 0) filtered = allWords;

    _words = shuffle(filtered);
    _reviewQueue = [];
    _index = 0;
    _flipped = false;
    _sessionTotal = _words.length;
    _knownCount = 0;
    _missedCount = 0;
    _xpEarned = 0;
    _progressState = Progress.load();

    renderGame();
  }

  // ─── HTML escape ───
  function esc(str) {
    if (!str) return "";
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ─── Public API ───
  var FlashcardGame = {
    init: function(container) {
      _container = container || null;
      if (!_container) {
        console.warn("FlashcardGame: no container provided");
        return;
      }
      startSession();
    },

    destroy: function() {
      // Cancel any ongoing speech
      if (_speechSynth) {
        _speechSynth.cancel();
      }
      // Remove event listeners by clearing innerHTML
      if (_container) {
        _container.innerHTML = "";
      }
      _container = null;
      _words = [];
      _reviewQueue = [];
      _index = 0;
      _flipped = false;
      _sessionTotal = 0;
      _knownCount = 0;
      _missedCount = 0;
      _xpEarned = 0;
      _progressState = null;
      _boundHandlers = {};
    }
  };

  // Export
  if (typeof window !== "undefined") {
    window.FlashcardGame = FlashcardGame;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { FlashcardGame: FlashcardGame };
  }

})();
