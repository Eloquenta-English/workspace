/**
 * VocabForge — Word Search Game
 * Find hidden words in a letter grid by clicking first and last letters.
 *
 * Grid generation:
 *   1. Place each word in a random valid position/direction
 *   2. If collision, try different position (up to 100 attempts per word)
 *   3. Fill empty cells with random letters
 *
 * Exports window.WordSearchGame with init(container) and destroy().
 */

;(function() {
  "use strict";

  var GRID_SIZE = 10;
  var WORD_COUNT = 7; // 6-8 words
  var GAME_TIME = 180; // 3 minutes in seconds
  var XP_PER_WORD = 20;
  var XP_TIME_BONUS = 30;
  var MAX_PLACE_ATTEMPTS = 100;

  // Directions: [rowDelta, colDelta]
  var DIRECTIONS = [
    [0, 1],   // horizontal forward
    [1, 0],   // vertical down
    [1, 1]    // diagonal down-right
  ];

  // ─── State ───
  var _container = null;
  var _grid = [];           // 2D array of letters
  var _hiddenWords = [];    // [{ word, cells: [[r,c], ...], found: bool }]
  var _foundWords = [];     // words found so far
  var _selectedStart = null; // [r, c] or null
  var _selectedEnd = null;   // [r, c] or null
  var _timerInterval = null;
  var _timeLeft = GAME_TIME;
  var _xpEarned = 0;
  var _gameOver = false;
  var _isComplete = false;
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
    var d = document.createElement("div");
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m < 10 ? "" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  // ─── Pick themed words from vocabulary ───
  function pickWords() {
    var allWords = (typeof VOCAB_WORDS !== "undefined") ? VOCAB_WORDS : [];
    if (allWords.length === 0) {
      return [
        { word: "family", topic: "people" },
        { word: "water", topic: "food" },
        { word: "travel", topic: "travel" },
        { word: "happy", topic: "feelings" },
        { word: "school", topic: "education" },
        { word: "friend", topic: "people" },
        { word: "music", topic: "art" }
      ];
    }

    // Group by topic
    var topics = {};
    for (var i = 0; i < allWords.length; i++) {
      var t = allWords[i].topic || "misc";
      if (!topics[t]) topics[t] = [];
      topics[t].push(allWords[i]);
    }

    var topicKeys = Object.keys(topics);
    // Pick a random topic that has enough words, or just use all
    var useTopic = topicKeys.length > 0 ? topicKeys[Math.floor(Math.random() * topicKeys.length)] : null;
    var pool = useTopic && topics[useTopic].length >= 4 ? topics[useTopic] : allWords;

    // Filter words that fit in grid (max GRID_SIZE letters)
    var eligible = pool.filter(function(w) {
      return w.word && w.word.length <= GRID_SIZE && w.word.length >= 3;
    });
    if (eligible.length < WORD_COUNT) {
      eligible = allWords.filter(function(w) {
        return w.word && w.word.length <= GRID_SIZE && w.word.length >= 3;
      });
    }

    var shuffled = shuffle(eligible);
    var count = Math.min(WORD_COUNT, shuffled.length);
    var selected = shuffled.slice(0, count);

    return selected.map(function(w) {
      return { word: w.word.toUpperCase(), originalWord: w, topic: w.topic || "misc" };
    });
  }

  // ─── Grid Generation ───
  function createEmptyGrid() {
    var g = [];
    for (var r = 0; r < GRID_SIZE; r++) {
      g[r] = [];
      for (var c = 0; c < GRID_SIZE; c++) {
        g[r][c] = "";
      }
    }
    return g;
  }

  function canPlaceWord(grid, word, row, col, dir) {
    var dr = dir[0], dc = dir[1];
    for (var i = 0; i < word.length; i++) {
      var r = row + dr * i;
      var c = col + dc * i;
      if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
      if (grid[r][c] !== "" && grid[r][c] !== word[i]) return false;
    }
    return true;
  }

  function placeWord(grid, word, row, col, dir) {
    var dr = dir[0], dc = dir[1];
    var cells = [];
    for (var i = 0; i < word.length; i++) {
      var r = row + dr * i;
      var c = col + dc * i;
      grid[r][c] = word[i];
      cells.push([r, c]);
    }
    return cells;
  }

  function generateGrid(words) {
    var grid = createEmptyGrid();
    var placed = [];

    for (var w = 0; w < words.length; w++) {
      var word = words[w].word;
      var placedWord = false;

      for (var attempt = 0; attempt < MAX_PLACE_ATTEMPTS; attempt++) {
        var dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        var maxRow = GRID_SIZE - dir[0] * (word.length - 1) - 1;
        var maxCol = GRID_SIZE - dir[1] * (word.length - 1) - 1;
        if (maxRow < 0 || maxCol < 0) continue;

        var row = Math.floor(Math.random() * (maxRow + 1));
        var col = Math.floor(Math.random() * (maxCol + 1));

        if (canPlaceWord(grid, word, row, col, dir)) {
          var cells = placeWord(grid, word, row, col, dir);
          placed.push({ word: word, cells: cells, found: false });
          placedWord = true;
          break;
        }
      }

      // If we couldn't place it after all attempts, skip it
      if (!placedWord) {
        console.warn("WordSearch: Could not place word: " + word);
      }
    }

    // Fill empty cells with random letters
    for (var r = 0; r < GRID_SIZE; r++) {
      for (var c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] === "") {
          grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    return { grid: grid, placedWords: placed };
  }

  // ─── Check if selection matches a hidden word ───
  function getCellsBetween(start, end) {
    var r1 = start[0], c1 = start[1];
    var r2 = end[0], c2 = end[1];
    var dr = r2 - r1;
    var dc = c2 - c1;

    if (dr === 0 && dc === 0) return [[r1, c1]];

    // Determine step direction
    var stepR = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
    var stepC = dc === 0 ? 0 : (dc > 0 ? 1 : -1);

    // Validate it's a straight line in one of our allowed directions
    if (stepR !== 0 && stepC !== 0 && Math.abs(dr) !== Math.abs(dc)) return null; // not diagonal straight

    var cells = [];
    var steps = Math.max(Math.abs(dr), Math.abs(dc));
    for (var i = 0; i <= steps; i++) {
      cells.push([r1 + stepR * i, c1 + stepC * i]);
    }
    // Only allow forward directions: horizontal right, vertical down, diagonal down-right
    if (stepR < 0 || stepC < 0) return null;

    return cells;
  }

  function checkSelection(start, end) {
    var cells = getCellsBetween(start, end);
    if (!cells || cells.length < 2) return null; // Need at least 2 cells

    // Build string from grid
    var letters = "";
    for (var i = 0; i < cells.length; i++) {
      letters += _grid[cells[i][0]][cells[i][1]];
    }

    // Check against hidden words (must be forward direction only)
    for (var w = 0; w < _hiddenWords.length; w++) {
      var hw = _hiddenWords[w];
      if (hw.found) continue;

      // Compare cells directly
      if (hw.cells.length !== cells.length) continue;

      var match = true;
      for (var c = 0; c < cells.length; c++) {
        if (hw.cells[c][0] !== cells[c][0] || hw.cells[c][1] !== cells[c][1]) {
          match = false;
          break;
        }
      }

      if (match) {
        hw.found = true;
        return hw;
      }
    }

    return null; // wrong selection
  }

  // ─── Timer ───
  function startTimer() {
    stopTimer();
    _timerInterval = setInterval(function() {
      _timeLeft--;
      updateTimerDisplay();
      if (_timeLeft <= 0) {
        stopTimer();
        endGame();
      }
    }, 1000);
  }

  function stopTimer() {
    if (_timerInterval) {
      clearInterval(_timerInterval);
      _timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    var el = document.getElementById("wsTimer");
    if (el) {
      el.textContent = formatTime(_timeLeft);
      el.style.color = _timeLeft <= 30 ? "var(--danger)" : "var(--accent)";
    }
  }

  // ─── Render ───
  function renderGame() {
    if (!_container) return;

    var h = "";

    // Header with timer and progress
    h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">';
    h += '  <div style="display:flex;gap:16px;align-items:center;">';
    h += '    <div id="wsFoundCount" style="font-size:1.1rem;font-weight:700;">0/' + _hiddenWords.length + ' found</div>';
    h += '  </div>';
    h += '  <div id="wsTimer" style="font-size:1.25rem;font-weight:700;color:var(--accent);">' + formatTime(_timeLeft) + '</div>';
    h += '</div>';

    // Grid
    h += '<div id="wsGridContainer" style="display:flex;justify-content:center;margin-bottom:16px;">';
    h += '<div id="wsGrid" style="display:grid;grid-template-columns:repeat(' + GRID_SIZE + ',32px);grid-template-rows:repeat(' + GRID_SIZE + ',32px);gap:2px;user-select:none;-webkit-user-select:none;">';
    for (var r = 0; r < GRID_SIZE; r++) {
      for (var c = 0; c < GRID_SIZE; c++) {
        h += '<div class="ws-cell" data-row="' + r + '" data-col="' + c + '" id="wsCell_' + r + '_' + c + '" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--surface2);border-radius:4px;font-size:0.95rem;font-weight:700;cursor:pointer;transition:background 0.15s;">' + _grid[r][c] + '</div>';
      }
    }
    h += '</div></div>';

    // Found words list
    h += '<div id="wsWordList" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:32px;margin-bottom:12px;">';
    h += '</div>';

    // XP display
    h += '<div style="text-align:center;">';
    h += '  <span style="font-size:0.8rem;color:var(--text-muted);">XP: </span>';
    h += '  <span id="wsXP" style="font-size:1rem;font-weight:700;color:var(--accent);">+' + _xpEarned + '</span>';
    h += '</div>';

    _container.innerHTML = h;
    bindGridEvents();
    updateWordList();
  }

  function updateWordList() {
    var el = document.getElementById("wsWordList");
    if (!el) return;

    var h = "";
    for (var w = 0; w < _hiddenWords.length; w++) {
      var hw = _hiddenWords[w];
      var style = hw.found
        ? 'background:var(--success);color:var(--bg);font-weight:700;'
        : 'background:var(--surface);color:var(--text-muted);';
      style += 'padding:4px 12px;border-radius:99px;font-size:0.85rem;';
      h += '<span style="' + style + '">' + esc(hw.word) + '</span>';
    }
    el.innerHTML = h;

    var countEl = document.getElementById("wsFoundCount");
    if (countEl) countEl.textContent = _foundWords.length + '/' + _hiddenWords.length + ' found';
  }

  // ─── Event Handlers ───
  function bindGridEvents() {
    var grid = document.getElementById("wsGrid");
    if (!grid) return;

    // Mouse events
    grid.addEventListener("click", handleGridClick);

    // Touch events
    grid.addEventListener("touchstart", handleTouchStart, { passive: false });
    grid.addEventListener("touchend", handleTouchEnd, { passive: false });
  }

  function handleGridClick(e) {
    if (_gameOver) return;
    var cell = e.target.closest(".ws-cell");
    if (!cell) return;

    var row = parseInt(cell.getAttribute("data-row"), 10);
    var col = parseInt(cell.getAttribute("data-col"), 10);
    if (isNaN(row) || isNaN(col)) return;

    processCellSelection(row, col);
  }

  var _touchStartCell = null;

  function handleTouchStart(e) {
    if (_gameOver) return;
    e.preventDefault();
    var cell = e.target.closest(".ws-cell");
    if (!cell) return;
    var row = parseInt(cell.getAttribute("data-row"), 10);
    var col = parseInt(cell.getAttribute("data-col"), 10);
    if (isNaN(row) || isNaN(col)) return;
    _touchStartCell = [row, col];
  }

  function handleTouchEnd(e) {
    if (_gameOver) return;
    e.preventDefault();
    var touch = e.changedTouches[0];
    if (!touch) return;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!target) return;
    var cell = target.closest(".ws-cell");
    if (!cell || !_touchStartCell) return;

    var row = parseInt(cell.getAttribute("data-row"), 10);
    var col = parseInt(cell.getAttribute("data-col"), 10);
    if (isNaN(row) || isNaN(col)) return;

    processCellSelection(_touchStartCell[0], _touchStartCell[1], [row, col]);
    _touchStartCell = null;
  }

  function processCellSelection(r1, c1, endOverride) {
    clearSelectionHighlight();

    if (endOverride) {
      // Touch: start and end provided together
      var result = checkSelection([r1, c1], endOverride);
      if (result) {
        markCellsFound(result.cells);
        _foundWords.push(result);
        _xpEarned += XP_PER_WORD;
        updateWordList();
        updateXPDisplay();

        if (_foundWords.length >= _hiddenWords.length) {
          _isComplete = true;
          endGame();
        }
      } else {
        flashSelectionRed([r1, c1], endOverride);
      }
    } else {
      // Click: first click sets start, second click sets end
      if (!_selectedStart) {
        _selectedStart = [r1, c1];
        highlightCell(r1, c1, "var(--accent)");
      } else {
        if (_selectedStart[0] === r1 && _selectedStart[1] === c1) {
          // Clicked same cell, deselect
          _selectedStart = null;
          return;
        }
        var result2 = checkSelection(_selectedStart, [r1, c1]);
        if (result2) {
          markCellsFound(result2.cells);
          _foundWords.push(result2);
          _xpEarned += XP_PER_WORD;
          _selectedStart = null;
          updateWordList();
          updateXPDisplay();

          if (_foundWords.length >= _hiddenWords.length) {
            _isComplete = true;
            endGame();
          }
        } else {
          flashSelectionRed(_selectedStart, [r1, c1]);
          _selectedStart = null;
        }
      }
    }
  }

  // ─── Visual helpers ───
  function highlightCell(r, c, color) {
    var cell = document.getElementById("wsCell_" + r + "_" + c);
    if (cell) cell.style.background = color;
  }

  function clearSelectionHighlight() {
    for (var r = 0; r < GRID_SIZE; r++) {
      for (var c = 0; c < GRID_SIZE; c++) {
        var cell = document.getElementById("wsCell_" + r + "_" + c);
        if (cell) cell.style.background = "var(--surface2)";
      }
    }
    // Re-highlight found cells
    for (var w = 0; w < _hiddenWords.length; w++) {
      if (_hiddenWords[w].found) {
        markCellsFound(_hiddenWords[w].cells);
      }
    }
  }

  function markCellsFound(cells) {
    for (var i = 0; i < cells.length; i++) {
      var cell = document.getElementById("wsCell_" + cells[i][0] + "_" + cells[i][1]);
      if (cell) cell.style.background = "var(--success)";
    }
  }

  function flashSelectionRed(start, end) {
    var cells = getCellsBetween(start, end);
    if (!cells) {
      if (start) highlightCell(start[0], start[1], "var(--danger)");
      if (end) highlightCell(end[0], end[1], "var(--danger)");
      setTimeout(clearSelectionHighlight, 400);
      return;
    }

    for (var i = 0; i < cells.length; i++) {
      highlightCell(cells[i][0], cells[i][1], "var(--danger)");
    }
    setTimeout(clearSelectionHighlight, 400);
  }

  function updateXPDisplay() {
    var el = document.getElementById("wsXP");
    if (el) el.textContent = "+" + _xpEarned;
  }

  function updateTimerDisplay() {
    var el = document.getElementById("wsTimer");
    if (el) {
      el.textContent = formatTime(_timeLeft);
      el.style.color = _timeLeft <= 30 ? "var(--danger)" : "var(--accent)";
    }
  }

  // ─── End Game ───
  function endGame() {
    _gameOver = true;
    stopTimer();

    var totalXP = _xpEarned;
    if (_isComplete && _timeLeft > 0) {
      totalXP += XP_TIME_BONUS;
    }

    // Award XP
    if (totalXP > 0 && typeof VF !== "undefined" && VF.addXP) {
      VF.addXP(totalXP);
    }

    // Record progress
    if (_progressState) {
      for (var w = 0; w < _foundWords.length; w++) {
        var wordObj = _foundWords[w].originalWord;
        if (wordObj && wordObj.id) {
          Progress.recordAnswer(_progressState, true, wordObj.id);
        }
      }
    }

    renderResults(totalXP);
  }

  // ─── Render Results ───
  function renderResults(totalXP) {
    if (!_container) return;

    var h = "";

    // Results card
    h += '<div style="text-align:center;padding:24px 16px;max-width:400px;margin:0 auto;">';
    h += '  <div style="font-size:3rem;margin-bottom:12px;">' + (_isComplete ? "🏆" : "⏰") + '</div>';
    h += '  <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:4px;">' + (_isComplete ? "Word Search Complete!" : "Time's Up!") + '</h2>';
    h += '  <p style="color:var(--text-muted);margin-bottom:24px;">' + _foundWords.length + ' / ' + _hiddenWords.length + ' words found</p>';

    // Stats grid
    h += '  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px;">';
    h += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    h += '      <div style="font-size:1.5rem;font-weight:700;color:var(--accent);">' + _foundWords.length + '</div>';
    h += '      <div style="font-size:0.75rem;color:var(--text-muted);">Words Found</div>';
    h += '    </div>';
    h += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    h += '      <div style="font-size:1.5rem;font-weight:700;color:var(--warning);">' + formatTime(GAME_TIME - _timeLeft) + '</div>';
    h += '      <div style="font-size:0.75rem;color:var(--text-muted);">Time</div>';
    h += '    </div>';
    h += '    <div style="background:var(--surface);border-radius:var(--radius);padding:16px;">';
    h += '      <div style="font-size:1.5rem;font-weight:700;color:var(--success);">+' + totalXP + '</div>';
    h += '      <div style="font-size:0.75rem;color:var(--text-muted);">XP Earned</div>';
    h += '    </div>';
    h += '  </div>';

    // Time bonus message
    if (_isComplete && _timeLeft > 0) {
      h += '  <div style="background:rgba(52,211,153,0.1);border:1px solid var(--success);border-radius:var(--radius);padding:12px;margin-bottom:24px;">';
      h += '    <div style="font-weight:700;color:var(--success);">⏱ Speed Bonus! +' + XP_TIME_BONUS + ' XP</div>';
      h += '    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Found all words with ' + formatTime(_timeLeft) + ' remaining</div>';
      h += '  </div>';
    }

    // Words found list
    h += '  <div style="margin-bottom:24px;">';
    h += '    <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Words</div>';
    h += '    <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">';
    for (var w = 0; w < _hiddenWords.length; w++) {
      var hw = _hiddenWords[w];
      var style = hw.found
        ? 'background:var(--success);color:var(--bg);'
        : 'background:var(--surface);color:var(--text-muted);opacity:0.5;';
      style += 'padding:4px 12px;border-radius:99px;font-size:0.85rem;font-weight:600;';
      h += '<span style="' + style + '">' + esc(hw.word) + '</span>';
    }
    h += '    </div>';
    h += '  </div>';

    // Action buttons
    h += '  <div style="display:flex;gap:12px;justify-content:center;">';
    h += '    <button class="btn btn-primary" id="wsReplay">🔄 Play Again</button>';
    h += '    <button class="btn btn-secondary" id="wsBackGames">Back to Games</button>';
    h += '  </div>';
    h += '</div>';

    _container.innerHTML = h;

    var btnReplay = document.getElementById("wsReplay");
    var btnBack = document.getElementById("wsBackGames");
    if (btnReplay) btnReplay.addEventListener("click", startGame);
    if (btnBack) btnBack.addEventListener("click", function() {
      if (typeof VF !== "undefined") VF.showScreen("games-menu");
    });
  }

  // ─── Start Game ───
  function startGame() {
    var selectedWords = pickWords();
    var result = generateGrid(selectedWords);

    _grid = result.grid;
    _hiddenWords = result.placedWords;
    _foundWords = [];
    _selectedStart = null;
    _selectedEnd = null;
    _timeLeft = GAME_TIME;
    _xpEarned = 0;
    _gameOver = false;
    _isComplete = false;
    _progressState = (typeof Progress !== "undefined") ? Progress.load() : null;
    _touchStartCell = null;

    _container.innerHTML = "";
    renderGame();
    startTimer();
  }

  // ─── Public API ───
  var WordSearchGame = {
    init: function(container) {
      _container = container || null;
      if (!_container) {
        console.warn("WordSearchGame: no container provided");
        return;
      }
      startGame();
    },

    destroy: function() {
      stopTimer();
      if (_container) _container.innerHTML = "";
      _container = null;
      _grid = [];
      _hiddenWords = [];
      _foundWords = [];
      _selectedStart = null;
      _selectedEnd = null;
      _timeLeft = GAME_TIME;
      _xpEarned = 0;
      _gameOver = false;
      _isComplete = false;
      _progressState = null;
      _touchStartCell = null;
    }
  };

  if (typeof window !== "undefined") window.WordSearchGame = WordSearchGame;
  if (typeof module !== "undefined" && module.exports) module.exports = { WordSearchGame: WordSearchGame };

})();
