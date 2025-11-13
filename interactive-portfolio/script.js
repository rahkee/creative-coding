document.addEventListener('DOMContentLoaded', () => {
    const year = document.querySelector('.year');
    const month = document.querySelector('.month');
    const day = document.querySelector('.day');
    const hour = document.querySelector('.hour');
    const minute = document.querySelector('.minute');
    const second = document.querySelector('.second');
    const millisecond = document.querySelector('.millisecond');
    
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
});

