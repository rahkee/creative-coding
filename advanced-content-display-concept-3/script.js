// Advanced Content Display - Shared Script

// ============================================
// H1 Word Wrapping (enables per-word color effects)
// ============================================
document.querySelectorAll('header h1').forEach(h1 => {
    const words = h1.textContent.split(' ');
    h1.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
});

// ============================================
// Hyper Style Toggle for H1
// ============================================
const hyperStyleToggle = document.getElementById('hyper-style-toggle');
const h1Element = document.querySelector('header h1');

if (hyperStyleToggle && h1Element) {
    hyperStyleToggle.addEventListener('change', () => {
        if (hyperStyleToggle.checked) {
            h1Element.classList.add('hyper-style');
        } else {
            h1Element.classList.remove('hyper-style');
        }
    });
}

// ============================================
// Blockquote Style Selector
// ============================================
const blockquoteContainers = document.querySelectorAll('div:has(blockquote)');
const styleButtons = document.querySelectorAll('.control-section button[data-style]');
const stars = document.querySelectorAll('.favorite-star');

// Style classes applied to the container div
const styleClasses = [
    'default',
    'style-left-border'
];

// Style button click handling
if (styleButtons.length > 0) {
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedStyle = button.dataset.style;
            
            // Remove all style classes from blockquote containers
            blockquoteContainers.forEach(container => {
                styleClasses.forEach(cls => {
                    if (cls !== 'default') {
                        container.classList.remove(cls);
                    }
                });
                
                // Add selected style (unless it's default)
                if (selectedStyle !== 'default') {
                    container.classList.add(selectedStyle);
                }
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
