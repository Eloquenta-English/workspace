/* Music By Humans — YouTube Player Integration */
/* YouTube IFrame API with queue, keyboard shortcuts, and now-playing display */

(function () {
  'use strict';

  let player = null;
  let playerReady = false;
  let queue = [];
  let currentIndex = -1;
  let progressInterval = null;

  // ── Initialize YouTube Player ────────────────────────────────────────────
  function initPlayer() {
    // YouTube IFrame API calls this globally when ready
    window.onYouTubeIframeAPIReady = function () {
      player = new YT.Player('player-youtube', {
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    };
  }

  function onPlayerReady(event) {
    playerReady = true;
    console.log('[MBH] YouTube player ready');

    // Set initial volume
    player.setVolume(80);

    // Start progress tracking
    startProgressTracking();
  }

  function onPlayerStateChange(event) {
    const state = event.data;

    // Update play/pause button
    const playBtn = document.getElementById('btn-play');
    if (playBtn) {
      playBtn.textContent = state === YT.PlayerState.PLAYING ? '⏸' : '▶';
      playBtn.classList.toggle('active', state === YT.PlayerState.PLAYING);
    }

    // Auto-advance on end
    if (state === YT.PlayerState.ENDED) {
      playNext();
    }

    // Update now playing display
    if (state === YT.PlayerState.PLAYING && currentIndex >= 0) {
      updateNowPlaying();
    }
  }

  function onPlayerError(event) {
    console.warn('[MBH] Player error:', event.data);
    // Try next track on error
    if (event.data === 150 || event.data === 101) {
      playNext();
    }
  }

  // ── Playback Controls ────────────────────────────────────────────────────
  function play() {
    if (!playerReady) return;
    player.playVideo();
  }

  function pause() {
    if (!playerReady) return;
    player.pauseVideo();
  }

  function togglePlay() {
    if (!playerReady) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      pause();
    } else {
      play();
    }
  }

  function stop() {
    if (!playerReady) return;
    player.stopVideo();
    stopProgressTracking();
  }

  function seekTo(seconds) {
    if (!playerReady) return;
    player.seekTo(seconds, true);
  }

  function setVolume(value) {
    if (!playerReady) return;
    player.setVolume(Math.max(0, Math.min(100, value)));
  }

  // ── Queue Management ─────────────────────────────────────────────────────
  function addToQueue(videoId, title, artist) {
    queue.push({ videoId, title, artist });
    renderQueue();

    // Auto-play if nothing is playing
    if (currentIndex === -1 && queue.length === 1) {
      playIndex(0);
    }
  }

  function removeFromQueue(index) {
    if (index < 0 || index >= queue.length) return;
    queue.splice(index, 1);

    if (index === currentIndex) {
      if (queue.length > 0) {
        playIndex(Math.min(index, queue.length - 1));
      } else {
        stop();
        currentIndex = -1;
        updateNowPlaying();
      }
    } else if (index < currentIndex) {
      currentIndex--;
    }

    renderQueue();
  }

  function clearQueue() {
    queue = [];
    currentIndex = -1;
    stop();
    updateNowPlaying();
    renderQueue();
  }

  function playIndex(index) {
    if (!playerReady || index < 0 || index >= queue.length) return;
    currentIndex = index;
    const track = queue[index];
    player.loadVideoById(track.videoId);
    updateNowPlaying();
    renderQueue();
  }

  function playNext() {
    if (currentIndex + 1 < queue.length) {
      playIndex(currentIndex + 1);
    } else {
      // Loop back to start
      if (queue.length > 0) {
        playIndex(0);
      }
    }
  }

  function playPrev() {
    if (currentIndex > 0) {
      playIndex(currentIndex - 1);
    } else {
      // Loop to end
      if (queue.length > 0) {
        playIndex(queue.length - 1);
      }
    }
  }

  // ── Now Playing Display ──────────────────────────────────────────────────
  function updateNowPlaying() {
    const titleEl = document.getElementById('mbh-player-title');
    const artistEl = document.getElementById('mbh-player-artist');

    if (currentIndex >= 0 && queue[currentIndex]) {
      const track = queue[currentIndex];
      if (titleEl) titleEl.textContent = track.title || 'Unknown';
      if (artistEl) artistEl.textContent = track.artist || 'Unknown';
    } else {
      if (titleEl) titleEl.textContent = 'No track loaded';
      if (artistEl) artistEl.textContent = '—';
    }
  }

  // ── Progress Tracking ────────────────────────────────────────────────────
  function startProgressTracking() {
    stopProgressTracking();
    progressInterval = setInterval(updateProgress, 500);
  }

  function stopProgressTracking() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  function updateProgress() {
    if (!playerReady) return;

    const duration = player.getDuration() || 0;
    const currentTime = player.getCurrentTime() || 0;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const fill = document.getElementById('mbh-player-progress-fill');
    if (fill) fill.style.width = `${progress}%`;

    const timeEl = document.getElementById('mbh-player-time');
    if (timeEl) {
      timeEl.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // ── Queue Rendering ──────────────────────────────────────────────────────
  function renderQueue() {
    const container = document.getElementById('player-queue');
    if (!container) return;

    if (queue.length === 0) {
      container.innerHTML = '<div class="queue-empty">Queue is empty. Browse artists to add tracks.</div>';
      return;
    }

    container.innerHTML = queue.map((track, i) => `
      <div class="queue-item ${i === currentIndex ? 'playing' : ''}" onclick="window.MBH_Player.playIndex(${i})">
        <span class="queue-num">${i + 1}</span>
        <div class="queue-info">
          <div class="queue-title">${track.title || 'Unknown'}</div>
          <div class="queue-artist">${track.artist || 'Unknown'}</div>
        </div>
        <button class="queue-remove" onclick="event.stopPropagation(); window.MBH_Player.removeFromQueue(${i})">✕</button>
      </div>
    `).join('');
  }

  // ── Progress bar click-to-seek ───────────────────────────────────────────
  function initProgressSeek() {
    const progressBar = document.getElementById('mbh-player-progress');
    if (!progressBar) return;

    progressBar.addEventListener('click', (e) => {
      if (!playerReady) return;
      const rect = progressBar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const duration = player.getDuration() || 0;
      seekTo(pct * duration);
    });
  }

  // ── Keyboard Shortcuts ───────────────────────────────────────────────────
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't capture if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'n':
        case 'N':
          playNext();
          break;
        case 'p':
        case 'P':
          playPrev();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(100, (player.getVolume() || 80) + 5));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, (player.getVolume() || 80) - 5));
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekTo((player.getCurrentTime() || 0) + 10);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekTo(Math.max(0, (player.getCurrentTime() || 0) - 10));
          break;
      }
    });
  }

  // ── Button Bindings ──────────────────────────────────────────────────────
  function initButtonBindings() {
    const playBtn = document.getElementById('btn-play');
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const volumeSlider = document.getElementById('mbh-volume');

    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (prevBtn) prevBtn.addEventListener('click', playPrev);
    if (nextBtn) nextBtn.addEventListener('click', playNext);
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => setVolume(parseInt(e.target.value)));
    }
  }

  // ── Public API ───────────────────────────────────────────────────────────
  window.MBH_Player = {
    init: function () {
      initPlayer();
      initButtonBindings();
      initProgressSeek();
      initKeyboardShortcuts();
      renderQueue();
    },
    play,
    pause,
    togglePlay,
    stop,
    seekTo,
    setVolume,
    addToQueue,
    removeFromQueue,
    clearQueue,
    playNext,
    playPrev,
    playIndex,
    getQueue: () => queue,
    getCurrentIndex: () => currentIndex,
    isReady: () => playerReady,
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.MBH_Player.init);
  } else {
    window.MBH_Player.init();
  }
})();
