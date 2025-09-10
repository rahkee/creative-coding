// Course Header Gradients - Deterministic Conic Gradients with Seamless Transitions

// Predefined color palette for course headers
const COURSE_COLORS = [
    '#D14D42', '#BC5940', '#DF6133', '#E9A747', '#EAB845', 
    '#7BAD47', '#5DAA5B', '#76B9A0', '#74B8B9', '#6FB8BC', 
    '#4D88A3', '#517CB0', '#7D8FD5', '#9B7AC4', '#8D84CB', 
    '#BE6FBF', '#E07EB3', '#CC6071'
];

/**
 * Simple hash function to convert string to number
 * This ensures the same course ID always produces the same gradient
 */
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

/**
 * Seeded random number generator
 * Uses course ID hash as seed to ensure consistent results
 */
function seededRandom(seed, min = 0, max = 1) {
    const x = Math.sin(seed) * 10000;
    const random = x - Math.floor(x);
    return Math.floor(random * (max - min + 1)) + min;
}

/**
 * Generate course ID based on creation timestamp
 * Format: YYYYMMDDHHMMSSRANDOM (numerical only)
 */
function generateCourseId(creationDate = new Date()) {
    const year = creationDate.getFullYear();
    const month = String(creationDate.getMonth() + 1).padStart(2, '0');
    const day = String(creationDate.getDate()).padStart(2, '0');
    const hours = String(creationDate.getHours()).padStart(2, '0');
    const minutes = String(creationDate.getMinutes()).padStart(2, '0');
    const seconds = String(creationDate.getSeconds()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${year}${month}${day}${hours}${minutes}${seconds}${random}`;
}

/**
 * Calculate color distance (simplified RGB distance)
 * Converts hex to RGB and calculates Euclidean distance
 */
function getColorDistance(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    
    const rDiff = rgb1.r - rgb2.r;
    const gDiff = rgb1.g - rgb2.g;
    const bDiff = rgb1.b - rgb2.b;
    
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * Select colors ensuring minimum distance between them
 * This prevents invisible gradients from similar colors
 */
function selectDistinctColors(hash, colorCount) {
    const minDistance = 80; // Minimum color distance threshold
    const maxAttempts = 50; // Prevent infinite loops
    
    const selectedColors = [];
    let attempts = 0;
    
    // Select first color
    const firstColorIndex = seededRandom(hash, 0, COURSE_COLORS.length - 1);
    selectedColors.push(COURSE_COLORS[firstColorIndex]);
    
    // Select additional colors ensuring they're different enough
    for (let i = 1; i < colorCount; i++) {
        let colorIndex;
        let candidate;
        let isDistinct = false;
        attempts = 0;
        
        while (!isDistinct && attempts < maxAttempts) {
            colorIndex = seededRandom(hash + i + attempts * 10, 0, COURSE_COLORS.length - 1);
            candidate = COURSE_COLORS[colorIndex];
            
            // Check if this color is sufficiently different from all selected colors
            isDistinct = selectedColors.every(existingColor => 
                getColorDistance(candidate, existingColor) >= minDistance
            );
            
            attempts++;
        }
        
        // If we couldn't find a distinct color, use a fallback strategy
        if (!isDistinct) {
            // Use colors that are maximally spaced in the array
            const spacing = Math.floor(COURSE_COLORS.length / colorCount);
            colorIndex = (firstColorIndex + i * spacing) % COURSE_COLORS.length;
            candidate = COURSE_COLORS[colorIndex];
        }
        
        selectedColors.push(candidate);
    }
    
    return selectedColors;
}

/**
 * Generate deterministic conic gradient based on course ID
 * First and last colors are the same for seamless circular transition
 * Ensures colors are visually distinct for visible gradients
 */
function generateCourseGradient(courseId) {
    const hash = hashString(courseId);
    
    // Use different parts of the hash for different properties
    const startAngle = seededRandom(hash, 0, 360);
    const useThreeColors = seededRandom(hash + 100, 0, 1) === 1;
    
    // Select distinct colors
    const uniqueColorCount = useThreeColors ? 3 : 2;
    const distinctColors = selectDistinctColors(hash + 200, uniqueColorCount);
    
    let gradient;
    let colors;
    
    if (useThreeColors) {
        // 4-stop conic gradient: color1 -> color2 -> color3 -> color1 (seamless)
        const [color1, color2, color3] = distinctColors;
        gradient = `conic-gradient(from ${startAngle}deg, ${color1}, ${color2}, ${color3}, ${color1})`;
        colors = [color1, color2, color3, color1];
    } else {
        // 3-stop conic gradient: color1 -> color2 -> color1 (seamless)
        const [color1, color2] = distinctColors;
        gradient = `conic-gradient(from ${startAngle}deg, ${color1}, ${color2}, ${color1})`;
        colors = [color1, color2, color1];
    }
    
    return {
        gradient,
        type: 'conic',
        colors: colors,
        startAngle: startAngle,
        uniqueColors: distinctColors,
        colorDistances: distinctColors.length > 1 ? 
            distinctColors.slice(1).map(color => 
                Math.round(getColorDistance(distinctColors[0], color))
            ) : []
    };
}

/**
 * Apply gradient to course card based on its course-id attribute
 */
function applyCourseGradient(card) {
    const courseId = card.getAttribute('data-course-id');
    if (!courseId) {
        console.warn('Course card missing data-course-id attribute:', card);
        return;
    }
    
    const gradientData = generateCourseGradient(courseId);
    
    card.style.background = gradientData.gradient;
    card.style.transition = 'background 0.8s ease-in-out';
    
    // Optional: Store gradient info as data attributes for debugging
    card.setAttribute('data-gradient-type', gradientData.type);
    card.setAttribute('data-gradient-colors', gradientData.uniqueColors.join(','));
    card.setAttribute('data-start-angle', gradientData.startAngle);
    card.setAttribute('data-color-distances', gradientData.colorDistances.join(','));
}

/**
 * Initialize all course cards with gradients
 */
function initializeCourseCards() {
    const cards = document.querySelectorAll('.gradient-card');
    
    cards.forEach((card, index) => {
        // If card doesn't have a course ID, generate one based on different timestamps
        if (!card.getAttribute('data-course-id')) {
            // Simulate different course creation dates/times
            const baseDate = new Date('2024-01-01');
            const daysOffset = index * 45; // Each course created 45 days apart
            const hoursOffset = index * 4; // Different times of day
            const creationDate = new Date(baseDate.getTime() + (daysOffset * 24 * 60 * 60 * 1000) + (hoursOffset * 60 * 60 * 1000));
            
            const courseId = generateCourseId(creationDate);
            card.setAttribute('data-course-id', courseId);
        }
        
        applyCourseGradient(card);
    });
}

/**
 * Generate new course (for demonstration)
 */
function generateNewCourse() {
    const cards = document.querySelectorAll('.gradient-card');
    cards.forEach(card => {
        const newCourseId = generateCourseId(new Date());
        card.setAttribute('data-course-id', newCourseId);
        applyCourseGradient(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseCards();
});

// Expose functions for manual testing
window.generateNewCourse = generateNewCourse;
window.generateCourseId = generateCourseId;
window.generateCourseGradient = generateCourseGradient;
window.getColorDistance = getColorDistance;