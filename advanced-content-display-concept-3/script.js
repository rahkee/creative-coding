// Advanced Content Display - Shared Script

// H1 Word Wrapping (enables per-word color effects)
document.querySelectorAll('header h1').forEach(h1 => {
    const words = h1.textContent.split(' ');
    h1.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
});
