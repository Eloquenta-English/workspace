// ═══ HERMES WINDOW MANAGER — renderer app ═══

// State
const STORAGE_KEY = 'hermes-wm-v1';
let state = { lanes: [], nextId: { lane: 1, term: 1 } };

// PTY instance tracking: termId -> { term, fitAddon, ptyId, laneId, el }
const terms = new Map();
let ptyIdCounter = 0;

// ── HELPERS ──
function esc(s) { const d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }
function uid(p) { return `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`; }
function getLane(id) { return state.lanes.find(l => l.id === id); }

function load() { try { const r = localStorage.getItem(STORAGE_KEY); if (r) state = JSON.parse(r); } catch(e) {} }
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {} }

function shellFor(platform) {
  if (platform === 'win32') return 'cmd.exe';
  return '/bin/bash';
}

// ── TOAST ──
function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

load();
