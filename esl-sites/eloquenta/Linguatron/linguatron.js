// Linguatron Translation Tool — Multi-API with Cross-Check
// Uses: MyMemory (primary) → LibreTranslate → Lingva as fallbacks
// Cross-checks results and lets users cycle through alternatives.

(function() {
  'use strict';

  var translateTimeout = null;
  var isTranslating = false;

  // ═══ API ENDPOINTS ═══
  var API_MYMEMORY = 'https://api.mymemory.translated.net/get';
  var API_LIBRE   = 'https://libretranslate.de/translate';
  var API_LIBRE2  = 'https://translate.argosopentech.com/translate';  // Community instance
  var API_LINGVA  = 'https://lingva.ml/api/v1';

  // ═══ TRANSLATION WITH MULTI-API CROSS-CHECK ═══
  window.translateText = function() {
    var text = document.getElementById('sourceText').value.trim();
    if (!text || isTranslating) return;

    var source = document.getElementById('sourceLang').value;
    var target = document.getElementById('targetLang').value;

    if (source === target) {
      showError('Source and target languages must be different.');
      return;
    }

    isTranslating = true;
    var btn = document.getElementById('translateBtn');
    btn.disabled = true;
    btn.textContent = 'Translating...';

    var output = document.getElementById('targetOutput');
    output.innerHTML = '<div class="loading"><div class="loading-spinner"></div> Translating across multiple services...</div>';
    hideQualityIndicator();

    var results = [];
    var completed = 0;
    var totalApis = 3;

    function checkComplete() {
      completed++;
      if (completed >= totalApis) {
        displayResults(results, text, source, target);
        isTranslating = false;
        btn.disabled = false;
        btn.textContent = 'Translate';
      }
    }

    // API 1: MyMemory
    fetch(API_MYMEMORY + '?q=' + encodeURIComponent(text) + '&langpair=' + source + '|' + target)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
          results.push({text: data.responseData.translatedText, source: 'MyMemory', match: data.responseData.match || 0});
        }
        checkComplete();
      })
      .catch(function() { checkComplete(); });

    // API 2: LibreTranslate
    fetch(API_LIBRE, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({q: text, source: source, target: target, format: 'text'})
    })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.translatedText) {
          results.push({text: data.translatedText, source: 'LibreTranslate', match: -1});
        }
        checkComplete();
      })
      .catch(function() {
        // Fallback to secondary LibreTranslate
        fetch(API_LIBRE2, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({q: text, source: source, target: target, format: 'text'})
        })
          .then(function(r) { return r.json(); })
          .then(function(data2) {
            if (data2.translatedText) {
              results.push({text: data2.translatedText, source: 'LibreTranslate', match: -1});
            }
            checkComplete();
          })
          .catch(function() { checkComplete(); });
      });

    // API 3: Lingva (Google Translate proxy)
    fetch(API_LINGVA + '/' + source + '/' + target + '/' + encodeURIComponent(text))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.translation) {
          results.push({text: data.translation, source: 'Lingva', match: -1});
        }
        checkComplete();
      })
      .catch(function() { checkComplete(); });
  };

  // ═══ DISPLAY RESULTS WITH CYCLE ═══
  function displayResults(results, originalText, source, target) {
    var output = document.getElementById('targetOutput');

    if (results.length === 0) {
      output.innerHTML = '<span class="placeholder">All translation services failed. Please try again in a moment.</span>';
      return;
    }

    // Deduplicate near-identical translations
    var unique = [];
    results.forEach(function(r) {
      var isDup = unique.some(function(u) {
        return stringSimilarity(u.text.toLowerCase(), r.text.toLowerCase()) > 0.85;
      });
      if (!isDup) unique.push(r);
    });
    if (unique.length === 0) unique = results;

    var currentIdx = 0;

    window.__allTranslations = unique;
    window.__currentTranslation = unique[0].text;

    renderTranslation(currentIdx);

    function renderTranslation(idx) {
      var t = unique[idx];
      window.__currentTranslation = t.text;

      var matchInfo = t.match >= 0 ? ' <span class="match-score" style="color:' + (t.match >= 0.7 ? 'var(--green)' : 'var(--amber)') + '">' + Math.round(t.match * 100) + '%</span>' : '';

      var html = '<div class="translation-result">' +
        '<div class="translation-header">' +
          '<span class="translation-source">' + t.source + '</span>' + matchInfo +
        '</div>' +
        '<div class="translation-text" id="currentTranslation">' + escapeHtml(t.text) + '</div>' +
        '<div class="translation-actions">' +
          '<button class="btn btn-icon btn-sm" onclick="copyTranslation()" title="Copy">📋</button>' +
          '<button class="btn btn-icon btn-sm" onclick="speakTranslation()" title="Listen">🔊</button>' +
        '</div>';

      if (unique.length > 1) {
        html += '<div class="alt-translations">' +
          '<div class="alt-header">Alternative translations (' + unique.length + ' sources):</div>';
        unique.forEach(function(u, i) {
          var cls = i === idx ? 'alt-trans active' : 'alt-trans';
          var label = u.source + (u.match >= 0 ? ' (' + Math.round(u.match * 100) + '%)' : '');
          html += '<div class="' + cls + '" onclick="window.__cycleTo(' + i + ')">' +
            '<span class="alt-label">' + label + '</span>' +
            '<span class="alt-text">' + escapeHtml(u.text) + '</span>' +
          '</div>';
        });
        html += '<div class="cycle-hint">Click any alternative to use it as the primary translation</div>';
        html += '</div>';
      }

      html += '</div>';
      output.innerHTML = html;
      document.getElementById('targetCharCount').textContent = t.text.length + ' chars';
    }

    // Global cycle function
    window.__cycleTo = function(idx) {
      currentIdx = idx;
      renderTranslation(idx);
    };

    // Show quality indicator if multiple APIs agreed
    if (unique.length >= 2) {
      showQualityIndicator(unique, originalText);
    }
  }

  // ═══ QUALITY INDICATOR ═══
  function showQualityIndicator(translations, original) {
    var existing = document.querySelector('.quality-indicator');
    if (existing) existing.remove();

    // Calculate pairwise agreement
    var totalSim = 0, pairs = 0;
    for (var i = 0; i < translations.length; i++) {
      for (var j = i + 1; j < translations.length; j++) {
        totalSim += stringSimilarity(translations[i].text.toLowerCase(), translations[j].text.toLowerCase());
        pairs++;
      }
    }
    var avgAgreement = pairs > 0 ? totalSim / pairs : 0;

    var div = document.createElement('div');
    div.className = 'quality-indicator animate-in';

    var grade = avgAgreement >= 0.7 ? 'high' : avgAgreement >= 0.4 ? 'medium' : 'low';
    var colors = {high: 'var(--green)', medium: 'var(--amber)', low: 'var(--rose)'};
    var labels = {high: 'High confidence — APIs agree', medium: 'Moderate — some variation', low: 'Low confidence — APIs disagree'};

    var checksHtml = '';
    translations.forEach(function(t) {
      checksHtml += '<div class="quality-check">' +
        '<span class="quality-check-icon" style="color:var(--green)">✓</span>' +
        '<div class="quality-check-text">' +
        '<div class="quality-check-label">' + t.source + '</div>' +
        '<div class="quality-check-detail">' + escapeHtml(t.text.substring(0, 120)) + '</div>' +
        '</div></div>';
    });

    div.innerHTML =
      '<div class="quality-header">' +
        '<div class="quality-score" style="color:' + colors[grade] + '">' +
          '<span class="quality-score-num">' + Math.round(avgAgreement * 100) + '</span>' +
          '<span class="quality-score-max">% agreement</span>' +
        '</div>' +
        '<div class="quality-label" style="color:' + colors[grade] + '">' + labels[grade] + '</div>' +
        '<button class="btn btn-sm quality-toggle" onclick="this.parentElement.parentElement.classList.toggle(\'expanded\')">Details ▼</button>' +
      '</div>' +
      '<div class="quality-details">' + checksHtml + '</div>';

    var panels = document.querySelector('.panels');
    panels.parentNode.insertBefore(div, panels.nextSibling);
  }

  function hideQualityIndicator() {
    var existing = document.querySelector('.quality-indicator');
    if (existing) existing.remove();
  }

  // ═══ STRING SIMILARITY ═══
  function stringSimilarity(a, b) {
    if (a === b) return 1;
    if (a.length === 0 || b.length === 0) return 0;
    var wordsA = a.split(/\s+/).filter(function(w) { return w.length > 2; });
    var wordsB = b.split(/\s+/).filter(function(w) { return w.length > 2; });
    if (wordsA.length === 0 || wordsB.length === 0) return 0;
    var matches = 0;
    wordsA.forEach(function(wa) {
      wordsB.forEach(function(wb) {
        if (wa === wb || (wa.length > 3 && wb.length > 3 && (wa.indexOf(wb) >= 0 || wb.indexOf(wa) >= 0))) {
          matches++;
        }
      });
    });
    return (2 * matches) / (wordsA.length + wordsB.length);
  }

  // ═══ AUTO-TRANSLATE (debounced) ═══
  window.handleInput = function() {
    var text = document.getElementById('sourceText').value;
    document.getElementById('charCount').textContent = text.length;
    clearTimeout(translateTimeout);
    if (text.trim().length > 2) {
      translateTimeout = setTimeout(window.translateText, 800);
    }
  };

  // ═══ LANGUAGE HANDLING ═══
  window.handleLangChange = function() {
    var source = document.getElementById('sourceLang');
    var target = document.getElementById('targetLang');
    document.getElementById('sourceLangLabel').textContent = source.options[source.selectedIndex].text;
    document.getElementById('targetLangLabel').textContent = target.options[target.selectedIndex].text;
    if (document.getElementById('sourceText').value.trim()) {
      window.translateText();
    }
  };

  window.swapLanguages = function() {
    var source = document.getElementById('sourceLang');
    var target = document.getElementById('targetLang');
    var temp = source.value;
    source.value = target.value;
    target.value = temp;
    window.handleLangChange();

    var sourceText = document.getElementById('sourceText');
    var targetOutput = document.getElementById('targetOutput');
    var current = targetOutput.querySelector('.translation-text');
    if (current) {
      var oldSource = sourceText.value;
      sourceText.value = current.textContent;
      targetOutput.innerHTML = '<span class="translation-text">' + escapeHtml(oldSource) + '</span>';
      document.getElementById('charCount').textContent = sourceText.value.length;
    }
    hideQualityIndicator();
  };

  // ═══ UTILITY ═══
  window.clearSource = function() {
    document.getElementById('sourceText').value = '';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('targetOutput').innerHTML = '<span class="placeholder">Translation will appear here...</span>';
    document.getElementById('targetCharCount').textContent = '';
    hideQualityIndicator();
  };

  window.copyTranslation = function() {
    var text = window.__currentTranslation;
    if (text) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('Copied to clipboard');
      });
    }
  };

  window.pasteFromClipboard = function() {
    navigator.clipboard.readText().then(function(text) {
      document.getElementById('sourceText').value = text;
      document.getElementById('charCount').textContent = text.length;
      window.translateText();
    }).catch(function() {
      showToast('Clipboard access denied');
    });
  };

  window.speakTranslation = function() {
    var text = window.__currentTranslation;
    if (text && 'speechSynthesis' in window) {
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = document.getElementById('targetLang').value;
      speechSynthesis.speak(utterance);
    }
  };

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showError(msg) {
    var existing = document.querySelector('.error-msg');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.className = 'error-msg animate-in';
    div.textContent = msg;
    document.querySelector('.translate-area').insertBefore(div, document.querySelector('.panels'));
    setTimeout(function() { div.remove(); }, 5000);
  }

  window.showToast = function(msg) {
    var existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.className = 'toast-msg';
    div.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--bg-card);border:1px solid var(--accent);color:var(--text);padding:10px 20px;border-radius:8px;font-size:.8rem;font-weight:600;z-index:9999;white-space:nowrap;animation:slideUp .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.4);';
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(function() { div.style.opacity = '0'; div.style.transition = 'opacity .3s'; setTimeout(function() { div.remove(); }, 300); }, 2000);
  };

  window.showSection = function(section) {
    document.querySelectorAll('.topbar-nav a').forEach(function(a) { a.classList.remove('active'); });
    event.target.classList.add('active');
    showToast(section.charAt(0).toUpperCase() + section.slice(1) + ' — coming soon');
  };

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      window.translateText();
    }
  });

})();
