// ═══ RENDER ═══

function render() { renderLaneTabs(); renderMain(); renderStats(); renderLaneSelect(); updateEmptyState(); save(); }

function renderLaneTabs() {
  const el = document.getElementById('lane-tabs');
  if (!state.lanes.length) { el.innerHTML = ''; return; }
  el.innerHTML = state.lanes.map(l =>
    `<div class="lane-tab" onclick="expandLane('${l.id}')">${esc(l.name)}<span class="count">${l.terminals.length}</span></div>`
  ).join('');
}

function renderStats() {
  const t = state.lanes.reduce((s, l) => s + l.terminals.length, 0);
  document.getElementById('stats-text').textContent = `${t} terminal${t !== 1 ? 's' : ''}`;
}

function renderLaneSelect() {
  const sel = document.getElementById('form-lane');
  if (!sel) return;
  sel.innerHTML = state.lanes.map(l => `<option value="${l.id}">${esc(l.name)}</option>`).join('');
}

function updateEmptyState() {
  const t = state.lanes.reduce((s, l) => s + l.terminals.length, 0);
  const es = document.getElementById('empty-state');
  if (es) es.style.display = (t === 0 && state.lanes.length === 0) ? 'flex' : 'none';
}

function renderMain() {
  const main = document.getElementById('main');
  if (!state.lanes.length) { main.innerHTML = ''; return; }

  main.innerHTML = state.lanes.map(lane => `
    <div class="lane-column ${lane.collapsed ? 'collapsed' : ''}" data-lane="${lane.id}" style="width:${lane.width || 320}px">
      <div class="lane-header" onclick="toggleLaneCollapse('${lane.id}')">
        <span class="lane-arrow">▼</span>
        <span class="lane-name lc" contenteditable="true" onclick="event.stopPropagation()"
              onblur="renameLane('${lane.id}',this.textContent)"
              onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur()}">${esc(lane.name)}</span>
        <div class="lane-actions lc">
          <button class="lane-ab" title="Add terminal" onclick="event.stopPropagation();openAddModal('${lane.id}')">+</button>
          ${state.lanes.length > 1 ? `<button class="lane-ab danger" title="Delete lane" onclick="event.stopPropagation();deleteLane('${lane.id}')">✕</button>` : ''}
        </div>
      </div>
      <div class="lane-terminals" id="lane-terms-${lane.id}">
        ${lane.terminals.length === 0 ? '<div style="padding:12px;color:var(--text-muted);font-size:11px;text-align:center;font-style:italic">No terminals</div>' : ''}
      </div>
      <div class="split-handle" onmousedown="startResize(event,'${lane.id}')"></div>
    </div>
  `).join('');

  // Create terminals
  state.lanes.forEach(lane => {
    const container = document.getElementById(`lane-terms-${lane.id}`);
    if (!container) return;
    lane.terminals.forEach(t => spawnTerminalDOM(container, lane.id, t));
  });
}
