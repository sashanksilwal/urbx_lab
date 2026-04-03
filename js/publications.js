document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('pubs-root');
  const paginationEl = document.getElementById('pagination');
  const searchInput = document.getElementById('pub-search');
  const fieldSelect = document.getElementById('pub-field');
  const matchCount = document.getElementById('match-count');

  const PER_PAGE = 25;
  let allPubs = [];
  let filtered = [];
  let currentPage = 1;

  try {
    allPubs = await fetchData('data/publications.json');
    allPubs.sort((a, b) => b.year - a.year);
    filtered = [...allPubs];
    render();
  } catch (e) {
    root.innerHTML = '<p>Failed to load publications.</p>';
    console.error(e);
    return;
  }

  // Check URL params for initial search
  const params = new URLSearchParams(window.location.search);
  if (params.get('q') || params.get('search')) {
    searchInput.value = params.get('q') || params.get('search');
    applyFilter();
  }

  searchInput.addEventListener('input', () => { currentPage = 1; applyFilter(); });
  fieldSelect.addEventListener('change', () => { currentPage = 1; applyFilter(); });

  function applyFilter() {
    const query = searchInput.value.trim().toLowerCase();
    const field = fieldSelect.value;

    if (!query) {
      filtered = [...allPubs];
    } else {
      filtered = allPubs.filter(p => {
        const val = (p[field] || '').toLowerCase();
        return val.includes(query);
      });
    }
    render();
  }

  function render() {
    matchCount.textContent = `Matched ${filtered.length} of ${allPubs.length} publications`;

    // Paginate
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const start = (currentPage - 1) * PER_PAGE;
    const pagePubs = filtered.slice(start, start + PER_PAGE);

    // Group by year
    const byYear = {};
    for (const p of pagePubs) {
      if (!byYear[p.year]) byYear[p.year] = [];
      byYear[p.year].push(p);
    }

    const years = Object.keys(byYear).sort((a, b) => b - a);

    let html = '';
    for (const year of years) {
      html += `<div class="pub-year-group"><h2>${year}</h2>`;
      for (const p of byYear[year]) {
        html += renderPubCard(p);
      }
      html += '</div>';
    }

    root.innerHTML = html || '<p style="color:#666;">No publications found.</p>';

    // Pagination
    if (totalPages > 1) {
      paginationEl.innerHTML = `
        <button ${currentPage <= 1 ? 'disabled' : ''} onclick="window.__pubPageNav(${currentPage - 1})">&laquo; Prev</button>
        <span class="page-info">Page ${currentPage} of ${totalPages}</span>
        <button ${currentPage >= totalPages ? 'disabled' : ''} onclick="window.__pubPageNav(${currentPage + 1})">Next &raquo;</button>
      `;
    } else {
      paginationEl.innerHTML = '';
    }

    // Attach bibtex toggle handlers
    document.querySelectorAll('.bibtex-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.dataset.slug;
        const block = document.getElementById('bibtex-' + slug);
        if (block) block.classList.toggle('visible');
      });
    });
  }

  window.__pubPageNav = function(page) {
    currentPage = page;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function renderPubCard(p) {
    const thumb = p.thumbnail
      ? `<img class="pub-thumb" src="${p.thumbnail}" alt="" onerror="this.style.display='none'">`
      : `<div class="pub-thumb" style="display:flex;align-items:center;justify-content:center;background:#e9ecef;color:#adb5bd;font-size:1.5rem;">&#128196;</div>`;

    const citation = `${p.authors} (${p.year}). ${p.title}. <em>${p.venue}</em>${p.venueDetails ? ', ' + p.venueDetails : ''}.${p.doi ? ' ' + p.doi : ''}`;

    return `
      <div class="pub-card">
        ${thumb}
        <div class="pub-info">
          <h3><a href="publication.html?id=${p.slug}">${p.title}</a></h3>
          <p class="pub-citation">${citation}</p>
          <div class="pub-buttons">
            ${p.bibtex ? `<button class="pub-btn bibtex-toggle" data-slug="${p.slug}">BibTeX</button>` : ''}
            ${p.doi ? `<a class="pub-btn" href="${p.doi}" target="_blank">DOI</a>` : ''}
            ${p.pdf ? `<a class="pub-btn" href="${p.pdf}" target="_blank">PDF</a>` : ''}
            ${p.video ? `<a class="pub-btn" href="${p.video}" target="_blank">Video</a>` : ''}
            ${p.code ? `<a class="pub-btn" href="${p.code}" target="_blank">Code</a>` : ''}
          </div>
          ${p.bibtex ? `<div class="pub-detail"><div class="bibtex-block" id="bibtex-${p.slug}"><pre>${escapeHtml(p.bibtex)}</pre><button onclick="navigator.clipboard.writeText(\`${p.bibtex.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`);this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',2000)">Copy</button></div></div>` : ''}
        </div>
      </div>
    `;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});
