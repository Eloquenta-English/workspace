/* Music By Humans — Featured Artist System */
/* Loads and displays featured artists with video, EPK, and links */

(function () {
  'use strict';

  let featuredArtists = [];
  let currentArtist = null;

  // ── Load featured artists data ───────────────────────────────────────────
  async function loadArtists() {
    try {
      const resp = await fetch('data/featured_artists.json');
      const data = await resp.json();
      featuredArtists = data.artists || [];
      if (featuredArtists.length > 0) {
        showArtist(featuredArtists[0]);
      }
    } catch (e) {
      console.warn('[MBH] Could not load featured artists:', e);
      // Show placeholder
      const hero = document.getElementById('featured-hero');
      if (hero) {
        hero.innerHTML = '<div class="featured-placeholder">🎵 No featured artist yet. Coming soon!</div>';
      }
    }
  }

  // ── Display an artist ────────────────────────────────────────────────────
  function showArtist(artist) {
    if (!artist) return;
    currentArtist = artist;

    const hero = document.getElementById('featured-hero');
    const info = document.getElementById('featured-info');
    const links = document.getElementById('featured-links');

    if (!hero || !info || !links) return;

    // Hero: YouTube embed or placeholder
    if (artist.video_id) {
      hero.innerHTML = `
        <div class="featured-video">
          <iframe
            src="https://www.youtube.com/embed/${artist.video_id}?rel=0&modestbranding=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="width:100%;height:100%;border:0;">
          </iframe>
        </div>
      `;
    } else {
      hero.innerHTML = `<div class="featured-placeholder">🎵 ${artist.name}</div>`;
    }

    // Info: name, genre, bio
    const genreBadges = (artist.genre || []).map(g =>
      `<span class="genre-badge">${g}</span>`
    ).join('');

    info.innerHTML = `
      <h2 class="featured-name">${artist.name}</h2>
      <div class="featured-genres">${genreBadges}</div>
      <p class="featured-bio">${artist.bio || ''}</p>
      ${artist.rights_confirmed ? '<span class="rights-badge">✓ Rights Confirmed</span>' : '<span class="rights-badge pending">⏳ Awaiting Confirmation</span>'}
    `;

    // Links: social, bandcamp, linktree, etc.
    const linkItems = [];
    if (artist.linktree) linkItems.push({ label: 'LinkTree', url: artist.linktree, icon: '🔗' });
    if (artist.bandcamp) linkItems.push({ label: 'Bandcamp', url: artist.bandcamp, icon: '🎸' });
    if (artist.youtube) linkItems.push({ label: 'YouTube', url: artist.youtube, icon: '📺' });
    if (artist.instagram) linkItems.push({ label: 'Instagram', url: artist.instagram, icon: '📷' });
    if (artist.spotify) linkItems.push({ label: 'Spotify', url: artist.spotify, icon: '🎧' });
    if (artist.soundcloud) linkItems.push({ label: 'SoundCloud', url: artist.soundcloud, icon: '☁️' });

    links.innerHTML = linkItems.map(l =>
      `<a href="${l.url}" target="_blank" rel="noopener" class="featured-link">${l.icon} ${l.label}</a>`
    ).join('');
  }

  // ── Load specific artist by ID (for easter egg) ──────────────────────────
  function loadArtistById(id) {
    const artist = featuredArtists.find(a => a.id === id);
    if (artist) {
      showArtist(artist);
    }
  }

  // ── Public API ───────────────────────────────────────────────────────────
  window.MBH_Featured = {
    load: loadArtists,
    show: showArtist,
    loadById: loadArtistById,
    getCurrent: () => currentArtist,
    getAll: () => featuredArtists,
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadArtists);
  } else {
    loadArtists();
  }
})();
