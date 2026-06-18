// ═══ LANE ACTIONS ═══

function addLane() {
  const id = uid('lane');
  const lane = { id, name: `Lane ${state.nextId.lane++}`, terminals: [], collapsed: false, width: 320 };
  state.lanes.push(lane);
  render();
  toast(`Lane "${lane.name}" created`);
}

function addLaneAndTerminal() {
  addLane();
  const lane = state.lanes[state.lanes.length - 1];
  openAddModal(lane.id);
}

function toggleLaneCollapse(id) {
  const l = getLane(id); if (l) { l.collapsed = !l.collapsed; render(); }
}

function expandLane(id) {
  const l = getLane(id); if (l) { l.collapsed = false; render(); }
}

function renameLane(id, name) {
  const l = getLane(id); if (l) { l.name = name.trim() || 'Unnamed'; save(); renderLaneTabs(); }
}

function deleteLane(id) {
  const lane = getLane(id);
  if (!lane) return;
  if (lane.terminals.length && !confirm(`Delete "${lane.name}" with ${lane.terminals.length} terminal(s)?`)) return;
  lane.terminals.forEach(t => closeTerm(id, t.id));
  state.lanes = state.lanes.filter(l => l.id !== id);
  render();
}

function collapseAll() { state.lanes.forEach(l => l.collapsed = true); render(); }
function expandAll() { state.lanes.forEach(l => l.collapsed = false); render(); }

// ═══ MODAL ═══
function openAddModal(laneId) {
  renderLaneSelect();
  const sel = document.getElementById('form-lane');
  if (sel && laneId) sel.value = laneId;
  document.getElementById('form-cmd').value = '';
  document.getElementById('form-title').value = '';
  document.getElementById('modal-overlay').classList.add('show');
  setTimeout(() => document.getElementById('form-cmd').focus(), 50);
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('show'); }

function submitTerminal() {
  const cmd = document.getElementById('form-cmd').value.trim() || shellFor(window.hermesWin?.platform);
  const title = document.getElementById('form-title').value.trim() || cmd;
  const color = document.getElementById('form-color').value;
  const laneId = document.getElementById('form-lane').value;
  const lane = getLane(laneId);
  if (!lane) { closeModal(); return; }
  const termId = uid('term');
  lane.terminals.push({ id: termId, title, cmd, color, height: '180px' });
  render();
  closeModal();
  toast(`Spawned: ${title}`);
}

function quickAdd(type) {
  const map = {
    hermes: { cmd: 'hermes', title: 'Hermes', color: 'purple' },
    claude: { cmd: 'claude', title: 'Claude Code', color: 'pink' },
    bash:   { cmd: 'bash',   title: 'Bash',        color: 'green' },
    node:   { cmd: 'node',   title: 'Node REPL',   color: 'yellow' },
    python: { cmd: 'python3',title: 'Python',      color: 'cyan' },
    htop:   { cmd: 'htop',   title: 'htop',        color: 'green' }
  };
  const info = map[type] || { cmd: type, title: type, color: 'green' };
  document.getElementById('form-cmd').value = info.cmd;
  document.getElementById('form-title').value = info.title;
  document.getElementById('form-color').value = info.color;
  submitTerminal();
}

// ═══ SPLIT RESIZE ═══
let resizeState = null;

function startResize(e, laneId) {
  e.preventDefault();
  const col = e.target.closest('.lane-column');
  resizeState = { laneId, startX: e.clientX, startWidth: col.offsetWidth };
  const onMove = ev => {
    if (!resizeState) return;
    const w = Math.max(180, resizeState.startWidth + (ev.clientX - resizeState.startX));
    col.style.width = w + 'px';
    const lane = getLane(resizeState.laneId);
    if (lane) lane.terminals.forEach(t => {
      const inst = terms.get(t.id);
      if (inst) { inst.fitAddon.fit(); window.pty.resize(inst.ptyId, inst.term.cols, inst.term.rows); }
    });
  };
  const onUp = () => {
    if (resizeState) { const l = getLane(resizeState.laneId); if (l) { l.width = col.offsetWidth; save(); } }
    resizeState = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

// ═══ KEYBOARD ═══
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.ctrlKey && e.shiftKey && e.key === 'T') { e.preventDefault(); openAddModal(); }
  if (e.ctrlKey && e.shiftKey && e.key === 'L') { e.preventDefault(); addLane(); }
});

// ═══ INIT ═══
render();
