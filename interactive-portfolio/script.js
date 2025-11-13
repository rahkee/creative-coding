// Interactive Portfolio - Game Interface
console.log('Interactive Portfolio loaded!');

// Initialize the interactive experience
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized');
    
    const main = document.querySelector('main');
    const layer1 = document.querySelector('.layer-1');
    
    function updateDimensions() {
        const width = main.offsetWidth;
        const height = main.offsetHeight;
        layer1.textContent = `Width: ${width}px | Height: ${height}px`;
    }
    
    // Update on load
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
});

