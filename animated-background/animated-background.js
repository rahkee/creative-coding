document.addEventListener('DOMContentLoaded', () => {
    // Setup for original container
    const interBubble1 = document.querySelector('.container:not(.pastel) .interactive');
    const container1 = document.querySelector('.container:not(.pastel)');
    let curX1 = 0;
    let curY1 = 0;
    let tgX1 = 0;
    let tgY1 = 0;

    // Setup for pastel container
    const interBubble2 = document.querySelector('.container.pastel .interactive');
    const container2 = document.querySelector('.container.pastel');
    let curX2 = 0;
    let curY2 = 0;
    let tgX2 = 0;
    let tgY2 = 0;

    function move() {
        // Move bubble in first container
        curX1 += (tgX1 - curX1) / 20;
        curY1 += (tgY1 - curY1) / 20;
        interBubble1.style.transform = `translate(${Math.round(curX1)}px, ${Math.round(curY1)}px)`;

        // Move bubble in second container
        curX2 += (tgX2 - curX2) / 20;
        curY2 += (tgY2 - curY2) / 20;
        interBubble2.style.transform = `translate(${Math.round(curX2)}px, ${Math.round(curY2)}px)`;

        requestAnimationFrame(() => {
            move();
        });
    }

    // Mouse tracking for first container
    container1.addEventListener('mousemove', (event) => {
        const rect = container1.getBoundingClientRect();
        tgX1 = event.clientX - rect.left;
        tgY1 = event.clientY - rect.top;
    });

    // Mouse tracking for second container
    container2.addEventListener('mousemove', (event) => {
        const rect = container2.getBoundingClientRect();
        tgX2 = event.clientX - rect.left;
        tgY2 = event.clientY - rect.top;
    });

    move();
});
