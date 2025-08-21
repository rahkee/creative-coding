// Dynamic Cards JavaScript - Interactive Padding Slider

document.addEventListener('DOMContentLoaded', function() {
    // Create and insert the slider UI
    createSliderUI();
    
    // Initialize the slider functionality
    initializePaddingSlider();
});

function createSliderUI() {
    // Create the slider container
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    sliderContainer.innerHTML = `
        <div class="slider-controls">
            <label for="paddingSlider" class="slider-label">
                Padding: <span id="paddingValue">32px</span>
            </label>
            <input 
                type="range" 
                id="paddingSlider" 
                class="padding-slider"
                min="12" 
                max="48" 
                value="32" 
                step="1"
            >
            <div class="slider-range">
                <span>12px</span>
                <span>48px</span>
            </div>
        </div>
    `;
    
    // Insert the slider at the top of the container
    const container = document.querySelector('.container') || document.body;
    const firstChild = container.firstElementChild;
    container.insertBefore(sliderContainer, firstChild);
}

function initializePaddingSlider() {
    const slider = document.getElementById('paddingSlider');
    const paddingValue = document.getElementById('paddingValue');
    
    if (!slider || !paddingValue) {
        console.error('Slider elements not found');
        return;
    }
    
    // Update padding when slider changes
    slider.addEventListener('input', function() {
        const newPadding = this.value;
        updatePadding(newPadding);
        paddingValue.textContent = `${newPadding}px`;
    });
    
    // Initialize with current value
    updatePadding(slider.value);
}

function updatePadding(paddingValue) {
    // Update the CSS custom property on the root element
    document.documentElement.style.setProperty('--global-padding', `${paddingValue}px`);
    
    // Update all sm-card elements
    const smCards = document.querySelectorAll('.sm-card');
    smCards.forEach(card => {
        card.style.setProperty('--padding', `${paddingValue}px`);
    });
    
    // Update the description text
    updateDescriptionText(paddingValue);
    
    // Update card content text
    updateCardContentText(paddingValue);
}

function updateDescriptionText(paddingValue) {
    const description = document.querySelector('.container > p');
    if (description) {
        description.textContent = `Each nested sm-card has border-radius = padding × scale-factor (${paddingValue}px padding with decreasing scale factors)`;
    }
}

function updateCardContentText(paddingValue) {
    const cards = [
        { selector: '.sm-card:not(.sm-card .sm-card)', level: 1, factor: 1 },
        { selector: '.sm-card .sm-card:not(.sm-card .sm-card .sm-card)', level: 2, factor: 0.5 },
        { selector: '.sm-card .sm-card .sm-card:not(.sm-card .sm-card .sm-card .sm-card)', level: 3, factor: 0.25 },
        { selector: '.sm-card .sm-card .sm-card .sm-card:not(.sm-card .sm-card .sm-card .sm-card .sm-card)', level: 4, factor: 0.125 },
        { selector: '.sm-card .sm-card .sm-card .sm-card .sm-card', level: 5, factor: 0.0625 }
    ];
    
    cards.forEach(cardInfo => {
        const cardElements = document.querySelectorAll(cardInfo.selector);
        const borderRadius = Math.round(paddingValue * cardInfo.factor * 100) / 100;
        
        cardElements.forEach(card => {
            const paragraph = card.querySelector('p');
            if (paragraph && paragraph.textContent.includes('border-radius')) {
                if (cardInfo.level === 1) {
                    paragraph.textContent = `Base card: ${paddingValue}px × ${cardInfo.factor} = ${borderRadius}px border-radius, ${paddingValue}px padding`;
                } else {
                    const levelNames = ['', '', 'Nested', 'Double nested', 'Triple nested', 'Quad nested'];
                    paragraph.textContent = `${levelNames[cardInfo.level]} card: ${paddingValue}px × ${cardInfo.factor} = ${borderRadius}px border-radius, ${paddingValue}px padding`;
                }
            }
        });
    });
    
    // Update comparison grid cards
    updateComparisonGridText(paddingValue);
}

function updateComparisonGridText(paddingValue) {
    const comparisonCards = document.querySelectorAll('.comparison-grid .sm-card');
    const factors = [1, 0.5, 0.25, 0.125];
    
    comparisonCards.forEach((card, index) => {
        if (index < factors.length) {
            const paragraph = card.querySelector('p');
            if (paragraph) {
                const borderRadius = Math.round(paddingValue * factors[index] * 100) / 100;
                paragraph.textContent = `${borderRadius}px radius & ${paddingValue}px padding`;
            }
        }
    });
}

// Add CSS styles for the slider
function addSliderStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .slider-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .slider-controls {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
        }
        
        .slider-label {
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        #paddingValue {
            color: #FFD700;
            font-weight: bold;
        }
        
        .padding-slider {
            width: 300px;
            height: 6px;
            border-radius: 3px;
            background: rgba(255, 255, 255, 0.3);
            outline: none;
            -webkit-appearance: none;
        }
        
        .padding-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #FFD700;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            transition: all 0.2s ease;
        }
        
        .padding-slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        }
        
        .padding-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #FFD700;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider-range {
            display: flex;
            justify-content: space-between;
            width: 300px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .padding-slider,
            .slider-range {
                width: 250px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize styles when DOM is loaded
document.addEventListener('DOMContentLoaded', addSliderStyles);
