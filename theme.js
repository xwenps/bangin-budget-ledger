/**
 * theme.js — Light / Dark mode toggle
 * 
 * Usage in app.js:
 *   import { initTheme } from './theme.js';
 *   initTheme();   // call once on load
 *
 * Place a toggle button anywhere in your HTML:
 *   <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
 *     <!-- icon injected by JS -->
 *   </button>
 *
 * Add as many toggle buttons as you like (login card + app header):
 *   <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme"></button>
 */

const ICON_SUN  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
</svg>`;

const ICON_MOON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`;

function applyTheme(theme, buttons) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = theme === 'dark' ? ICON_SUN : ICON_MOON;
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  buttons.forEach(btn => {
    btn.innerHTML = icon;
    btn.setAttribute('aria-label', label);
  });
}

export function initTheme() {
  // Light is the default — only switch to dark if explicitly stored
  let current = 'light';

  const stored = sessionStorage.getItem('theme');
  if (stored) {
    current = stored;
  }
  // Note: we intentionally ignore prefers-color-scheme here
  // because the user requested light as default.

  const getButtons = () => document.querySelectorAll('[data-theme-toggle]');

  applyTheme(current, getButtons());

  // Delegate click on any [data-theme-toggle] button (works for
  // buttons added dynamically or in multiple places)
  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) {
      current = current === 'dark' ? 'light' : 'dark';
      sessionStorage.setItem('theme', current);
      applyTheme(current, getButtons());
    }
  });
}
