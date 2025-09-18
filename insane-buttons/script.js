// Real-time date and time display
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.querySelector('[data-layer-name="date-time"] .date');
    const timeElement = document.querySelector('[data-layer-name="date-time"] .time');
    
    function updateDateTime() {
        const now = new Date();
        
        // Format date (e.g., "Sep 18, 2025")
        const dateOptions = { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        
        // Format time with seconds and milliseconds (e.g., "14:30:25.123")
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        
        const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        
        // Update the DOM elements
        dateElement.textContent = formattedDate;
        timeElement.textContent = formattedTime;
    }
    
    // Update immediately
    updateDateTime();
    
    // Update every 10 milliseconds for smooth millisecond counting
    setInterval(updateDateTime, 10);
});
