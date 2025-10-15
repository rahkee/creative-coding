// Interactive container width adjuster
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('container-width');
    const widthValue = document.getElementById('width-value');
    const resizableWrapper = document.getElementById('resizable-wrapper');

    // Update container width based on slider value
    function updateContainerWidth() {
        const width = slider.value;
        widthValue.textContent = width;
        resizableWrapper.style.width = `${width}%`;
    }

    // Initialize
    updateContainerWidth();

    // Add event listener for slider changes
    slider.addEventListener('input', updateContainerWidth);

    // Add viewport size indicator
    function showViewportSize() {
        const viewportWidth = window.innerWidth;
        console.log(`Viewport width: ${viewportWidth}px`);
    }

    // Log viewport size on resize
    window.addEventListener('resize', showViewportSize);
    showViewportSize();

    // Add visual feedback for container query breakpoints
    const cards = document.querySelectorAll('.card-container');
    
    // Optional: Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all demo containers
        const demoContainers = document.querySelectorAll('.demo-container, .use-case');
        demoContainers.forEach(container => {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(container);
        });
    }

    // Add browser support detection
    function checkContainerQuerySupport() {
        const supportsContainerQueries = 'container' in document.documentElement.style;
        
        if (!supportsContainerQueries) {
            const warning = document.createElement('div');
            warning.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #ff6b6b;
                color: white;
                padding: 1rem;
                text-align: center;
                z-index: 1000;
                font-weight: bold;
            `;
            warning.textContent = '⚠️ Your browser does not support Container Queries. Please use a modern browser (Chrome 105+, Safari 16+, Firefox 110+)';
            document.body.prepend(warning);
        } else {
            console.log('✅ Container Queries are supported!');
        }
    }

    checkContainerQuerySupport();

    // Add helpful tooltips showing current container sizes
    function addContainerSizeIndicators() {
        const containers = document.querySelectorAll('.container-query-parent');
        
        containers.forEach(container => {
            // Create size indicator
            const indicator = document.createElement('div');
            indicator.className = 'container-size-indicator';
            indicator.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: rgba(102, 126, 234, 0.9);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: bold;
                pointer-events: none;
                z-index: 10;
            `;
            
            // Make container relative for absolute positioning
            if (window.getComputedStyle(container).position === 'static') {
                container.style.position = 'relative';
            }
            
            container.appendChild(indicator);
            
            // Update size on resize
            const updateSize = () => {
                const width = container.offsetWidth;
                indicator.textContent = `${width}px`;
            };
            
            updateSize();
            
            // Use ResizeObserver if available
            if ('ResizeObserver' in window) {
                const resizeObserver = new ResizeObserver(updateSize);
                resizeObserver.observe(container);
            } else {
                window.addEventListener('resize', updateSize);
            }
        });
    }

    addContainerSizeIndicators();

    // Add smooth scrolling for anchor links (if any are added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard accessibility for slider
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            updateContainerWidth();
        }
    });

    // Log helpful debugging information
    console.log('%c🎨 Media Queries vs Container Queries Demo', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cOpen DevTools and resize the window to see the differences!', 'color: #764ba2;');
    console.log('%cTry the interactive slider to see container queries in action.', 'color: #667eea;');
});

