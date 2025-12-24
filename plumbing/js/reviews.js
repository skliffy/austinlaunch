let currentSlide = 0;
let slidesToShow = 3;

function updateSlidesToShow() {
  if (window.innerWidth <= 768) {
    slidesToShow = 1;
  } else if (window.innerWidth <= 1024) {
    slidesToShow = 2;
  } else {
    slidesToShow = 3;
  }
}

function initializeSlider() {
  const track = document.getElementById('reviewsTrack');
  const originalReviews = Array.from(track.querySelectorAll('.review-box:not(.clone)'));
  const originalCount = originalReviews.length;
  
  // Clone enough reviews to fill the gap
  for (let i = 0; i < slidesToShow; i++) {
    const clone = originalReviews[i].cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  }
}

function slideReviews(direction) {
  const track = document.getElementById('reviewsTrack');
  const originalReviews = track.querySelectorAll('.review-box:not(.clone)');
  const originalCount = originalReviews.length;
  
  currentSlide += direction;
  
  const slideWidth = originalReviews[0].offsetWidth + 30; // width + gap
  const offset = -currentSlide * slideWidth;
  
  track.style.transform = `translateX(${offset}px)`;
  
  // Reset to beginning when reaching cloned slides
  if (currentSlide >= originalCount) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentSlide = 0;
      track.style.transform = `translateX(0px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 50);
    }, 500);
  }
  
  // Reset to end when going backwards past the beginning
  if (currentSlide < 0) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentSlide = originalCount - 1;
      track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 50);
    }, 500);
  }
}

// Initialize on page load
updateSlidesToShow();
initializeSlider();

// Re-initialize on window resize
window.addEventListener('resize', () => {
  const track = document.getElementById('reviewsTrack');
  const oldSlidesToShow = slidesToShow;
  updateSlidesToShow();
  
  if (oldSlidesToShow !== slidesToShow) {
    // Remove old clones
    track.querySelectorAll('.clone').forEach(clone => clone.remove());
    // Add new clones
    initializeSlider();
    currentSlide = 0;
    track.style.transform = 'translateX(0px)';
  }
});

// Auto-slide every 5 seconds
setInterval(() => {
  slideReviews(1);
}, 5000);