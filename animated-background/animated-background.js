document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    const container = document.querySelector('.container');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        tgX = event.clientX - rect.left;
        tgY = event.clientY - rect.top;
    });

    move();
});
