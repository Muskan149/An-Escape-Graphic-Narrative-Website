let currentPage = 0;
const gallery = document.querySelector('.gallery');
const totalPages = document.querySelectorAll('.page').length;

function navigate(direction) {
    currentPage = Math.max(0, Math.min(currentPage + direction, totalPages - 1));
    gallery.style.transform = `translateY(-${currentPage * 100}vh)`;
    // Stop all audio when navigating
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

function playAudio(audioId) {
    alert("played")
    const audio = document.getElementById(audioId);
    // Stop all other audio first
    document.querySelectorAll('audio').forEach(a => {
        if (a.id !== audioId) {
            a.pause();
            a.currentTime = 0;
        }
    });
    // Play the selected audio
    audio.currentTime = 0;
    audio.play();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') navigate(-1);
    if (e.key === 'ArrowDown') navigate(1);
});