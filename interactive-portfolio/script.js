document.addEventListener('DOMContentLoaded', () => {
    const x = document.querySelector('.x');
    const xDecimal = document.querySelector('.x-decimal');
    const y = document.querySelector('.y');
    const yDecimal = document.querySelector('.y-decimal');
    const year = document.querySelector('.year');
    const month = document.querySelector('.month');
    const day = document.querySelector('.day');
    const hour = document.querySelector('.hour');
    const minute = document.querySelector('.minute');
    const second = document.querySelector('.second');
    const millisecond = document.querySelector('.millisecond');
    
    function updateMousePosition(e) {
        const xValue = e.clientX;
        const yValue = e.clientY;
        
        // Calculate decimal portion based on position relative to viewport
        // Since clientX/clientY are integers, we calculate a decimal value
        const xDecimalValue = Math.floor((xValue / window.innerWidth) * 100) % 100;
        const yDecimalValue = Math.floor((yValue / window.innerHeight) * 100) % 100;
        
        x.textContent = String(Math.floor(xValue)).padStart(4, '0');
        xDecimal.textContent = String(xDecimalValue).padStart(2, '0');
        y.textContent = String(Math.floor(yValue)).padStart(4, '0');
        yDecimal.textContent = String(yDecimalValue).padStart(2, '0');
    }
    
    function updateTime() {
        const now = new Date();
        year.textContent = String(now.getFullYear());
        month.textContent = String(now.getMonth() + 1).padStart(2, '0');
        day.textContent = String(now.getDate()).padStart(2, '0');
        hour.textContent = String(now.getHours()).padStart(2, '0');
        minute.textContent = String(now.getMinutes()).padStart(2, '0');
        second.textContent = String(now.getSeconds()).padStart(2, '0');
        millisecond.textContent = String(now.getMilliseconds()).padStart(3, '0');
    }
    
    updateTime();
    setInterval(updateTime, 1);
    window.addEventListener('mousemove', updateMousePosition);
});

