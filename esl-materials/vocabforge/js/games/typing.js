/**
 * VocabForge — Typing Challenge Game
 * Type the word shown before time runs out.
 *
 * Exports window.TypingGame with init(container) and destroy().
 */

;(function() {
  "use strict";

  // ─── State ───
  var _container = null;
  var _timerInterval = null;
  var _seconds = 60;
  var _currentWord = null;
  var _streak = 0;
  var _bestStreak = 0;
  var _correctCount = 0;
  var _wrongCount = 0;
  var _xpEarned = 0;
  var _progressState = null;
  var _locked = false;
  var _wordStartTime = 0;
  var _usedIndices = [];

  // ─── DOM refs ───
  var _els = {};

  // ─── Helpers ───
  function pickWord() {
    if (_usedIndices.length >= window.VOCAB_WORDS.length) {
      _usedIndices = [];
    }
    var avail = [];
    for (var i = 0; i < window.VOCAB_WORDS.length; i++) {
      if (_usedIndices.indexOf(i) === -1) avail.push(i);
    }
    var idx = avail[Math.floor(Math.random() * avail.length)];
    _usedIndices.push(idx);
    _currentWord = window.VOCAB_WORDS[idx];
    _wordStartTime = Date.now();
    return _currentWord;
  }

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  function getStreakIcon(streak) {
    if (streak >= 20) return "🔥🔥🔥";
    if (streak >= 10) return "🔥🔥";
    if (streak >= 5) return "🔥";
    return "";
  }

  function getStreakScale(streak) {
    var base = 1.0;
    var bonus = Math.min(streak * 0.03, 0.5);
    return base + bonus;
  }

  // ─── Render ───
  function renderGame() {
    var streakIcon = getStreakIcon(_streak);
    var streakScale = getStreakScale(_streak);
    var word = _currentWord ? _currentWord : pickWord();

    _container.innerHTML =
      '<div class="typing-game">' +
        '<div class="typing-topbar">' +
          '<div class="typing-streak" id="typingStreak">' +
            '<span class="streak-fire" style="font-size:' + (16 * streakScale) + 'px;transform:scale(' + streakScale + ');" id="streakFire">' +
              streakIcon + '</span>' +
            '<span class="streak-label">Streak</span>' +
            '<span class="streak-num" id="streakNum">' + _streak + '</span>' +
          '</div>' +
          '<button class="btn btn-secondary typing-back" id="typingBack">&larr; Back</button>' +
          '<div class="typing-timer" id="typingTimer">' + formatTime(_seconds) + '</div>' +
        '</div>' +

        '<div class="typing-word-area" id="typingWordArea">' +
          '<div class="typing-word" id="typingWord">' + word.word + '</div>' +
          '<div class="typing-hint" id="typingHint">' + word.definition + '</div>' +
        '</div>' +

        '<div class="typing-input-wrap">' +
          '<input type="text" class="typing-input" id="typingInput" ' +
            'placeholder="Type the word and press Enter" autocomplete="off" autocapitalize="off" spellcheck="false" />' +
          '<div class="typing-feedback" id="typingFeedback"></div>' +
          '<div class="typing-submit-row">' +
            '<button class="btn btn-primary typing-submit" id="typingSubmit">Check ↵</button>' +
          '</div>' +

        '</div>' +
        '<div class="typing-stats-row">' +
          '✓ <span id="correctCount">' + _correctCount + '</span>' +
          '&nbsp;&nbsp;✗ <span id="wrongCount">' + _wrongCount + '</span>' +
          '&nbsp;&nbsp;XP <span id="xpCount">' + _xpEarned + '</span>' +
        '</div>' +
      '</div>';

    _els.input = _container.querySelector("#typingInput");
    _els.submitBtn = _container.querySelector("#typingSubmit");
    _els.timer = _container.querySelector("#typingTimer");
    _els.feedback = _container.querySelector("#typingFeedback");
    _els.wordArea = _container.querySelector("#typingWordArea");
    _els.backBtn = _container.querySelector("#typingBack");

    _els.input.focus();
    _els.input.addEventListener("keydown", onInputKeydown);
    _els.submitBtn.addEventListener("click", onSubmit);
    _els.backBtn.addEventListener("click", function() { destroy(); VF.showScreen("games-menu"); });
  }

  function renderResults() {
    var total = _correctCount + _wrongCount;
    var accuracy = total > 0 ? Math.round((_correctCount / total) * 100) : 0;
    var stars;
    if (accuracy >= 90) stars = "⭐⭐⭐";
    else if (accuracy >= 70) stars = "⭐⭐";
    else if (accuracy >= 50) stars = "⭐";
    else stars = "💪";

    _container.innerHTML =
      '<div class="typing-results">' +
        '<h2 class="screen-title">⏱ Time\'s Up!</h2>' +
        '<div class="results-stars">' + stars + '</div>' +
        '<div class="results-stats">' +
          '<div class="results-stat"><span class="results-label">Correct</span><span class="results-val correct">' + _correctCount + '</span></div>' +
          '<div class="results-stat"><span class="results-label">Wrong</span><span class="results-val wrong">' + _wrongCount + '</span></div>' +
          '<div class="results-stat"><span class="results-label">Best Streak</span><span class="results-val">' + _bestStreak + '</span></div>' +
          '<div class="results-stat"><span class="results-label">Accuracy</span><span class="results-val">' + accuracy + '%</span></div>' +
        '</div>' +
        '<div class="results-xp">+<span id="resultsXp">' + _xpEarned + '</span> XP earned!</div>' +
        '<div class="results-actions">' +
          '<button class="btn btn-primary" id="typingReplay">Play Again</button>' +
          '<button class="btn btn-secondary" id="typingBackMenu">Back to Games</button>' +
        '</div>' +
      '</div>';

    _container.querySelector("#typingReplay").addEventListener("click", function() { init(_container); });
    _container.querySelector("#typingBackMenu").addEventListener("click", function() { destroy(); VF.showScreen("games-menu"); });
  }

  // ─── Game Logic ───
  function onSubmit() {
    if (_locked) return;
    if (!_currentWord) return;

    var input = _els.input;
    var guess = input.value.trim().toLowerCase();
    var answer = _currentWord.word.toLowerCase();
    var elapsed = (Date.now() - _wordStartTime) / 1000;

    if (!guess) return;

    if (guess === answer) {
      handleCorrect(elapsed);
    } else {
      handleWrong();
    }
  }

  function handleCorrect(elapsed) {
    _locked = true;
    _correctCount++;
    _streak++;
    if (_streak > _bestStreak) _bestStreak = _streak;

    var xp = 10;
    if (elapsed < 3) xp += 5;
    xp += Math.min(_streak * 2, 20);
    _xpEarned += xp;

    if (_progressState) {
      Progress.addXP(_progressState, xp);
    }

    var input = _els.input;
    input.classList.remove("wrong");
    input.classList.add("correct");
    _els.feedback.textContent = "✓ Correct!" + (elapsed < 3 ? " ⚡ Speed bonus!" : "");
    _els.feedback.className = "typing-feedback feedback-correct";

    updateHUD();

    setTimeout(function() {
      input.classList.remove("correct");
      _els.feedback.textContent = "";
      pickWord();
      renderNextWord();
      _locked = false;
      _els.input.focus();
    }, 600);
  }

  function handleWrong() {
    _locked = true;
    _wrongCount++;
    _streak = 0;

    if (_progressState) {
      Progress.loseHeart(_progressState);
    }

    var input = _els.input;
    input.classList.remove("correct");
    input.classList.add("wrong");
    _els.feedback.textContent = "✗ The word was: " + _currentWord.word;
    _els.feedback.className = "typing-feedback feedback-wrong";

    updateHUD();

    setTimeout(function() {
      input.classList.remove("wrong");
      _els.feedback.textContent = "";
      pickWord();
      renderNextWord();
      _locked = false;
      _els.input.focus();
    }, 1500);
  }

  function renderNextWord() {
    var word = _currentWord;
    var wordEl = _container.querySelector("#typingWord");
    var hintEl = _container.querySelector("#typingHint");
    if (wordEl) wordEl.textContent = word.word;
    if (hintEl) hintEl.textContent = word.definition;
    var inp = _container.querySelector("#typingInput");
    if (inp) inp.value = "";

    // Speak the new word
    if (typeof VFAudio !== "undefined") VFAudio.speak(word.word);
  }

  function updateHUD() {
    var timerEl = _container.querySelector("#typingTimer");
    var streakNum = _container.querySelector("#streakNum");
    var streakFire = _container.querySelector("#streakFire");
    var correctEl = _container.querySelector("#correctCount");
    var wrongEl = _container.querySelector("#wrongCount");
    var xpEl = _container.querySelector("#xpCount");

    if (timerEl) timerEl.textContent = formatTime(_seconds);
    if (streakNum) streakNum.textContent = _streak;
    if (streakFire) {
      streakFire.textContent = getStreakIcon(_streak);
      var s = getStreakScale(_streak);
      streakFire.style.fontSize = (16 * s) + "px";
      streakFire.style.transform = "scale(" + s + ")";
    }
    if (correctEl) correctEl.textContent = _correctCount;
    if (wrongEl) wrongEl.textContent = _wrongCount;
    if (xpEl) xpEl.textContent = _xpEarned;
  }

  function onInputKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  function startTimer() {
    _timerInterval = setInterval(function() {
      _seconds--;
      var timerEl = _container && _container.querySelector("#typingTimer");
      if (timerEl) {
        timerEl.textContent = formatTime(_seconds);
        if (_seconds <= 10) timerEl.classList.add("timer-danger");
      }
      if (_seconds <= 0) {
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    clearInterval(_timerInterval);
    _timerInterval = null;
    _locked = true;
    if (_els.input) _els.input.disabled = true;
    renderResults();
  }

  // ─── Public API ───
  function init(container) {
    _container = container;
    _seconds = 60;
    _streak = 0;
    _bestStreak = 0;
    _correctCount = 0;
    _wrongCount = 0;
    _xpEarned = 0;
    _locked = false;
    _usedIndices = [];
    _currentWord = null;

    _progressState = Progress.load();

    renderGame();
    startTimer();
  }

  function destroy() {
    if (_timerInterval) {
      clearInterval(_timerInterval);
      _timerInterval = null;
    }
    if (_els.input) _els.input.removeEventListener("keydown", onInputKeydown);
    _container = null;
    _els = {};
    _currentWord = null;
    _locked = false;
  }

  // ─── Export ───
  window.TypingGame = {
    init: init,
    destroy: destroy
  };

})();
