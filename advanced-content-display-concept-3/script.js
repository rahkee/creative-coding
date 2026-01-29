// Advanced Content Display - Shared Script
// Handles font preview controls and common utilities

// ============================================
// H1 Word Wrapping (enables per-word color effects)
// ============================================
document.querySelectorAll('header h1').forEach(h1 => {
    const words = h1.textContent.split(' ');
    h1.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
});

// ============================================
// Font Preview Controls (font-preview.html)
// ============================================
const previewH1 = document.getElementById('preview-h1');

if (previewH1) {
    const buttons = document.querySelectorAll('.font-controls button');
    const sliders = document.querySelectorAll('.weight-slider');
    const stars = document.querySelectorAll('.favorite-star');
    const currentFontName = document.getElementById('current-font-name');

    // Wrap h1 words in spans for color styling
    const words = previewH1.textContent.split(' ');
    previewH1.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

    // Font names mapping (ordered by votes)
    const fontNames = {
        'font-nunito': 'Nunito',
        'font-asap': 'Asap',
        'font-fredoka': 'Fredoka',
        'font-vend-sans': 'Vend Sans',
        'font-radio-canada': 'Radio Canada Big',
        'font-bricolage': 'Bricolage Grotesque'
    };

    // Font button click handling
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove all font classes
            previewH1.classList.remove(...Object.keys(fontNames));
            
            // Add selected font class
            const fontClass = button.dataset.font;
            previewH1.classList.add(fontClass);
            
            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Apply font weight from this font's slider via CSS variable
            const slider = button.parentElement.querySelector('.weight-slider');
            previewH1.style.setProperty('--font-weight', slider.value);
            
            // Update current font display
            if (currentFontName) {
                currentFontName.textContent = fontNames[fontClass];
            }
        });
    });

    // Font weight slider handling
    sliders.forEach(slider => {
        slider.addEventListener('input', () => {
            const button = slider.parentElement.querySelector('button');
            const weightValue = button.querySelector('.weight-value');
            weightValue.textContent = slider.value;
            
            if (button.classList.contains('active')) {
                previewH1.style.setProperty('--font-weight', slider.value);
            }
        });
    });

    // Favorite star toggle
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

    // Hyper style toggle
    const hyperStyleToggle = document.getElementById('hyper-style-toggle');
    if (hyperStyleToggle) {
        hyperStyleToggle.addEventListener('change', () => {
            if (hyperStyleToggle.checked) {
                previewH1.classList.add('hyper-style');
            } else {
                previewH1.classList.remove('hyper-style');
            }
        });
    }
}
