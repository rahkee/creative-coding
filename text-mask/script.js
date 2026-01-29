const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const text = document.querySelector('.masked-text');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Define the four circles in draw order (largest/back to smallest/front)
// Each circle has its own movement parameters for independent motion
const circles = [
    { 
        color: '#7B2D8E', 
        sizeMultiplier: 1.0,
        angle: 0,
        speed: 0.0003,
        waveSpeedX: 0.0002,
        waveSpeedY: 0.00015,
        waveAmplitudeX: 80,
        waveAmplitudeY: 40,
        direction: 1
    },    // Purple - largest (back)
    { 
        color: '#FF69B4', 
        sizeMultiplier: 0.75,
        angle: Math.PI * 0.5,
        speed: 0.0004,
        waveSpeedX: 0.00025,
        waveSpeedY: 0.0002,
        waveAmplitudeX: 100,
        waveAmplitudeY: 50,
        direction: -1
    },   // Pink - 3rd largest (opposite direction)
    { 
        color: '#00B4A6', 
        sizeMultiplier: 0.65,
        angle: Math.PI,
        speed: 0.00035,
        waveSpeedX: 0.0003,
        waveSpeedY: 0.00018,
        waveAmplitudeX: 120,
        waveAmplitudeY: 60,
        direction: 1
    },    // Teal - 2nd largest (different phase)
    { 
        color: '#87CEEB', 
        sizeMultiplier: 0.45,
        angle: Math.PI * 1.5,
        speed: 0.00045,
        waveSpeedX: 0.00035,
        waveSpeedY: 0.00025,
        waveAmplitudeX: 90,
        waveAmplitudeY: 45,
        direction: -1
    }    // Sky blue - smallest (front)
];

function getBaseRadius() {
    return Math.max(canvas.width, canvas.height) * 0.5;
}

function getOrbitRadius() {
    return Math.min(canvas.width, canvas.height) * 0.1;
}

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Animation loop
function animate(time) {
    // Clear canvas with yellow background
    ctx.fillStyle = '#F7C548';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const baseRadius = getBaseRadius();
    const orbitRadius = getOrbitRadius();
    
    // Base position: circles positioned above so we see the bottom portions
    const baseY = -baseRadius * 0.05;
    
    // Draw circles from largest (back) to smallest (front)
    // Each circle moves independently
    circles.forEach(circle => {
        const radius = baseRadius * circle.sizeMultiplier;
        
        // Update this circle's angle
        circle.angle += circle.speed * circle.direction;
        
        // Calculate independent wave motion for this circle
        const waveX = Math.sin(time * circle.waveSpeedX * circle.direction) * circle.waveAmplitudeX;
        const waveY = Math.cos(time * circle.waveSpeedY) * circle.waveAmplitudeY;
        
        // Calculate position for this circle
        const x = centerX + Math.cos(circle.angle) * orbitRadius + waveX;
        const y = baseY + Math.sin(circle.angle) * orbitRadius * 0.5 + waveY;
        
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Update text background to use canvas as source
    text.style.backgroundImage = `url(${canvas.toDataURL()})`;
    
    requestAnimationFrame(animate);
}

// Start animation
animate(0);
