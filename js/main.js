/* ============================================
   UVC Lab — Shared: Header, Footer, Utilities
   ============================================ */

function renderHeader() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'research.html', label: 'Research' },
    { href: 'people.html', label: 'People' },
    { href: 'publications.html', label: 'Publications' },
    { href: 'news.html', label: 'News' },
  ];

  const navHTML = links.map(l => {
    const active = page === l.href ? ' class="active"' : '';
    return `<li><a href="${l.href}"${active}>${l.label}</a></li>`;
  }).join('');

  document.getElementById('site-header').innerHTML = `
    <div class="nav-container">
      <a href="index.html" class="nav-logo">UVC Lab</a>
      <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
      <ul class="nav-links">${navHTML}</ul>
    </div>
  `;

  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

function renderFooter() {
  document.getElementById('site-footer').innerHTML = `
    <div class="container">
      <p>Urban Visual Computing Lab (UVC Lab) &mdash; Department of Computer Science, Purdue University</p>
      <p style="margin-top:0.5rem;">&copy; ${new Date().getFullYear()} UVC Lab. All rights reserved.</p>
    </div>
  `;
}

// Fetch JSON helper
async function fetchData(path) {
  const resp = await fetch(path);
  if (!resp.ok) throw new Error(`Failed to load ${path}`);
  return resp.json();
}

// Render on load
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});
