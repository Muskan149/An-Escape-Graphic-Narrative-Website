let currentPage = 0;
const gallery = document.querySelector('.gallery');
const totalPages = document.querySelectorAll('.page').length;
const audio = document.getElementById('background-audio');
const titleAudioIcon = document.querySelector('.audio-icon-title');
const pagesAudioIcon = document.querySelector('.audio-icon-pages');
let isPlaying = false;
const popup = document.querySelector('.popup-overlay');
const popupSlides = document.querySelector('.popup-slides');
let currentPopupSlide = 0;
const totalPopupSlides = document.querySelectorAll('.popup-slide').length;
// Add this at the start of your script
const popupConfig = {
    1: {  // Page 1
        clickArea: {
            x1: 0,
            x2: 0.5,  // half of width
            y1: 0,
            y2: 0.5   // half of height
        },
        images: [
            "Assets/ss-1/authorbio1.png",
            "Assets/ss-1/authorbiopage2.png",
            "Assets/ss-1/authorbiopage3 (2).png",
            "Assets/ss-1/authorbiopage4.png"
        ]
    },
    3: {  // Page 3
        clickArea: {
            x1: 0,
            x2: 0.5,  // half of width
            y1: 0,
            y2: 0.5   // half of height
        },
        images: [
            "Assets/ss-2/yinminpage1.png",
            "Assets/ss-2/yinminpage2.png",
            "Assets/ss-2/yuminpage3.png",
            "Assets/ss-2/yinminpage4.png"
        ]
    },
    5: {
        clickArea: {
            x1: 0,
            x2: 0.5,  // half of width
            y1: 0,
            y2: 0.5   // half of height
        },
        images: [
            "Assets/ss-3/castillopage1.png",
            "Assets/ss-3/castillopage2.png",
            "Assets/ss-3/castillopage3.png",
            "Assets/ss-3/castillopage4.png"
      ]
    },
    6: {
        clickArea: {
            x1: 0.5,
            x2: 1,
            y1: 0.5,
            y2: 1
        },
        images: [
            "/api/placeholder/800/400?text=Page6-Image1",
            "/api/placeholder/800/400?text=Page6-Image2"
        ]
    }
};

// Update the click handler
document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        const pageConfig = popupConfig[index];
        if (pageConfig) {  // Only add click handlers to pages with popups
            const img = page.querySelector('img');
            
            img.addEventListener('click', function(e) {
                const rect = img.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;  // Convert to percentage
                const y = (e.clientY - rect.top) / rect.height;  // Convert to percentage
                
                const { clickArea } = pageConfig;
                if (x > clickArea.x1 && x < clickArea.x2 && 
                    y > clickArea.y1 && y < clickArea.y2) {
                    openPopup(pageConfig.images);
                }
            });
        }
    });
});

function openPopup(images) {
    // Create slides dynamically
    const slidesHTML = images.map(src => `
        <div class="popup-slide">
            <img src="${src}" alt="Popup Image">
        </div>
    `).join('');
    
    popupSlides.innerHTML = slidesHTML;
    popup.style.display = 'flex';
    currentPopupSlide = 0;
    updatePopupSlides();
    
    // Update totalPopupSlides based on current popup's images
    totalPopupSlides = images.length;
    
    if (audio && isPlaying) {
        audio.pause();
        isPlaying = false;  // Update the playing state
        updatePlayPauseIcon();  // Update the icon
    }

    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'popup-dots';
    
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `popup-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => {
            currentPopupSlide = index;
            updatePopupSlides();
            updateDots();
        };
        dotsContainer.appendChild(dot);
    });
    
    document.querySelector('.popup-content').appendChild(dotsContainer);
}

function updateDots() {
    const dots = document.querySelectorAll('.popup-dot');
    dots.forEach((dot, index) => {
        dot.className = `popup-dot ${index === currentPopupSlide ? 'active' : ''}`;
    });
}

function updatePopupSlides() {
    popupSlides.style.transform = `translateY(-${currentPopupSlide * 100}%)`;
    updateDots();
}

function closePopup() {
    popup.style.display = 'none';
    currentPopupSlide = 0;
    updatePopupSlides();
    
    // Resume audio when popup closes
    if (audio && !isPlaying) {
        audio.play();
        isPlaying = true;
        updatePlayPauseIcon();
    }

    // Remove dots when closing
    const dotsContainer = document.querySelector('.popup-dots');
    if (dotsContainer) {
        dotsContainer.remove();
    }
}

// Update the navigation function to use dynamic total slides
function navigatePopup(direction) {
    currentPopupSlide = Math.max(0, Math.min(currentPopupSlide + direction, totalPopupSlides - 1));
    updatePopupSlides();
}

// // Add click handler to the red human figure
// document.addEventListener('DOMContentLoaded', function() {
//     const page1 = document.querySelectorAll('.page')[1]; // Select the first page
//     const redHuman = page1.querySelector('img'); // This will target the image
    
//     redHuman.addEventListener('click', function(e) {
//         // Get the coordinates of the click relative to the image
//         const rect = redHuman.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
        
//         // Check if click is in the area of the red human (adjust these values as needed)
//         if (x > 0 && x < (rect.width/2) && y > 0 && y < (rect.height/2)) {
//             openPopup();
//         }
//     });
// });

// function openPopup() {
//     console.log("Opening popup"); // Add this line
//     popup.style.display = 'flex';
//     if (audio && isPlaying) {
//         audio.pause();
//         updatePlayPauseIcon();
//     }
// }

// function closePopup() {
//     popup.style.display = 'none';
//     currentPopupSlide = 0;
//     updatePopupSlides();
// }

// function navigatePopup(direction) {
//     currentPopupSlide = Math.max(0, Math.min(currentPopupSlide + direction, totalPopupSlides - 1));
//     updatePopupSlides();
// }

// function updatePopupSlides() {
//     popupSlides.style.transform = `translateX(-${currentPopupSlide * 100}%)`;
// }

// Add click event for close button
document.querySelector('.popup-close').addEventListener('click', closePopup);

// Close popup when clicking outside
popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        closePopup();
    }
});

function startAudio() {
    audio.play();
    isPlaying = true;
    titleAudioIcon.style.opacity = '0';
    pagesAudioIcon.style.opacity = '1';
    updatePlayPauseIcon();
}

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        pagesAudioIcon.querySelector('i').classList.remove('fa-pause');
        pagesAudioIcon.querySelector('i').classList.add('fa-play');
    } else {
        audio.play();
        pagesAudioIcon.querySelector('i').classList.remove('fa-play');
        pagesAudioIcon.querySelector('i').classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

function updatePlayPauseIcon() {
    const icon = pagesAudioIcon.querySelector('i');
    icon.classList.remove('fa-play', 'fa-pause');
    icon.classList.add(isPlaying ? 'fa-pause' : 'fa-play');
}


function navigate(direction) {
    currentPage = Math.max(0, Math.min(currentPage + direction, totalPages - 1));
    gallery.style.transform = `translateY(-${currentPage * 100}vh)`;
    
    // Show/hide appropriate audio controls based on page
    if (currentPage === 0) {
        titleAudioIcon.style.opacity = '1';
        pagesAudioIcon.style.opacity = '0';
    } else {
        titleAudioIcon.style.opacity = '0';
        pagesAudioIcon.style.opacity = '1';
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') navigate(-1);
    if (e.key === 'ArrowDown') navigate(1);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') navigate(-1);
    if (e.key === 'ArrowDown') navigate(1);
});

