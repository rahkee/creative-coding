// Interactive toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle toggle button clicks
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const layout = button.dataset.layout;
            const demo = button.dataset.demo;
            const demoElement = document.getElementById(`${demo}-demo`);
            
            // Update active state for buttons in the same group
            const siblingButtons = button.parentElement.querySelectorAll('.toggle-btn');
            siblingButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update layout
            demoElement.setAttribute('data-layout', layout);
            
            // Add animation effect
            demoElement.style.opacity = '0.5';
            setTimeout(() => {
                demoElement.style.opacity = '1';
            }, 150);
        });
    });
    
    // Handle item count slider
    const itemCountSlider = document.getElementById('item-count');
    const itemCountValue = document.getElementById('item-count-value');
    const playgroundDemo = document.getElementById('playground-demo');
    
    function updateItemCount() {
        const count = parseInt(itemCountSlider.value);
        itemCountValue.textContent = count;
        
        // Clear existing items
        playgroundDemo.innerHTML = '';
        
        // Add new items
        for (let i = 1; i <= count; i++) {
            const item = document.createElement('div');
            item.className = 'demo-item';
            item.textContent = i;
            playgroundDemo.appendChild(item);
        }
    }
    
    itemCountSlider.addEventListener('input', updateItemCount);
    
    // Initialize
    updateItemCount();
    
    // Add scroll animations
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

        const demoContainers = document.querySelectorAll('.demo-container, .architecture-section');
        demoContainers.forEach(container => {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(container);
        });
    }
    
    // Log helpful debugging information
    console.log('%c🎨 Flexbox vs Grid Demo', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cToggle between layouts to see the differences!', 'color: #764ba2;');
    console.log('%cFlexbox = One-dimensional (row or column)', 'color: #667eea;');
    console.log('%cGrid = Two-dimensional (rows and columns)', 'color: #764ba2;');
    
    // Add keyboard accessibility for buttons
    toggleButtons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Add smooth transitions for layout changes
    const allDemos = document.querySelectorAll('.layout-demo');
    allDemos.forEach(demo => {
        demo.style.transition = 'all 0.3s ease';
    });
});

