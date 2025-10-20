// State management
const state = {
    topLeft: { type: 'round', size: 40 },
    topRight: { type: 'round', size: 40 },
    bottomRight: { type: 'round', size: 40 },
    bottomLeft: { type: 'round', size: 40 }
};

// DOM elements
const previewBox = document.getElementById('previewBox');
const cssCodeElement = document.getElementById('cssCode').querySelector('code');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');

// Corner controls
const corners = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];

// Initialize event listeners
function init() {
    corners.forEach(corner => {
        const typeSelect = document.getElementById(`${corner}Type`);
        const sizeSlider = document.getElementById(`${corner}Size`);

        // Type change
        typeSelect.addEventListener('change', (e) => {
            state[corner].type = e.target.value;
            updatePreview();
        });

        // Size change
        sizeSlider.addEventListener('input', (e) => {
            state[corner].size = e.target.value;
            updatePreview();
        });
    });

    // Reset button
    resetBtn.addEventListener('click', resetAll);

    // Copy button
    copyBtn.addEventListener('click', copyCSS);

    // Initial render
    updatePreview();
}

// Update preview and CSS output
function updatePreview() {
    const styles = generateStyles();
    
    // Apply styles to preview box
    Object.keys(styles).forEach(property => {
        previewBox.style.setProperty(property, styles[property]);
    });

    // Update corner value displays
    updateCornerDisplays();

    // Update CSS code display
    updateCSSOutput(styles);
}

// Update corner value displays
function updateCornerDisplays() {
    document.getElementById('topLeftDisplay').textContent = `${state.topLeft.size}px`;
    document.getElementById('topRightDisplay').textContent = `${state.topRight.size}px`;
    document.getElementById('bottomLeftDisplay').textContent = `${state.bottomLeft.size}px`;
    document.getElementById('bottomRightDisplay').textContent = `${state.bottomRight.size}px`;
}

// Generate CSS styles
function generateStyles() {
    const styles = {};
    
    // Border radius for each corner
    styles['border-start-start-radius'] = `${state.topLeft.size}px`;
    styles['border-start-end-radius'] = `${state.topRight.size}px`;
    styles['border-end-end-radius'] = `${state.bottomRight.size}px`;
    styles['border-end-start-radius'] = `${state.bottomLeft.size}px`;
    
    // Corner shape
    const cornerShapeValue = `${state.topLeft.type} ${state.topRight.type} ${state.bottomRight.type} ${state.bottomLeft.type}`;
    styles['corner-shape'] = cornerShapeValue;
    
    return styles;
}

// Update CSS code display
function updateCSSOutput(styles) {
    const cssText = `.element {\n${Object.entries(styles)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join('\n')}\n}`;
    
    cssCodeElement.textContent = cssText;
}

// Reset all controls to default
function resetAll() {
    corners.forEach(corner => {
        state[corner] = { type: 'round', size: 40 };
        
        document.getElementById(`${corner}Type`).value = 'round';
        document.getElementById(`${corner}Size`).value = 40;
    });
    
    updatePreview();
}

// Copy CSS to clipboard
async function copyCSS() {
    const cssText = cssCodeElement.textContent;
    
    try {
        await navigator.clipboard.writeText(cssText);
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy CSS:', err);
        alert('Failed to copy CSS. Please try again.');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

