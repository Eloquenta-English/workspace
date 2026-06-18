// Lingui Translation Tool — Robust multi-API with back-translation verification
(function() {
  'use strict';

  var translateTimeout = null;
  var isTranslating = false;
  var lastTranslation = null;

  // Free API endpoints. These rotate; some may fail due to rate limits or CORS.
  var APIS = [
    {
      name: 'LibreTranslate',
      url: 'https://libretranslate.de/translate',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: function(q, s, t) { return JSON.stringify({q: q, source: s, target: t, format: 'text'}); },
      extract: function(d) { return d && d.translatedText; }
    },
    {
      name: 'LibreMirror',
      url: 'https://translate.argosopentech.com/translate',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: function(q, s, t) { return JSON.stringify({q: q, source: s, target: t, format: 'text'}); },
      extract: function(d) { return d && d.translatedText; }
    },
    {
      name: 'Lingva',
      url: function(s, t, q) { return 'https://lingva.ml/api/v1/' + s + '/' + t + '/' + encodeURIComponent(q); },
      method: 'GET',
      headers: {},
      extract: function(d) { return d && d.translation; }
    },
    {
      name: 'MyMemory',
      url: function(s, t, q) { return 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(q) + '&langpair=' + s + '|' + t; },
      method: 'GET',
      headers: {},
      extract: function(d) { return d && d.responseStatus === 200 && d.responseData && d.responseData.translatedText; }
    }
  ];

  // Common English↔target glossary for sanity checks (loaded as minimal built-in verification DB)
  var SANITY = {
    hello: {es:'hola', fr:'bonjour', de:'hallo', it:'ciao', pt:'olá'},
    thank: {es:'gracias', fr:'merci', de:'danke', it:'grazie', pt:'obrigado'},
    good: {es:'bueno', fr:'bon', de:'gut', it:'buono', pt:'bom'},
    yes: {es:'sí', fr:'oui', de:'ja', it:'sì', pt:'sim'},
    no: {es:'no', fr:'non', de:'nein', it:'no', pt:'não'}
  };

  function apiRequest(cfg, q, s, t) {
    var url = typeof cfg.url === 'function' ? cfg.url(s, t, q) : cfg.url;
    var init = {method: cfg.method, headers: cfg.headers, mode: 'cors'};
    if (cfg.method === 'POST') init.body = cfg.body(q, s, t);
    return fetch(url, init)
      .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function(d) {
        var text = cfg.extract(d);
        if (!text || typeof text !== 'string') throw new Error('no translation');
        return {source: cfg.name, text: text.trim()};
      });
  }

  function raceWithFallback(q, s, t) {
    var errors = [];
    // Try all APIs with individual timeouts; return first success.
    var promises = APIS.map(function(cfg) {
      return new Promise(function(resolve, reject) {
        var timer = setTimeout(function() { reject(new Error('timeout')); }, 6000);
        apiRequest(cfg, q, s, t)
          .then(function(res) { clearTimeout(timer); resolve(res); })
          .catch(function(err) { clearTimeout(timer); reject(err); });
      });
    });
    return Promise.allSettled(promises).then(function(results) {
      var success = results.filter(function(r) { return r.status === 'fulfilled'; }).map(function(r) { return r.value; });
      var failures = results.filter(function(r) { return r.status === 'rejected'; });
      if (success.length) return success;
      var msg = failures.map(function(r) { return r.reason && r.reason.message; }).filter(Boolean).join('; ');
      var offline = offlineTranslate(text, source, target);
      if (offline) return [offline];
      throw new Error('All translation services failed: ' + (msg || 'unknown'));
    });
  }

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
    output.innerHTML = '<div class="loading"><div class="loading-spinner"></div>Contacting translation services...</div>';
    hideQualityIndicator();

    raceWithFallback(text, source, target)
      .then(function(results) { displayResults(results, text, source, target); })
      .catch(function(err) {
        output.innerHTML = '<span class="placeholder">Translation failed. ' + escapeHtml(err.message) + '.</span>';
        showError('Translation failed: ' + err.message);
      })
      .finally(function() {
        isTranslating = false;
        btn.disabled = false;
        btn.textContent = 'Translate';
      });
  };

  function displayResults(results, originalText, source, target) {
    var output = document.getElementById('targetOutput');
    // deduplicate by lowercase similarity
    var unique = [];
    results.forEach(function(r) {
      var dup = unique.some(function(u) { return stringSimilarity(u.text, r.text) > 0.85; });
      if (!dup) unique.push(r);
    });
    window.__allTranslations = unique;
    window.__currentTranslation = unique[0].text;
    lastTranslation = {original: originalText, forward: unique[0].text, source: source, target: target};

    var html = '<div class="translation-result">' +
      '<div class="translation-header"><span class="translation-source">' + unique[0].source + '</span></div>' +
      '<div class="translation-text" id="currentTranslation">' + escapeHtml(unique[0].text) + '</div>' +
      '<div class="translation-actions">' +
        '<button class="btn btn-icon btn-sm" onclick="copyTranslation()" title="Copy">📋</button>' +
        '<button class="btn btn-icon btn-sm" onclick="speakTranslation()" title="Listen">🔊</button>' +
        '<button class="btn btn-icon btn-sm" onclick="verifyTranslation()" title="Verify back-translation">🔄</button>' +
      '</div>';

    if (unique.length > 1) {
      html += '<div class="alt-translations">' +
        '<div class="alt-header">Alternatives (' + unique.length + ' sources)</div>';
      unique.forEach(function(u, i) {
        html += '<div class="alt-trans ' + (i === 0 ? 'active' : '') + '" onclick="window.__cycleTo(' + i + ')" data-idx="' + i + '">' +
          '<span class="alt-label">' + u.source + '</span>' +
          '<span class="alt-text">' + escapeHtml(u.text) + '</span>' +
        '</div>';
      });
      html += '<div class="cycle-hint">Click any alternative to select it</div></div>';
    }
    html += '</div>';
    output.innerHTML = html;
    document.getElementById('targetCharCount').textContent = unique[0].text.length + ' chars';

    if (unique.length >= 2 || originalText.split(/\s+/).length <= 5) {
      runSanityCheck(unique, originalText, source, target);
      if (unique.length >= 2) showQualityIndicator(unique, originalText);
    }
  }

  window.__cycleTo = function(idx) {
    var t = window.__allTranslations[idx];
    if (!t) return;
    window.__currentTranslation = t.text;
    document.getElementById('currentTranslation').textContent = t.text;
    document.getElementById('targetCharCount').textContent = t.text.length + ' chars';
    document.querySelectorAll('.alt-trans').forEach(function(el) {
      el.classList.toggle('active', +el.dataset.idx === idx);
    });
    lastTranslation.forward = t.text;
  };

  window.verifyTranslation = function() {
    if (!lastTranslation) return;
    var t = window.__currentTranslation || lastTranslation.forward;
    var s = lastTranslation.source;
    var target = lastTranslation.target;
    var btn = document.querySelector('[title="Verify back-translation"]');
    if (btn) btn.textContent = '...';
    raceWithFallback(t, target, s)
      .then(function(results) {
        var back = results[0].text;
        var sim = stringSimilarity(lastTranslation.original.toLowerCase(), back.toLowerCase());
        var html = '<div class="quality-indicator animate-in">' +
          '<div class="quality-header">' +
            '<div class="quality-score" style="color:' + (sim >= 0.6 ? 'var(--green)' : sim >= 0.35 ? 'var(--amber)' : 'var(--rose)') + '">' +
              '<span class="quality-score-num">' + Math.round(sim * 100) + '</span><span class="quality-score-max">% back-match</span></div>' +
            '<div class="quality-label" style="color:' + (sim >= 0.6 ? 'var(--green)' : sim >= 0.35 ? 'var(--amber)' : 'var(--rose)') + '">' +
              (sim >= 0.6 ? 'Good round-trip confidence' : sim >= 0.35 ? 'Moderate — review suggested' : 'Low confidence — check manually') +
            '</div>' +
          '</div>' +
          '<div style="margin-top:10px;font-size:.8rem;color:var(--text-muted)">Original: ' + escapeHtml(lastTranslation.original) + '</div>' +
          '<div style="font-size:.8rem;color:var(--text)">Back-translated: ' + escapeHtml(back) + '</div>' +
        '</div>';
        var existing = document.querySelector('.quality-indicator');
        if (existing) existing.remove();
        document.querySelector('.panels').parentNode.insertAdjacentHTML('beforeend', html);
      })
      .catch(function(err) {
        showError('Verification failed: ' + err.message);
      })
      .finally(function() {
        if (btn) btn.textContent = '🔄';
      });
  };
// Offline phrasebook for common English expressions when APIs fail
  var OFFLINE = {
    hello: {es:'hola', fr:'bonjour', de:'hallo', it:'ciao', pt:'olá', ru:'привет', ja:'こんにちは', ko:'안녕하세요', zh:'你好'},
    'good morning': {es:'buenos días', fr:'bonjour', de:'guten Morgen', it:'buongiorno', pt:'bom dia'},
    'good night': {es:'buenas noches', fr:'bonne nuit', de:'gute Nacht', it:'buonanotte', pt:'boa noite'},
    'thank you': {es:'gracias', fr:'merci', de:'danke', it:'grazie', pt:'obrigado'},
    'how are you': {es:'¿cómo estás?', fr:'comment ça va?', de:'wie geht es dir?', it:'come stai?', pt:'como está?'},
    'goodbye': {es:'adiós', fr:'au revoir', de:'auf Wiedersehen', it:'arrivederci', pt:'adeus'},
    yes: {es:'sí', fr:'oui', de:'ja', it:'sì', pt:'sim'},
    no: {es:'no', fr:'non', de:'nein', it:'no', pt:'não'},
    please: {es:'por favor', fr:'s'il vous plaît', de:'bitte', it:'per favore', pt:'por favor'},
    'excuse me': {es:'disculpe', fr:'excusez-moi', de:'entschuldigung', it:'scusi', pt:'com licença'}
  };

  function offlineTranslate(q, s, t) {
    if (s !== 'en') return null; // only English source supported for offline
    var key = q.toLowerCase().replace(/[?!.]/g, '').trim();
    var entry = OFFLINE[key];
    if (entry && entry[t]) return {source: 'Offline phrasebook', text: entry[t]};
    // try word-by-word fallback
    var words = key.split(/\s+/);
    var mapped = [];
    words.forEach(function(w) {
      var e = OFFLINE[w];
      mapped.push(e && e[t] ? e[t] : w);
    });
    if (mapped.some(function(m) { return m !== key; })) {
      return {source: 'Offline fallback', text: mapped.join(' ')};
    }
    return null;
  }

  function runSanityCheck(results, original, source, target) {
    // If a very common word was translated, check against built-in mini glossary
    var lower = original.toLowerCase().replace(/[^a-z\s]/g, '');
    var words = lower.split(/\s+/);
    var hits = [];
    words.forEach(function(w) {
      if (!w) return;
      var entry = SANITY[w];
      if (entry && entry[target]) {
        var found = results.some(function(r) { return r.text.toLowerCase().indexOf(entry[target]) !== -1; });
        if (!found) hits.push({word: w, expected: entry[target]});
      }
    });
    if (hits.length) {
      var msg = 'Sanity note: expected ' + hits.map(function(h) { return h.word + '→' + h.expected; }).join(', ') + ' but not detected.';
      console.warn(msg);
    }
  }

  function showQualityIndicator(translations, original) {
    var totalSim = 0, pairs = 0;
    for (var i = 0; i < translations.length; i++) {
      for (var j = i + 1; j < translations.length; j++) {
        totalSim += stringSimilarity(translations[i].text.toLowerCase(), translations[j].text.toLowerCase());
        pairs++;
      }
    }
    var avg = pairs ? totalSim / pairs : 0;
    var grade = avg >= 0.7 ? 'high' : avg >= 0.4 ? 'medium' : 'low';
    var colors = {high: 'var(--green)', medium: 'var(--amber)', low: 'var(--rose)'};
    var labels = {high: 'High confidence — sources agree', medium: 'Mixed results', low: 'Low confidence — sources disagree'};
    var checks = translations.map(function(t) {
      return '<div class="quality-check"><span class="quality-check-icon" style="color:var(--green)">✓</span><div class="quality-check-text"><div class="quality-check-label">' + t.source + '</div><div class="quality-check-detail">' + escapeHtml(t.text.substring(0, 120)) + '</div></div></div>';
    }).join('');
    var html = '<div class="quality-indicator animate-in">' +
      '<div class="quality-header">' +
        '<div class="quality-score" style="color:' + colors[grade] + '"><span class="quality-score-num">' + Math.round(avg * 100) + '</span><span class="quality-score-max">% agreement</span></div>' +
        '<div class="quality-label" style="color:' + colors[grade] + '">' + labels[grade] + '</div>' +
        '<button class="btn btn-sm quality-toggle" onclick="this.parentElement.parentElement.classList.toggle(\'expanded\')">Details ▼</button>' +
      '</div>' +
      '<div class="quality-details">' + checks + '</div>' +
    '</div>';
    var existing = document.querySelector('.quality-indicator');
    if (existing) existing.remove();
    document.querySelector('.panels').parentNode.insertAdjacentHTML('beforeend', html);
  }

  function hideQualityIndicator() {
    var existing = document.querySelector('.quality-indicator');
    if (existing) existing.remove();
  }

  function stringSimilarity(a, b) {
    if (a === b) return 1;
    if (!a || !b) return 0;
    var wordsA = a.split(/\s+/).filter(function(w) { return w.length > 2; });
    var wordsB = b.split(/\s+/).filter(function(w) { return w.length > 2; });
    if (!wordsA.length || !wordsB.length) return 0;
    var matches = 0;
    wordsA.forEach(function(wa) {
      wordsB.forEach(function(wb) {
        if (wa === wb || (wa.length > 3 && wb.length > 3 && (wa.indexOf(wb) >= 0 || wb.indexOf(wa) >= 0))) matches++;
      });
    });
    return (2 * matches) / (wordsA.length + wordsB.length);
  }

  window.handleInput = function() {
    var text = document.getElementById('sourceText').value;
    document.getElementById('charCount').textContent = text.length;
    clearTimeout(translateTimeout);
    if (text.trim().length > 2) {
      translateTimeout = setTimeout(window.translateText, 900);
    }
  };

  window.handleLangChange = function() {
    var source = document.getElementById('sourceLang');
    var target = document.getElementById('targetLang');
    document.getElementById('sourceLangLabel').textContent = source.options[source.selectedIndex].text;
    document.getElementById('targetLangLabel').textContent = target.options[target.selectedIndex].text;
    if (document.getElementById('sourceText').value.trim()) window.translateText();
  };

  window.swapLanguages = function() {
    var source = document.getElementById('sourceLang');
    var target = document.getElementById('targetLang');
    var temp = source.value; source.value = target.value; target.value = temp;
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

  window.clearSource = function() {
    document.getElementById('sourceText').value = '';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('targetOutput').innerHTML = '<span class="placeholder">Translation will appear here...</span>';
    document.getElementById('targetCharCount').textContent = '';
    hideQualityIndicator();
    lastTranslation = null;
  };

  window.copyTranslation = function() {
    var text = window.__currentTranslation;
    if (text) navigator.clipboard.writeText(text).then(function() { showToast('Copied'); });
  };

  window.pasteFromClipboard = function() {
    navigator.clipboard.readText().then(function(text) {
      document.getElementById('sourceText').value = text;
      document.getElementById('charCount').textContent = text.length;
      window.translateText();
    }).catch(function() { showToast('Clipboard access denied'); });
  };

  window.speakTranslation = function() {
    var text = window.__currentTranslation;
    if (text && 'speechSynthesis' in window) {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = document.getElementById('targetLang').value;
      speechSynthesis.speak(u);
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
    var area = document.querySelector('.translate-area');
    area.insertBefore(div, area.querySelector('.panels'));
    setTimeout(function() { div.remove(); }, 6000);
  }

  window.showToast = function(msg) {
    var existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.className = 'toast-msg';
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(function() { div.remove(); }, 2000);
  };

  window.showSection = function(section) {
    document.querySelectorAll('.topbar-nav a').forEach(function(a) { a.classList.remove('active'); });
    event.target.classList.add('active');
    showToast(section.charAt(0).toUpperCase() + section.slice(1) + ' — coming soon');
  };

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); window.translateText(); }
  });
})();
