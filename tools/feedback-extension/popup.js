(function(){
'use strict';

var FEEDBACK_HOSTS = [
  'eloquenta-english.github.io/workspace/esl-sites/eloquenta/feedback',
  'eloquenta-english.github.io/workspace/esl-sites/william-thomason-english/feedback'
];

function isFeedbackUrl(url){
  return FEEDBACK_HOSTS.some(function(h){ return url.indexOf(h) !== -1; });
}

function escapeHtml(text){
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderTabs(tabs, formTabId){
  var list = document.getElementById('tabList');
  var search = document.getElementById('searchInput').value.toLowerCase();
  list.innerHTML = '';

  var filtered = tabs.filter(function(t){
    var text = (t.title + ' ' + t.url).toLowerCase();
    return text.indexOf(search) !== -1;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty">No matching tabs.</div>';
    return;
  }

  filtered.forEach(function(tab){
    var row = document.createElement('div');
    row.className = 'tab';
    var fav = tab.favIconUrl ? '<img src="'+escapeHtml(tab.favIconUrl)+'" alt="">' : '⚬';
    row.innerHTML = ''+
      '<div class="favicon">'+fav+'</div>'+
      '<div style="flex:1;min-width:0">'+
        '<div class="title">'+escapeHtml(tab.title || 'Untitled')+'</div>'+
        '<div class="url">'+escapeHtml(tab.url || '')+'</div>'+
      '</div>'+
      '<button class="add-btn">Add</button>';
    row.querySelector('.add-btn').addEventListener('click', function(e){
      e.stopPropagation();
      sendToFeedback(formTabId, tab.title, tab.url);
    });
    list.appendChild(row);
  });
}

function sendToFeedback(formTabId, title, url){
  if (!formTabId) {
    // No feedback form open: copy to clipboard
    navigator.clipboard.writeText(title + '\n' + url).then(function(){
      updateStatus('No feedback form found. Link copied to clipboard.', 'warn');
    });
    return;
  }

  chrome.tabs.sendMessage(formTabId, {
    type: 'TEACHER_LINK_DROP',
    title: title,
    url: url
  }, function(response){
    if (chrome.runtime.lastError || !response) {
      updateStatus('Could not reach feedback form. Copied to clipboard instead.', 'warn');
      navigator.clipboard.writeText(title + '\n' + url);
    } else {
      updateStatus('Added to feedback form: ' + (title || url), 'ok');
      window.close();
    }
  });
}

function updateStatus(msg, cls){
  var el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'status ' + (cls || '');
}

function init(){
  chrome.tabs.query({currentWindow: true}, function(tabs){
    var formTab = tabs.find(function(t){ return isFeedbackUrl(t.url); });
    if (formTab) {
      updateStatus('Feedback form found. Click Add to drop links.', 'ok');
    } else {
      updateStatus('No Eloquenta/WTE feedback form open. Links will copy to clipboard.', 'warn');
    }
    renderTabs(tabs, formTab ? formTab.id : null);
  });

  document.getElementById('searchInput').addEventListener('input', function(){
    chrome.tabs.query({currentWindow: true}, function(tabs){
      var formTab = tabs.find(function(t){ return isFeedbackUrl(t.url); });
      renderTabs(tabs, formTab ? formTab.id : null);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
})();
