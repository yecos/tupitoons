// Static storefront: one automatic page_view per document load.
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-C94DMDNF0V', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});

// Anchors and dialogs are interactions within this page, not virtual routes.
// Use a fixed allowlist so customer-entered values never become event parameters.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const section = link.getAttribute('href').slice(1);
  if (!['top', 'shop', 'prints', 'story', 'collections', 'size-guide',
    'shipping', 'returns', 'privacy', 'terms'].includes(section)) return;
  gtag('event', 'section_navigation', { section_id: section });
});
