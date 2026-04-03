document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('news-root');

  try {
    const [news, awards] = await Promise.all([
      fetchData('data/news.json'),
      fetchData('data/awards.json'),
    ]);

    // Merge awards into news format
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
