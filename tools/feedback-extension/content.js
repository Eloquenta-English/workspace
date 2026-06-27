(function(){
'use strict';

var OK = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request && request.type === 'TEACHER_LINK_DROP') {
    window.postMessage(request, '*');
    sendResponse({ok: true});
  }
  return true;
});

// Also support direct button inside the form
window.addEventListener('DOMContentLoaded', function(){
  var addFromTabBtn = document.getElementById('addFromTab');
  if (addFromTabBtn) {
    addFromTabBtn.addEventListener('click', function(){
      try {
        // Open extension popup is not directly possible from web page,
        // so show a helper message and try to communicate with extension.
        if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
          chrome.runtime.sendMessage('TEACHER_LINK_DROP_PING', function(response){
            if (!response) {
              showExtensionHint();
            }
          });
        } else {
          showExtensionHint();
        }
      } catch(e) {
        showExtensionHint();
      }
    });
  }
});

function showExtensionHint(){
  var hint = document.createElement('div');
  hint.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#111827;border:1px solid var(--cs-border,#1e3a5f);color:#e0f2fe;padding:12px 20px;border-radius:12px;z-index:200;font-size:.85rem;max-width:320px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.4)';
  hint.innerHTML = 'Click the Teacher Link Drop extension icon in your toolbar to pick an open tab. <button id="dismissHint" style="margin-left:8px;background:var(--cs-accent,#22d3ee);border:none;border-radius:6px;padding:4px 10px;cursor:pointer;color:#0a0e1a;font-weight:700;">OK</button>';
  document.body.appendChild(hint);
  document.getElementById('dismissHint').addEventListener('click', function(){ hint.remove(); });
  setTimeout(function(){ if(hint.parentNode) hint.remove(); }, 6000);
}
})();
