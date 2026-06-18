/**
 * VocabForge — Grammar Drill Game
 * Present grammar exercises, check answers, teach from mistakes.
 */
(function(){
  'use strict';

  var E = [];
  var _idx = 0, _round = [], _correct = 0, _total = 0, _xp = 0, _container = null;

  function add(ex){ E.push(ex); }

  // ═══ QUESTION GENERATION ═══
  function buildRound(level, count){
    var pool = E.filter(function(e){ return matchesLevel(e.level, level); });
    if(pool.length < count) pool = E.slice();
    shuffle(pool);
    return pool.slice(0, count || 10);
  }

  function matchesLevel(exLevel, userLevel){
    var order = ['A1','A2','B1','B2','C1'];
    var ui = order.indexOf(userLevel), ei = order.indexOf(exLevel);
    return ei >= 0 && ui >= 0 && ei <= ui + 1;
  }

  function shuffle(arr){
    for(var i = arr.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  // ═══ RENDERING ═══
  function render(){
    if(!_container) return;
    if(_idx >= _round.length){ renderResults(); return; }
    var q = _round[_idx];
    var html = '<div class="grammar-drill">' +
      '<div class="gd-progress">Question ' + (_idx+1) + ' / ' + _round.length + '</div>' +
      '<div class="gd-topic">' + formatTopic(q.topic) + ' <span class="gd-level">' + q.level + '</span></div>' +
      '<div class="gd-sentence">' + escHtml(q.sentence) + '</div>';
    if(q.type === 'multiple-choice' && q.options && q.options.length){
      html += '<div class="gd-options">';
      var opts = q.options.slice(); shuffle(opts);
      opts.forEach(function(opt, i){
        html += '<button class="gd-opt" data-idx="' + i + '" data-val="' + escAttr(opt) + '">' + escHtml(opt) + '</button>';
      });
      html += '</div>';
    } else {
      html += '<input type="text" class="gd-input" placeholder="Type your answer..." autocomplete="off" autocapitalize="none" spellcheck="false">' +
        '<button class="gd-submit">Check →</button>';
    }
    html += '<div class="gd-result" id="gd-result" style="display:none"></div>' +
      '</div>';
    _container.innerHTML = html;
    bindQuestion();
  }

  function bindQuestion(){
    var input = _container.querySelector('.gd-input');
    var submit = _container.querySelector('.gd-submit');
    if(input){
      input.focus();
      input.addEventListener('keydown', function(e){
        if(e.key === 'Enter') checkFillBlank();
      });
      submit.addEventListener('click', checkFillBlank);
    }
    var opts = _container.querySelectorAll('.gd-opt');
    opts.forEach(function(btn){
      btn.addEventListener('click', function(){
        var val = btn.dataset.val;
        checkAnswer(val, btn);
      });
    });
  }

  function checkFillBlank(){
    var input = _container.querySelector('.gd-input');
    if(!input) return;
    var val = input.value.trim();
    if(!val) return;
    checkAnswer(val, null);
  }

  function checkAnswer(val, btnEl){
    var q = _round[_idx];
    var correct = normalize(val) === normalize(q.answer);
    var resultEl = document.getElementById('gd-result');
    _total++;
    if(correct){
      _correct++;
      _xp += 15;
      VF.addXP && VF.addXP(15);
      Progress && Progress.recordAnswer && Progress.recordAnswer(true, q.id);
      resultEl.innerHTML = '<div class="gd-correct">✓ Correct!</div>' +
        (q.explanation ? '<div class="gd-explain">' + escHtml(q.explanation) + '</div>' : '');
      if(btnEl) btnEl.classList.add('correct');
    } else {
      VF.loseHeart && VF.loseHeart();
      Progress && Progress.recordAnswer && Progress.recordAnswer(false, q.id);
      resultEl.innerHTML = '<div class="gd-wrong">✗ Not quite.</div>' +
        '<div class="gd-answer">Answer: <strong>' + escHtml(q.answer) + '</strong></div>' +
        '<div class="gd-explain">' + escHtml(q.explanation || '') + '</div>';
      if(btnEl) btnEl.classList.add('wrong');
      // Highlight correct option
      var opts = _container.querySelectorAll('.gd-opt');
      opts.forEach(function(b){
        if(normalize(b.dataset.val) === normalize(q.answer)) b.classList.add('correct');
      });
    }
    resultEl.style.display = 'block';
    // Disable further input
    var input = _container.querySelector('.gd-input');
    if(input) input.disabled = true;
    var submit = _container.querySelector('.gd-submit');
    if(submit) submit.disabled = true;
    var allOpts = _container.querySelectorAll('.gd-opt');
    allOpts.forEach(function(b){ b.style.pointerEvents = 'none'; });

    // Next button
    var nextBtn = document.createElement('button');
    nextBtn.className = 'gd-next';
    nextBtn.textContent = (_idx < _round.length - 1) ? 'Next →' : 'See Results →';
    nextBtn.addEventListener('click', function(){
      _idx++;
      render();
    });
    _container.appendChild(nextBtn);
  }

  function renderResults(){
    var pct = _total > 0 ? Math.round(_correct / _total * 100) : 0;
    var stars = pct >= 90 ? '★★★' : pct >= 60 ? '★★☆' : pct >= 30 ? '★☆☆' : '☆☆☆';
    _container.innerHTML = '<div class="gd-results">' +
      '<div class="gd-stars">' + stars + '</div>' +
      '<div class="gd-score">' + _correct + ' / ' + _total + ' correct (' + pct + '%)</div>' +
      '<div class="gd-xp">+' + _xp + ' XP earned</div>' +
      '<div class="gd-buttons">' +
        '<button class="gd-replay" onclick="GrammarDrill.init(document.querySelector(\'.screen-content\'))">Try Again</button>' +
        '<button class="gd-back" onclick="showScreen(\'grammar\')">Back to Grammar</button>' +
      '</div></div>';
  }

  // ═══ HELPERS ═══
  function formatTopic(t){
    return t.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
  }
  function normalize(s){
    return (s||'').trim().toLowerCase().replace(/[.,!?;:]/g,'');
  }
  function escHtml(s){
    var d = document.createElement('div'); d.textContent = s; return d.innerHTML;
  }
  function escAttr(s){
    return s.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ═══ PUBLIC API ═══
  function init(container){
    _container = container;
    if(!_container) return;
    _idx = 0; _correct = 0; _total = 0; _xp = 0;
    _round = buildRound(VF.user ? VF.user.level : 'A1', 10);
    render();
  }
  function destroy(){
    _container = null; _round = []; _idx = 0;
  }

  window.GrammarDrill = { init: init, destroy: destroy };
})();
