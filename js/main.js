// ===========================
//  MAIN.JS — Portfolio Logic
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- Populate from data.js ---
  setupFromData();

  // --- Nav scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.innerHTML = open ? '✕' : '&#9776;';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.innerHTML = '&#9776;';
    });
  });

  // --- Typed text effect ---
  const typed = document.getElementById('hero-typed');
  const roles = PORTFOLIO_DATA.roles;
  let ri = 0, ci = 0, deleting = false;
  function typeLoop() {
    const word = roles[ri];
    typed.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length)      { deleting = true; setTimeout(typeLoop, 1500); return; }
    if (deleting && ci < 0)                 { deleting = false; ri = (ri + 1) % roles.length; }
    setTimeout(typeLoop, deleting ? 60 : 100);
  }
  typeLoop();

  // --- Reveal on scroll ---
  const reveals = document.querySelectorAll('.section, .project-card, .skill-card, .about-grid, .edu-card, .graphic-card');
  reveals.forEach(el => el.classList.add('reveal'));
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObs.observe(el));

  // --- Animate stats counter ---
  const statNums = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { e.target.textContent = target; clearInterval(timer); }
          else { e.target.textContent = count; }
        }, 40);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObs.observe(el));

  // --- Animate skill bars ---
  const skillBars = document.querySelectorAll('.skill-bar');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.level + '%';
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(el => barObs.observe(el));

  // --- Contact form ---
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    if (!name || !email || !subject || !message) {
      status.textContent = 'Please fill in all fields.';
      status.className   = 'form-status error';
      return;
    }
    const mailtoLink = `mailto:${PORTFOLIO_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.location.href = mailtoLink;
    status.textContent = '✓ Opening your email client...';
    status.className   = 'form-status success';
    form.reset();
  });

  // --- Footer year ---
  document.getElementById('year').textContent = new Date().getFullYear();
});

// ===========================
//  SETUP FROM data.js
// ===========================
function setupFromData() {
  const d = PORTFOLIO_DATA;

  // Social links
  document.getElementById('link-github').href   = d.github;
  document.getElementById('link-linkedin').href = d.linkedin;
  document.getElementById('link-email').href    = `mailto:${d.email}`;

  // Stats
  const nums = document.querySelectorAll('.stat-num');
  const vals = [d.stats.projects, d.stats.experience, d.stats.clients];
  nums.forEach((el, i) => { if (vals[i] !== undefined) el.dataset.target = vals[i]; });

  // Profile picture — right side of about card
  const avatarWrapper = document.getElementById('avatar-wrapper');
  if (d.profilePic && d.profilePic.trim() !== '') {
    avatarWrapper.innerHTML = `
      <img src="${d.profilePic}" alt="${d.name}" class="avatar-img" />
      <div class="avatar-badge"></div>
    `;
    // Add name below photo
    const nameEl = document.getElementById('avatar-name');
    if (nameEl) nameEl.textContent = d.name;
  } else {
    // Keep initials with badge
    avatarWrapper.innerHTML = `
      <div class="avatar-placeholder">DS</div>
      <div class="avatar-badge"></div>
    `;
  }

  // Skills
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = '';
  d.skills.forEach(s => {
    skillsGrid.innerHTML += `
      <div class="skill-card reveal">
        <div class="skill-icon">${s.icon}</div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-bar-bg">
          <div class="skill-bar" data-level="${s.level}"></div>
        </div>
      </div>`;
  });

  // Education
  const eduTimeline = document.getElementById('education-timeline');
  if (eduTimeline && d.education) {
    eduTimeline.innerHTML = '';
    d.education.forEach(e => {
      eduTimeline.innerHTML += `
        <div class="edu-card reveal">
          <div class="edu-header">
            <div class="edu-icon">${e.icon}</div>
            <div class="edu-info">
              <div class="edu-degree">${e.degree}</div>
              <div class="edu-institution">${e.institution}</div>
            </div>
            <div class="edu-period">${e.period}</div>
          </div>
          <div class="edu-desc">${e.description}</div>
        </div>`;
    });
  }

  // Graphic Work
  const graphicGrid = document.getElementById('graphic-grid');
  if (graphicGrid && d.graphicWork) {
    graphicGrid.innerHTML = '';
    d.graphicWork.forEach(g => {
      const tags = g.tags.map(t => `<span class="graphic-tag">${t}</span>`).join('');
      graphicGrid.innerHTML += `
        <div class="graphic-card reveal">
          <div class="graphic-thumb" style="background:${g.color}">
            <span class="graphic-type">${g.type}</span>
            ${g.emoji}
          </div>
          <div class="graphic-body">
            <div class="graphic-title">${g.title}</div>
            <div class="graphic-desc">${g.description}</div>
            <div class="graphic-tags">${tags}</div>
          </div>
        </div>`;
    });
  }

  // Projects
  const projectsGrid = document.getElementById('projects-grid');
  projectsGrid.innerHTML = '';
  d.projects.forEach(p => {
    const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    projectsGrid.innerHTML += `
      <div class="project-card reveal">
        <div class="project-thumb" style="background:${p.color}">${p.emoji}</div>
        <div class="project-body">
          <div class="project-tags">${tags}</div>
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.description}</div>
          <div class="project-links">
            <a href="${p.demo}" target="_blank">Live Demo ↗</a>
            <a href="${p.code}" target="_blank">Source Code</a>
          </div>
        </div>
      </div>`;
  });
}
