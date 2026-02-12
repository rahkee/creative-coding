// Advanced Content Display - Shared Script

// ============================================
// H1 Word Wrapping (enables per-word color effects)
// ============================================
document.querySelectorAll('header h1').forEach(h1 => {
    const words = h1.textContent.split(' ');
    h1.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
});

// ============================================
// Blockquote Style Selector
// ============================================
const blockquoteContainers = document.querySelectorAll('div:has(blockquote)');
const styleButtons = document.querySelectorAll('.control-section button[data-style]');
const stars = document.querySelectorAll('.favorite-star');

// Style classes applied to the container div
const styleClasses = [
    'style-left-border',
    'style-biggie-quotes-sniglet',
    'style-biggie-quotes-original-surfer',
    'style-biggie-quotes-modak'
];

// Apply default style (Left Border) on page load
blockquoteContainers.forEach(container => {
    container.classList.add('style-left-border');
});

// Style button click handling
if (styleButtons.length > 0) {
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedStyle = button.dataset.style;
            
            // Remove all style classes from blockquote containers
            blockquoteContainers.forEach(container => {
                styleClasses.forEach(cls => container.classList.remove(cls));
                
                // Add selected style
                container.classList.add(selectedStyle);
            });
            
            // Update active button
            styleButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Favorite star toggle
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
// Table Style Selector
// ============================================
const tables = document.querySelectorAll('table');
const tableStyleButtons = document.querySelectorAll('.control-section button[data-table-style]');

// Table style classes
const tableStyleClasses = [
    'style-floating-header',
    'style-contained'
];

// Table style button click handling
if (tableStyleButtons.length > 0) {
    tableStyleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedStyle = button.dataset.tableStyle;
            
            // Remove all table style classes from tables
            tables.forEach(table => {
                tableStyleClasses.forEach(cls => table.classList.remove(cls));
                
                // Add selected style
                table.classList.add(selectedStyle);
            });
            
            // Update active button
            tableStyleButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// ============================================
// Image Style Selector
// ============================================
const figures = document.querySelectorAll('figure');
const imageStyleButtons = document.querySelectorAll('.control-section button[data-image-style]');

const imageStyleClasses = [
    'style-img-rounded',
    'style-img-rounded-border',
    'style-img-border-gradients',
    'style-img-contained'
];

figures.forEach(figure => {
    figure.classList.add('style-img-rounded');
});

// Gradient cycle (1→2→3, 3→4→5, 5→6→7) by image order, not div nth-of-type
const contentLayer = document.querySelector('.strongmind-content-layer');
if (contentLayer) {
    const figureWrappers = Array.from(contentLayer.children).filter(el => el.tagName === 'DIV' && el.querySelector('figure'));
    figureWrappers.forEach((div, index) => {
        div.classList.remove('gradient-set-1', 'gradient-set-2', 'gradient-set-3');
        div.classList.add('gradient-set-' + ((index % 3) + 1));
    });

    // Mark the first div that contains a ul so we can style it independently
    const firstUlContainer = Array.from(contentLayer.children).find(el => el.tagName === 'DIV' && el.querySelector('ul'));
    if (firstUlContainer) {
        firstUlContainer.classList.add('first-ul-container');
    }
}

// ============================================
// First UL Style Selector (first ul on page only)
// ============================================
const firstUlStyleButtons = document.querySelectorAll('.control-section button[data-first-ul-style]');
const firstUlStyleClasses = [
    'first-ul-style-bordered',
    'first-ul-style-cards',
    'first-ul-style-left-bar',
    'first-ul-style-minimal'
];

if (contentLayer && firstUlStyleButtons.length > 0) {
    firstUlStyleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedStyle = button.dataset.firstUlStyle;

            firstUlStyleClasses.forEach(cls => contentLayer.classList.remove(cls));
            contentLayer.classList.add(selectedStyle);

            firstUlStyleButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

if (imageStyleButtons.length > 0) {
    imageStyleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedStyle = button.dataset.imageStyle;

            figures.forEach(figure => {
                imageStyleClasses.forEach(cls => figure.classList.remove(cls));
                figure.classList.add(selectedStyle);
            });

            imageStyleButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
}
