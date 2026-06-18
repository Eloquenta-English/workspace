/**
 * VocabForge — Memory Match Game
 * Flip cards to match words with their definitions.
 *
 * Exports window.MemoryGame with init(container) and destroy().
 */

;(function() {
  "use strict";

  // ─── State ───
  var _container = null;
  var _cards = [];          // { id, pairId, type, text, flipped, matched }
  var _flippedCards = [];   // indices of currently flipped cards
  var _matchedPairs = 0;
  var _totalPairs = 6;
  var _moves = 0;
  var _xpEarned = 0;
  var _timerInterval = null;
  var _seconds = 0;
  var _locked = false;      // prevent clicks during animations
  var _progressState = null;

  // ─── Helpers ───
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function esc(str) {
    if (!str) return "";
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  function truncate(str, maxLen) {
    if (!str) return "";
    return str.length > maxLen ? str.substring(0, maxLen - 2) + "..." : str;
  }

  // ─── Build card deck from vocabulary ───
  function buildDeck() {
    var allWords = (typeof VOCAB_WORDS !== "undefined") ? VOCAB_WORDS : [];
    if (allWords.length < _totalPairs) {
      while (allWords.length < _totalPairs) {
        allWords.push({
          id: "placeholder_" + allWords.length,
          word: "Word " + (allWords.length + 1),
          definition: "Definition " + (allWords.length + 1)
        });
      }
    }

    var shuffled = shuffle(allWords);
    var selected = shuffled.slice(0, _totalPairs);

    var deck = [];
    for (var i = 0; i < selected.length; i++) {
      var word = selected[i];
      // Generate a relevant image URL from Unsplash based on the word
      var imgUrl = "https://source.unsplash.com/200x120/?," + encodeURIComponent(word.word);
      // Fallback: use a themed image based on pair index
      var fallbackImgs = [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=200&h=120&fit=crop"
      ];
      var cardImg = fallbackImgs[i % fallbackImgs.length];

      // Word card — shows the word + image
      deck.push({
        id: "w_" + word.id,
        pairId: i,
        type: "word",
        text: word.word,
        img: cardImg,
        flipped: false,
        matched: false
      });
      // Definition card — shows the definition + same image
      deck.push({
        id: "d_" + word.id,
        pairId: i,
        type: "definition",
        text: word.definition,
        img: cardImg,
        flipped: false,
        matched: false
      });
    }

    return shuffle(deck);
  }

  // ─── Render the game board ───
  function renderGame() {
    if (!_container) return;

    var html = "";

    // Stats bar
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;max-width:400px;margin-left:auto;margin-right:auto;">';
    html += '  <div style="display:flex;gap:16px;align-items:center;">';
    html += '    <div style="text-align:center;">';
    html += '      <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Moves</div>';
    html += '      <div id="mmMoves" style="font-size:1.1rem;font-weight:700;">' + _moves + '</div>';
    html += '    </div>';
    html += '    <div style="text-align:center;">';
    html += '      <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Time</div>';
    html += '      <div id="mmTimer" style="font-size:1.1rem;font-weight:700;">' + formatTime(_seconds) + '</div>';
    html += '    </div>';
    html += '  </div>';
    html += '  <div style="text-align:center;">';
    html += '    <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Pairs</div>';
    html += '    <div id="mmPairs" style="font-size:1.1rem;font-weight:700;">' + _matchedPairs + '/' + _totalPairs + '</div>';
    html += '  </div>';
    html += '</div>';

    // Grid
    html += '<div class="memory-grid" id="mmGrid">';
    for (var i = 0; i < _cards.length; i++) {
      var card = _cards[i];
      var flippedClass = card.flipped || card.matched ? " flipped" : "";
      var matchedClass = card.matched ? " matched" : "";
      var typeLabel = card.type === "word"
        ? '<div style="font-size:0.6rem;color:var(--accent);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Word</div>'
        : '<div style="font-size:0.6rem;color:var(--warning);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Definition</div>';
      var displayText = card.type === "definition" ? truncate(card.text, 60) : card.text;

      html += '<div class="memory-card' + flippedClass + matchedClass + '" data-index="' + i + '" id="mmCard_' + i + '">';
      html += '  <div class="memory-card-inner">';
      html += '    <div class="memory-card-front">';
      html += '      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>';
      html += '    </div>';
      html += '    <div class="memory-card-back">';
      if (card.img) {
        html += '<img class="card-img" src="' + card.img + '" alt="" loading="lazy">';
      }
      html += typeLabel;
      html += '      <div style="line-height:1.3;">' + esc(displayText) + '</div>';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
    }
    html += '</div>'; // .memory-grid

    // XP display
    html += '<div style="text-align:center;margin-top:12px;">';
    html += '  <span style="font-size:0.8rem;color:var(--text-muted);">XP: </span>';
    html += '  <span id="mmXP" style="font-size:0.9rem;font-weight:700;color:var(--accent);">+' + _xpEarned + '</span>';
    html += '</div>';

    _container.innerHTML = html;
    bindCardClicks();
  }

  // ─── Render results screen ───
  function renderResults() {
    if (!_container) return;

    var perfectBonus = _moves <= _totalPairs ? 50 : 0;
    var totalXP = _xpEarned + perfectBonus;

    var html = '';
    html += '<div style="text-align:center;padding:32px 16px;">';
    html += '  <div style="font-size:3rem;margin-bottom:12px;">' + (perfectBonus > 0 ? '🏆' : '🎉') + '</div>';
    html += '  <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:4px;">Memory Complete!</h2>';
    html += '  <p style="color:var(--text-muted);margin-bottom:24px;">' + (perfectBonus > 0 ? 'Perfect game! Flawless victory!' : 'Great job matching all the pairs!') + '</p>';

    html += '  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px;">';
    html += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    html += '      <div style="font-size:1.5rem;font-weight:700;color:var(--accent);">' + _moves + '</div>';
    html += '      <div style="font-size:0.75rem;color:var(--text-muted);">Moves</div>';
    html += '    </div>';
    html += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    html += '      <div style="font-size:1.5rem;font-weight:700;color:var(--warning);">' + formatTime(_seconds) + '</div>';
    html += '      <div style="font-size:0.75rem;color:var(--text-muted);">Time</div>';
    html += '    </div>';
    html += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    html += '      <div style="font-size:1.5rem;font-weight:700;color:var(--success);">+' + totalXP + '</div>';
    html += '      <div style="font-size:0.75rem;color:var(--text-muted);">XP Earned</div>';
    html += '    </div>';
    html += '  </div>';

    if (perfectBonus > 0) {
      html += '  <div style="background:rgba(52,211,153,0.1);border:1px solid var(--success);border-radius:var(--radius);padding:10px;margin-bottom:24px;">';
      html += '    <span style="font-weight:700;color:var(--success);">+' + perfectBonus + ' Perfect Bonus!</span>';
      html += '    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Matched all pairs in ' + _moves + ' moves</div>';
      html += '  </div>';
    }

    html += '  <div style="display:flex;gap:12px;justify-content:center;">';
    html += '    <button class="btn btn-primary" id="mmReplay">';
    html += '      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>';
    html += '      <span>Play Again</span>';
    html += '    </button>';
    html += '    <button class="btn btn-secondary" id="mmBackGames">Back to Games</button>';
    html += '  </div>';
    html += '</div>';

    _container.innerHTML = html;

    var btnReplay = document.getElementById("mmReplay");
    var btnBack = document.getElementById("mmBackGames");
    if (btnReplay) {
      btnReplay.addEventListener("click", function() {
        startGame();
      });
    }
    if (btnBack) {
      btnBack.addEventListener("click", function() {
        VF.showScreen("games-menu");
      });
    }
  }

  // ─── Bind card click events ───
  function bindCardClicks() {
    var grid = document.getElementById("mmGrid");
    if (!grid) return;

    grid.addEventListener("click", function(e) {
      if (_locked) return;

      var cardEl = e.target.closest(".memory-card");
      if (!cardEl) return;

      var index = parseInt(cardEl.getAttribute("data-index"), 10);
      if (isNaN(index)) return;

      var card = _cards[index];
      if (!card || card.flipped || card.matched) return;
      if (_flippedCards.length >= 2) return;

      // Flip the card
      card.flipped = true;
      _flippedCards.push(index);
      cardEl.classList.add("flipped");

      if (_flippedCards.length === 2) {
        _moves++;
        updateStats();
        checkMatch();
      }
    });
  }

  // ─── Update stats display ───
  function updateStats() {
    var elMoves = document.getElementById("mmMoves");
    var elPairs = document.getElementById("mmPairs");
    if (elMoves) elMoves.textContent = _moves;
    if (elPairs) elPairs.textContent = _matchedPairs + "/" + _totalPairs;
  }

  // ─── Update timer display ───
  function updateTimer() {
    var el = document.getElementById("mmTimer");
    if (el) el.textContent = formatTime(_seconds);
  }

  // ─── Check if flipped cards match ───
  function checkMatch() {
    var idx1 = _flippedCards[0];
    var idx2 = _flippedCards[1];
    var card1 = _cards[idx1];
    var card2 = _cards[idx2];

    if (card1.pairId === card2.pairId) {
      // Match!
      card1.matched = true;
      card2.matched = true;
      _matchedPairs++;
      _xpEarned += 15;

      var el1 = document.getElementById("mmCard_" + idx1);
      var el2 = document.getElementById("mmCard_" + idx2);
      if (el1) el1.classList.add("matched");
      if (el2) el2.classList.add("matched");

      _flippedCards = [];
      updateStats();
      updateXP();

      // Speak the matched word
      if (typeof VFAudio !== "undefined") {
        // Find the word card to get the text
        var matchedWord = "";
        for (var s = 0; s < _cards.length; s++) {
          if ((_cards[s].id === _cards[idx1].id || _cards[s].id === _cards[idx2].id) && _cards[s].type === "word") {
            matchedWord = _cards[s].text;
            break;
          }
        }
        if (matchedWord) VFAudio.speak(matchedWord);
      }

      if (_matchedPairs >= _totalPairs) {
        endGame();
      }
    } else {
      // No match — shake and flip back
      _locked = true;
      var el1 = document.getElementById("mmCard_" + idx1);
      var el2 = document.getElementById("mmCard_" + idx2);
      if (el1) el1.classList.add("animate-shake");
      if (el2) el2.classList.add("animate-shake");

      setTimeout(function() {
        if (el1) {
          el1.classList.remove("flipped", "animate-shake");
        }
        if (el2) {
          el2.classList.remove("flipped", "animate-shake");
        }
        card1.flipped = false;
        card2.flipped = false;
        _flippedCards = [];
        _locked = false;
      }, 800);
    }
  }

  // ─── Update XP display ───
  function updateXP() {
    var el = document.getElementById("mmXP");
    if (el) el.textContent = "+" + _xpEarned;
  }

  // ─── Timer control ───
  function startTimer() {
    stopTimer();
    _seconds = 0;
    _timerInterval = setInterval(function() {
      _seconds++;
      updateTimer();
    }, 1000);
  }

  function stopTimer() {
    if (_timerInterval) {
      clearInterval(_timerInterval);
      _timerInterval = null;
    }
  }

  // ─── End game ───
  function endGame() {
    stopTimer();

    var perfectBonus = _moves <= _totalPairs ? 50 : 0;
    var totalXP = _xpEarned + perfectBonus;

    // Award XP through VF
    if (totalXP > 0) {
      VF.addXP(totalXP);
    }

    // Record progress
    if (_progressState) {
      // Record each matched word as a correct answer
      var matchedWordIds = [];
      for (var i = 0; i < _cards.length; i++) {
        if (_cards[i].type === "word" && _cards[i].matched) {
          var rawId = _cards[i].id.replace(/^w_/, "");
          matchedWordIds.push(rawId);
        }
      }
      for (var j = 0; j < matchedWordIds.length; j++) {
        Progress.recordAnswer(_progressState, true, matchedWordIds[j]);
      }
    }

    renderResults();
  }

  // ─── Start a new game ───
  function startGame() {
    _cards = buildDeck();
    _flippedCards = [];
    _matchedPairs = 0;
    _moves = 0;
    _xpEarned = 0;
    _seconds = 0;
    _locked = false;
    _progressState = Progress.load();

    renderGame();
    startTimer();
  }

  // ─── Public API ───
  var MemoryGame = {
    init: function(container) {
      _container = container || null;
      if (!_container) {
        console.warn("MemoryGame: no container provided");
        return;
      }
      startGame();
    },

    destroy: function() {
      stopTimer();
      if (_container) {
        _container.innerHTML = "";
      }
      _container = null;
      _cards = [];
      _flippedCards = [];
      _matchedPairs = 0;
      _moves = 0;
      _xpEarned = 0;
      _seconds = 0;
      _locked = false;
      _progressState = null;
    }
  };

  // Export
  if (typeof window !== "undefined") {
    window.MemoryGame = MemoryGame;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { MemoryGame: MemoryGame };
  }

})();
