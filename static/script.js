// Theme toggle
(function() {
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    // Update floating toggle icon
    const floatBtn = document.getElementById('themeToggleFloat');
    if (floatBtn) {
      floatBtn.innerHTML = next === 'dark' ? '<span>☀️</span>' : '<span>🌙</span>';
    }
  }

  // Sidebar toggle
  const sidebarToggle = document.getElementById('themeToggleSidebar');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleTheme);
  }

  // Floating toggle
  const floatToggle = document.getElementById('themeToggleFloat');
  if (floatToggle) {
    floatToggle.addEventListener('click', toggleTheme);
  }

  // Apply saved theme
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    if (floatToggle) {
      floatToggle.innerHTML = saved === 'dark' ? '<span>☀️</span>' : '<span>🌙</span>';
    }
  }
})();

// Sidebar hamburger
(function() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!hamburger || !sidebar || !overlay) return;

  function open() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', open);
  overlay.addEventListener('click', close);
})();
