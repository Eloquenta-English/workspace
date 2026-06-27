/* Eloquenta / WTE feedback form shared engine */
(function(){
'use strict';

var TED_TALKS = {
  b1: [
    {title:'Try something new for 30 days', url:'https://www.ted.com/talks/matt_cutts_try_something_new_for_30_days'},
    {title:'How to make stress your friend', url:'https://www.ted.com/talks/kelly_mcgonigal_how_to_make_stress_your_friend'},
    {title:'The power of introverts', url:'https://www.ted.com/talks/susan_cain_the_power_of_introverts'}
  ],
  b2: [
    {title:'Your body language may shape who you are', url:'https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are'},
    {title:'How great leaders inspire action', url:'https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action'},
    {title:'The surprising science of happiness', url:'https://www.ted.com/talks/dan_gilbert_the_surprising_science_of_happiness'}
  ],
  c1: [
    {title:'Do schools kill creativity?', url:'https://www.ted.com/talks/sir_ken_robinson_do_schools_kill_creativity'},
    {title:'The danger of a single story', url:'https://www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story'},
    {title:'My stroke of insight', url:'https://www.ted.com/talks/jill_bolte_taylor_my_stroke_of_insight'}
  ]
};

var PRAISE_MESSAGES = [
  'Great work today!',
  'Excellent speaking!',
  'Good effort in the lesson.',
  'Well prepared!',
  'Nice progress!',
  'Keep it up!'
];

var HOMEWORK_LABELS = [
  'Writing homework',
  'Vocabulary exercise',
  'Listening exercise',
  'Reading article',
  'Grammar drill',
  'Speaking task',
  'Video lesson',
  'Quiz / test',
  'Custom'
];

window.FeedbackEngine = {
  TED_TALKS: TED_TALKS,
  PRAISE_MESSAGES: PRAISE_MESSAGES,
  HOMEWORK_LABELS: HOMEWORK_LABELS,

  qs: function(sel, ctx){ return (ctx||document).querySelector(sel); },
  qsa: function(sel, ctx){ return (ctx||document).querySelectorAll(sel); },

  saveDraft: function(key, data){
    try { localStorage.setItem(key, JSON.stringify(data)); return true; }
    catch(e){ return false; }
  },

  loadDraft: function(key){
    try { return JSON.parse(localStorage.getItem(key)||'null'); }
    catch(e){ return null; }
  },

  clearDraft: function(key){
    try { localStorage.removeItem(key); } catch(e){}
  },

  encodeSummary: function(data){
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  },

  decodeSummary: function(hash){
    try { return JSON.parse(decodeURIComponent(escape(atob(hash)))); }
    catch(e){ return null; }
  },

  generateSummaryLink: function(data, baseUrl){
    return baseUrl + '?s=' + this.encodeSummary(data);
  },

  createConfetti: function(container, color){
    var c = container || document.body;
    var count = 60;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.style.position = 'fixed';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '-10px';
      p.style.width = (6 + Math.random() * 6) + 'px';
      p.style.height = (6 + Math.random() * 6) + 'px';
      p.style.background = color || 'var(--cs-accent)';
      p.style.borderRadius = '2px';
      p.style.opacity = '0.9';
      p.style.zIndex = '9999';
      p.style.pointerEvents = 'none';
      p.style.transition = 'top 1.5s ease-in, opacity 1.5s ease-out, transform 1.5s linear';
      c.appendChild(p);
      setTimeout(function(el){
        el.style.top = '110vh';
        el.style.transform = 'rotate(' + (Math.random()*720-360) + 'deg)';
        el.style.opacity = '0';
      }.bind(null, p), 10);
      setTimeout(function(el){ if(el.parentNode) el.parentNode.removeChild(el); }.bind(null, p), 1600);
    }
  },

  startTimer: function(displayEl, seconds, onEnd){
    var remaining = seconds;
    var interval = setInterval(function(){
      remaining--;
      var m = Math.floor(remaining / 60);
      var s = remaining % 60;
      displayEl.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      if (remaining <= 60) displayEl.classList.add('timer-urgent');
      if (remaining <= 0) {
        clearInterval(interval);
        displayEl.classList.add('timer-ended');
        if (onEnd) onEnd();
      }
    }, 1000);
    return interval;
  },

  initHomeworkBuilder: function(container, addTabBtn){
    var self = this;
    var items = [];
    var listEl = container.querySelector('.homework-list');
    var addManual = container.querySelector('.add-homework-manual');

    function render(){
      listEl.innerHTML = '';
      items.forEach(function(item, idx){
        var row = document.createElement('div');
        row.className = 'homework-item glass';
        row.innerHTML = ''+
          '<span class="hw-label">'+item.label+'</span>'+
          '<input type="text" class="hw-title" value="'+item.title.replace(/"/g,'&quot;')+'" placeholder="Title">'+
          '<input type="text" class="hw-url" value="'+item.url.replace(/"/g,'&quot;')+'" placeholder="URL">'+
          '<button type="button" class="hw-remove" data-idx="'+idx+'">×</button>';
        listEl.appendChild(row);
      });
      listEl.querySelectorAll('.hw-remove').forEach(function(btn){
        btn.addEventListener('click', function(){
          items.splice(parseInt(btn.dataset.idx), 1);
          render();
        });
      });
    }

    function addItem(label, title, url){
      items.push({ label: label || 'Custom', title: title || '', url: url || '', due: '' });
      render();
    }

    if (addManual) addManual.addEventListener('click', function(){
      var label = container.querySelector('.homework-label-select').value;
      addItem(label);
    });

    // Browser extension / tab drop receiver
    window.addEventListener('message', function(e){
      if (e.data && e.data.type === 'TEACHER_LINK_DROP') {
        var label = container.querySelector('.homework-label-select').value;
        addItem(label, e.data.title, e.data.url);
      }
    });

    // Add from open tab button: try extension, fallback to prompt
    if (addTabBtn) addTabBtn.addEventListener('click', function(){
      if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
        // Request tab list from extension
        chrome.runtime.sendMessage('TEACHER_LINK_DROP_PING', function(response){
          if (!response) {
            // Extension not installed or not responding
            fallbackTabAdd();
          }
        });
      } else {
        fallbackTabAdd();
      }
    });

    function fallbackTabAdd(){
      var url = prompt('Paste the URL from the open tab:');
      if (!url) return;
      var title = prompt('Title for this homework:');
      var label = container.querySelector('.homework-label-select').value;
      addItem(label, title, url);
    }

    return {
      addItem: addItem,
      getItems: function(){ return items; },
      setItems: function(newItems){ items = newItems.slice(); render(); }
    };
  },

  buildData: function(form){
    var data = {
      studentName: form.querySelector('[name="studentName"]').value,
      lessonDate: form.querySelector('[name="lessonDate"]').value,
      topic: form.querySelector('[name="topic"]').value,
      level: form.querySelector('[name="level"]').value,
      completed: form.querySelector('[name="completed"]:checked').value,
      techIssues: form.querySelector('[name="techIssues"]:checked').value,
      ratings: {},
      focus: form.querySelector('[name="focus"]').value,
      vocabulary: form.querySelector('[name="vocabulary"]').value,
      nextFocus: form.querySelector('[name="nextFocus"]').value,
      praise: form.querySelector('[name="praise"]').value,
      comments: form.querySelector('[name="comments"]').value,
      studentConfirmed: form.querySelector('[name="studentConfirmed"]').checked,
      noTimeThisWeek: form.querySelector('[name="noTimeThisWeek"]').checked,
      homework: [],
      createdAt: new Date().toISOString()
    };
    form.querySelectorAll('.rating-input').forEach(function(input){
      data.ratings[input.name] = parseInt(input.value) || 0;
    });
    form.querySelectorAll('.homework-item').forEach(function(row){
      data.homework.push({
        label: row.querySelector('.hw-label').textContent,
        title: row.querySelector('.hw-title').value,
        url: row.querySelector('.hw-url').value
      });
    });
    return data;
  }
};
})();
