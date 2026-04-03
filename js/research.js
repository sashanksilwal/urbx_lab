document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('research-root');
  try {
    const projects = await fetchData('data/projects.json');

    root.innerHTML = projects.map(p => `
      <div class="card">
        ${p.image
          ? `<img class="card-img" src="${p.image}" alt="${p.title}" onerror="this.style.display='none'">`
          : '<div class="card-img" style="background:#e9ecef;display:flex;align-items:center;justify-content:center;color:#adb5bd;font-size:2rem;">&#9635;</div>'}
        <div class="card-body">
          <h3>${p.link ? `<a href="${p.link}">${p.title}</a>` : p.title}</h3>
          <p>${p.description}</p>
          ${p.tags ? `<div style="margin-top:0.75rem;">${p.tags.map(t => `<span style="display:inline-block;font-size:0.7rem;padding:0.15rem 0.5rem;background:#e9ecef;border-radius:10px;margin-right:0.25rem;color:#666;">${t}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    `).join('');
  } catch (e) {
    root.innerHTML = '<p>Failed to load research projects.</p>';
    console.error(e);
  }
});
