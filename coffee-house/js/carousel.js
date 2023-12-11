import { debounce, debounceWithLeading, addSwipeHandlers } from './util.js';

const SLIDE_SWITCH_INTERVAL = 5800;
const PROGRESS_VALUE_MAX = 100;
const PROGRESS_STEPS_COUNT = 20;

const carouselNode = document.querySelector('.carousel');
const prevButton = carouselNode.querySelector('.carousel__btn--prev');
const nextButton = carouselNode.querySelector('.carousel__btn--next');
const carouselBarNodes = carouselNode.querySelectorAll('.carousel__bar');
const carouselWindowNode = carouselNode.querySelector('.carousel__window');
const carouselRowNode = carouselWindowNode.querySelector('.carousel__slides-row');
const slideNodes = carouselRowNode.querySelectorAll('.carousel__slide');

let currentSlideNumber = 0;
let progressValue = 0;
let progressBarIntervalId;

const transitionDurationValue = Number.parseFloat(window
  .getComputedStyle(carouselRowNode)
  .getPropertyValue('transition-duration')) * 1000;

const debouncedUnsetTransition = debounceWithLeading(() => {
  carouselRowNode.style.transition = 'unset';
}, 250);

const debouncedReturnTransition = debounce(() => {
  carouselRowNode.style.transition = '';
}, 300);

const repositionSlide = () => {
  const slideShift = slideNodes[1].getBoundingClientRect().x - slideNodes[0].getBoundingClientRect().x;

  carouselRowNode.style.transform = `translateX(-${currentSlideNumber * slideShift}px)`;
};

const advanceProgressBar = () => {
  if (progressValue < PROGRESS_VALUE_MAX) {
    progressValue += PROGRESS_VALUE_MAX / PROGRESS_STEPS_COUNT;
    carouselBarNodes[currentSlideNumber].style.width = `${progressValue}%`;
  } else {
    showNextSlide();
  }
};

const resetProgressBar = () => {
  progressValue = 0;
  carouselBarNodes[currentSlideNumber].style.width = '0%';
};

const startProgressBarAdvancement = () => {
  clearInterval(progressBarIntervalId);

  progressBarIntervalId = setInterval(() => {
    advanceProgressBar();
  }, SLIDE_SWITCH_INTERVAL / PROGRESS_STEPS_COUNT);
};

const pauseProgressBarAdvancement = () => {
  clearInterval(progressBarIntervalId);
};

const handleSlideSwitch = (disabledButton) => {
  currentSlideNumber = (currentSlideNumber + slideNodes.length) % slideNodes.length;
  repositionSlide();
  startProgressBarAdvancement();
  disabledButton.disabled = true;

  setTimeout(() => {
    disabledButton.disabled = false;
  }, transitionDurationValue);
};

const showPrevSlide = () => {
  resetProgressBar();
  currentSlideNumber--;
  handleSlideSwitch(prevButton);
};

function showNextSlide() {
  resetProgressBar();
  currentSlideNumber++;
  handleSlideSwitch(nextButton);
}

const onWindowResize = () => {
  repositionSlide();
  resetProgressBar();
  debouncedUnsetTransition();
  debouncedReturnTransition();
};

const initCarousel = () => {
  carouselBarNodes.forEach((barNode) => {
    barNode.style.transition = `width ${SLIDE_SWITCH_INTERVAL / PROGRESS_STEPS_COUNT}ms linear`;
  });
  startProgressBarAdvancement();

  window.addEventListener('resize', onWindowResize);
  prevButton.addEventListener('click', showPrevSlide);
  nextButton.addEventListener('click', showNextSlide);
  slideNodes.forEach((slideNode) => {
    slideNode.addEventListener('mouseenter', pauseProgressBarAdvancement);
    slideNode.addEventListener('mouseleave', startProgressBarAdvancement);
  });
  carouselWindowNode.addEventListener('touchstart', pauseProgressBarAdvancement,
    { passive: true });
  carouselWindowNode.addEventListener('touchend', startProgressBarAdvancement);
  carouselWindowNode.addEventListener('contextmenu', (evt) => {
    if (evt.pointerType === 'touch') {
      evt.preventDefault();

      setTimeout(startProgressBarAdvancement);
    }
  });
  addSwipeHandlers(carouselNode, showNextSlide, showPrevSlide);
};

export { initCarousel };
