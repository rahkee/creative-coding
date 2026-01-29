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
const blockquotes = document.querySelectorAll('blockquote');
const styleButtons = document.querySelectorAll('.blockquote-controls button');
const stars = document.querySelectorAll('.favorite-star');

// Style classes
const styleClasses = [
    'default',
    'style-left-border',
    'style-accent'
];

// Style button click handling
if (styleButtons.length > 0) {
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedStyle = button.dataset.style;
            
            // Remove all style classes from blockquotes
            blockquotes.forEach(bq => {
                styleClasses.forEach(cls => {
                    if (cls !== 'default') {
                        bq.classList.remove(cls);
                    }
                });
                
                // Add selected style (unless it's default)
                if (selectedStyle !== 'default') {
                    bq.classList.add(selectedStyle);
                }
            });
            
            // Update active button
            styleButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Hyper style toggle for H1
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
