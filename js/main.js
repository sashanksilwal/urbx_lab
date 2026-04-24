/**
 * main.js — Shared utilities for the URBX Lab website.
 *
 * This file is loaded on every page. It handles:
 *   1. Rendering the site-wide navigation header
 *   2. Rendering the site-wide footer
 *   3. Providing a fetchData() helper to load JSON data files
 *
 * The header and footer are injected into <header id="site-header">
 * and <footer id="site-footer"> elements present in each HTML page.
 */

/**
 * Renders the navigation header.
 * Highlights the current page's link based on the URL pathname.
 */
function renderHeader() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // Define all nav links — add new pages here
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
      <a href="index.html" class="nav-logo">URBX Lab</a>
      <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
      <ul class="nav-links">${navHTML}</ul>
    </div>
  `;

  // Mobile hamburger menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

/**
 * Renders the site footer with lab info and copyright.
 */
function renderFooter() {
  document.getElementById('site-footer').innerHTML = `
    <div class="container">
      <p>URBX Lab (Urban + X) &mdash; Department of Computer Science, Purdue University</p>
      <p style="margin-top:0.5rem;">&copy; ${new Date().getFullYear()} URBX Lab. All rights reserved.</p>
    </div>
  `;
}

/**
 * Fetches and parses a JSON file from the given path.
 * All data files live in the data/ folder (e.g., 'data/publications.json').
 *
 * @param {string} path — Relative path to the JSON file
 * @returns {Promise<any>} — Parsed JSON data
 * @throws {Error} if the fetch fails (e.g., 404)
 */
async function fetchData(path) {
  const resp = await fetch(path);
  if (!resp.ok) throw new Error(`Failed to load ${path}`);
  return resp.json();
}

// Initialize header and footer on every page load
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});
