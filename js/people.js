document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('people-root');
  try {
    const people = await fetchData('data/people.json');

    const categories = [
      { key: 'faculty', label: 'Faculty' },
      { key: 'phd', label: 'PhD Students' },
      { key: 'ms', label: 'MS Students' },
      { key: 'undergrad', label: 'Undergraduate Researchers' },
      { key: 'alumni', label: 'Alumni & Past Members' },
    ];

    let html = '';
    for (const cat of categories) {
      const members = people.filter(p => p.category === cat.key);
      if (members.length === 0) continue;

      html += `<div class="people-section"><h2>${cat.label}</h2><div class="people-grid">`;
      for (const m of members) {
        const links = [];
        if (m.website) links.push(`<a href="${m.website}" target="_blank">Website</a>`);
        if (m.scholar) links.push(`<a href="${m.scholar}" target="_blank">Scholar</a>`);
        if (m.github) links.push(`<a href="${m.github}" target="_blank">GitHub</a>`);

        html += `
          <div class="person-card">
            <img class="person-photo" src="${m.photo}" alt="${m.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 120%22><rect fill=%22%23e9ecef%22 width=%22120%22 height=%22120%22/><text fill=%22%23adb5bd%22 font-size=%2240%22 x=%2250%25%22 y=%2255%25%22 text-anchor=%22middle%22>&#128100;</text></svg>'">
            <h3>${m.website ? `<a href="${m.website}" target="_blank">${m.name}</a>` : m.name}</h3>
            <div class="role">${m.role}</div>
            ${m.bio ? `<div class="bio">${m.bio}</div>` : ''}
            ${links.length > 0 ? `<div class="person-links">${links.join('')}</div>` : ''}
          </div>
        `;
      }
      html += '</div></div>';
    }

    root.innerHTML = html;
  } catch (e) {
    root.innerHTML = '<p>Failed to load people data.</p>';
    console.error(e);
  }
});
