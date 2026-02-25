// Advanced Content Display - Shared Script

// ============================================
// H1 Word Wrapping (enables per-word color effects)
// ============================================
document.querySelectorAll('header h1').forEach(h1 => {
    const words = h1.textContent.split(' ');
    h1.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
});

// ============================================
// Blockquote: Sniglet style (only option)
// ============================================
const blockquoteContainers = document.querySelectorAll('div:has(blockquote)');
blockquoteContainers.forEach(container => {
    container.classList.add('style-biggie-quotes-sniglet');
});

// Favorite star toggle (for control panel stars)
const stars = document.querySelectorAll('.favorite-star');
if (stars.length > 0) {
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const isFavorited = star.classList.contains('favorited');
            if (isFavorited) {
                star.classList.remove('favorited', 'fa-solid');
                star.classList.add('fa-regular');
            } else {
                star.classList.add('favorited', 'fa-solid');
                star.classList.remove('fa-regular');
            }
        });
    });
}

// ============================================
// Table: Contained style (only option)
// ============================================
const tables = document.querySelectorAll('table');
tables.forEach(table => {
    table.classList.add('style-contained');
});

// ============================================
// Image: Contained style (only option)
// ============================================
const figures = document.querySelectorAll('figure');
figures.forEach(figure => {
    figure.classList.add('style-img-contained');
});

// ============================================
// First UL: Minimal style — mark container and apply class
// ============================================
const contentLayer = document.querySelector('.strongmind-content-layer');
if (contentLayer) {
    contentLayer.classList.add('first-ul-style-minimal');

    const firstUlContainer = Array.from(contentLayer.children).find(el => el.tagName === 'DIV' && el.querySelector('ul'));
    if (firstUlContainer) {
        firstUlContainer.classList.add('first-ul-container');
    }
}
