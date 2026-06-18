// ═══ TERMINAL / PTY MANAGEMENT ═══

function spawnTerminalDOM(container, laneId, tInfo) {
  const wrap = document.createElement('div');
  wrap.className = 'term-wrap';
  wrap.id = `wrap-${tInfo.id}`;
  wrap.style.height = tInfo.height || '180px';

  wrap.innerHTML = `
    <div class="term-bar">
      <div class="term-dot ${tInfo.color || 'green'}"></div>
      <span class="term-title" contenteditable="true" onclick="event.stopPropagation()"
            onblur="renameTerm('${laneId}','${tInfo.id}',this.textContent)"
            onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur()}">${esc(tInfo.title)}</span>
      <button class="term-btn" title="Minimize" onclick="toggleMinTerm('${laneId}','${tInfo.id}')">—</button>
      <button class="term-btn xbtn" title="Close" onclick="closeTerm('${laneId}','${tInfo.id}')">✕</button>
    </div>
    <div class="term-container" id="tc-${tInfo.id}"></div>
  `;
  container.appendChild(wrap);

  // xterm.js
  const el = wrap.querySelector('.term-container');
  const term = new Terminal({
    cursorBlink: true, fontSize: 12,
    fontFamily: "'JetBrains Mono','Fira Code',monospace",
    theme: {
      background: '#0a0a0f', foreground: '#e8e8f0', cursor: '#6c5ce7',
      selectionBackground: 'rgba(108,92,231,.25)',
      black: '#0a0a0f', green: '#00b894', cyan: '#22d3ee',
      magenta: '#6c5ce7', yellow: '#fdcb6e'
    },
    allowProposedApi: true
  });
  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(el);
  fitAddon.fit();

  // Spawn PTY
  const ptyId = ++ptyIdCounter;
  const shell = tInfo.cmd || shellFor(window.hermesWin?.platform);
  window.pty.spawn(ptyId, shell, { cols: term.cols, rows: term.rows, cwd: tInfo.cwd || '' });

  // PTY -> xterm
  window.pty.onData(ptyId, data => term.write(data));

  terms.set(tInfo.id, { term, fitAddon, ptyId, laneId });

  // xterm -> PTY
  term.onData(data => window.pty.write(ptyId, data));
  term.onResize(({ cols, rows }) => window.pty.resize(ptyId, cols, rows));

  // Auto-fit on resize
  const ro = new ResizeObserver(() => {
    fitAddon.fit();
    const inst = terms.get(tInfo.id);
    if (inst) window.pty.resize(inst.ptyId, inst.term.cols, inst.term.rows);
  });
  ro.observe(el);
}

function closeTerm(laneId, termId) {
  const inst = terms.get(termId);
  if (inst) { window.pty.kill(inst.ptyId); inst.term.dispose(); terms.delete(termId); }
  const lane = getLane(laneId);
  if (lane) lane.terminals = lane.terminals.filter(t => t.id !== termId);
  render();
}

function toggleMinTerm(laneId, termId) {
  const wrap = document.getElementById(`wrap-${termId}`);
  if (!wrap) return;
  wrap.classList.toggle('minimized');
  if (!wrap.classList.contains('minimized')) {
    const inst = terms.get(termId);
    if (inst) { inst.fitAddon.fit(); inst.term.focus(); }
  }
}

function renameTerm(laneId, termId, name) {
  const lane = getLane(laneId);
  if (!lane) return;
  const t = lane.terminals.find(x => x.id === termId);
  if (t) { t.title = name.trim() || 'Terminal'; save(); }
}
