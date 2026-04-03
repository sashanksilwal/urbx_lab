/**
 * news.js — Renders the News & Awards page.
 *
 * Loads news from data/news.json and awards from data/awards.json,
 * merges them into a single chronological list (newest first),
 * and renders each as a card with date, title, type badge, and description.
 *
 * Awards are automatically tagged with type "award" when merged.
 * News items use the "type" field from their JSON entry (e.g., "publication",
 * "general", "award") which determines the badge color.
 *
 * To add news: add an entry to data/news.json
 * To add an award: add an entry to data/awards.json
 */
document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('news-root');

  try {
    // Load both data sources in parallel
    const [news, awards] = await Promise.all([
      fetchData('data/news.json'),
      fetchData('data/awards.json'),
    ]);

    // Merge awards into the news list, tagging them as type "award"
    const allItems = [
      ...news,
      ...awards.map(a => ({ ...a, type: 'award' })),
    ];

    // Sort by date, newest first
    allItems.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (allItems.length === 0) {
      root.innerHTML = '<p style="color:#666;">No news or awards yet.</p>';
      return;
    }

    // Render each item as a card with date, title + type badge, and description
    root.innerHTML = allItems.map(item => `
      <div class="news-item">
        <div class="news-date">${new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <h3>
          ${item.link ? `<a href="${item.link}">${item.title}</a>` : item.title}
          <span class="news-type-badge ${item.type || 'general'}">${item.type || 'general'}</span>
        </h3>
        ${item.description ? `<p>${item.description}</p>` : ''}
      </div>
    `).join('');
  } catch (e) {
    root.innerHTML = '<p>Failed to load news.</p>';
    console.error(e);
  }
});
