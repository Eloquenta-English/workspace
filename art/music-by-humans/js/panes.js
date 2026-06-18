/* Music By Humans — Draggable Pane System */
/* Winamp-inspired movable/resizable panes with localStorage persistence */

(function () {
  'use strict';

  const STORAGE_KEY = 'mbh_panes';
  const SNAP_GRID = 10;
  const MIN_WIDTH = 200;
  const MIN_HEIGHT = 120;

  let activePane = null;
  let isDragging = false;
  let isResizing = false;
  let resizeDirection = null;
  let dragOffset = { x: 0, y: 0 };
  let startPos = { x: 0, y: 0 };
  let startSize = { w: 0, h: 0 };

  // ── Snap to grid ─────────────────────────────────────────────────────────
  function snap(value) {
    return Math.round(value / SNAP_GRID) * SNAP_GRID;
  }

  // ── Save pane positions ──────────────────────────────────────────────────
  function savePanes() {
    const panes = {};
    document.querySelectorAll('.mbh-pane').forEach(pane => {
      const id = pane.id;
      if (!id) return;
      const rect = pane.getBoundingClientRect();
      const container = document.getElementById('mbh-panes').getBoundingClientRect();
      panes[id] = {
        left: snap(rect.left - container.left),
        top: snap(rect.top - container.top),
        width: snap(rect.width),
        height: snap(rect.height),
        hidden: pane.classList.contains('skin-hidden'),
      };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panes));
  }

  // ── Restore pane positions ───────────────────────────────────────────────
  function restorePanes() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return;

      Object.entries(saved).forEach(([id, pos]) => {
        const pane = document.getElementById(id);
        if (!pane) return;

        pane.style.left = `${pos.left}px`;
        pane.style.top = `${pos.top}px`;
        pane.style.width = `${pos.width}px`;
        pane.style.height = `${pos.height}px`;

        if (pos.hidden) {
          pane.classList.add('skin-hidden');
        }
      });
    } catch (e) {
      console.warn('Could not restore pane positions:', e);
    }
  }

  // ── Bring pane to front ──────────────────────────────────────────────────
  function bringToFront(pane) {
    const panes = document.querySelectorAll('.mbh-pane');
    let maxZ = 1;
    panes.forEach(p => {
      const z = parseInt(window.getComputedStyle(p).zIndex) || 1;
      if (z > maxZ) maxZ = z;
    });
    pane.style.zIndex = maxZ + 1;
  }

  // ── Drag handlers ────────────────────────────────────────────────────────
  function onDragStart(e, pane) {
    if (e.target.closest('.mbh-pane-close') || e.target.closest('.mbh-pane-body')) return;

    isDragging = true;
    activePane = pane;
    bringToFront(pane);

    const rect = pane.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;

    pane.classList.add('skin-cursor-grabbing');
    e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDragging || !activePane) return;

    const container = document.getElementById('mbh-panes');
    const containerRect = container.getBoundingClientRect();
    const paneRect = activePane.getBoundingClientRect();

    let newX = snap(e.clientX - containerRect.left - dragOffset.x);
    let newY = snap(e.clientY - containerRect.top - dragOffset.y);

    // Constrain to container bounds
    newX = Math.max(0, Math.min(newX, containerRect.width - paneRect.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - paneRect.height));

    activePane.style.left = `${newX}px`;
    activePane.style.top = `${newY}px`;
  }

  function onDragEnd() {
    if (activePane) {
      activePane.classList.remove('skin-cursor-grabbing');
    }
    isDragging = false;
    activePane = null;
    savePanes();
  }

  // ── Resize handlers ──────────────────────────────────────────────────────
  function onResizeStart(e, pane, direction) {
    isResizing = true;
    activePane = pane;
    resizeDirection = direction;
    bringToFront(pane);

    const rect = pane.getBoundingClientRect();
    startPos = { x: e.clientX, y: e.clientY };
    startSize = { w: rect.width, h: rect.height };

    e.preventDefault();
    e.stopPropagation();
  }

  function onResizeMove(e) {
    if (!isResizing || !activePane) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    let newW = startSize.w;
    let newH = startSize.h;

    if (resizeDirection.includes('e')) {
      newW = snap(Math.max(MIN_WIDTH, startSize.w + dx));
    }
    if (resizeDirection.includes('s')) {
      newH = snap(Math.max(MIN_HEIGHT, startSize.h + dy));
    }

    activePane.style.width = `${newW}px`;
    activePane.style.height = `${newH}px`;
  }

  function onResizeEnd() {
    isResizing = false;
    activePane = null;
    resizeDirection = null;
    savePanes();
  }

  // ── Initialize panes ─────────────────────────────────────────────────────
  function initPanes() {
    const container = document.getElementById('mbh-panes');
    if (!container) return;

    // Make panes draggable and resizable
    document.querySelectorAll('.mbh-pane').forEach(pane => {
      const header = pane.querySelector('.mbh-pane-header');
      if (header) {
        header.addEventListener('mousedown', (e) => onDragStart(e, pane));
      }

      // Resize handles
      pane.querySelectorAll('.mbh-pane-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
          let direction = 'e';
          if (handle.classList.contains('mbh-pane-handle-s')) direction = 's';
          if (handle.classList.contains('mbh-pane-handle-se')) direction = 'se';
          onResizeStart(e, pane, direction);
        });
      });
    });

    // Global mouse events
    document.addEventListener('mousemove', (e) => {
      onDragMove(e);
      onResizeMove(e);
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) onDragEnd();
      if (isResizing) onResizeEnd();
    });

    // Save on window resize
    window.addEventListener('resize', () => {
      // Constrain panes to new container size
      const containerRect = container.getBoundingClientRect();
      document.querySelectorAll('.mbh-pane').forEach(pane => {
        const rect = pane.getBoundingClientRect();
        const maxX = containerRect.width - rect.width;
        const maxY = containerRect.height - rect.height;
        const currentLeft = parseInt(pane.style.left) || 0;
        const currentTop = parseInt(pane.style.top) || 0;
        if (currentLeft > maxX) pane.style.left = `${Math.max(0, maxX)}px`;
        if (currentTop > maxY) pane.style.top = `${Math.max(0, maxY)}px`;
      });
      savePanes();
    });

    // Restore saved positions
    restorePanes();
  }

  // ── Public API ───────────────────────────────────────────────────────────
  window.MBH_Panes = {
    save: savePanes,
    restore: restorePanes,
    bringToFront,
    init: initPanes,
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPanes);
  } else {
    initPanes();
  }
})();
