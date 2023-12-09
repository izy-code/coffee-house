import { debounce, debounceWithLeading, addSwipeHandlers } from './util.js';

const carouselNode = document.querySelector('.carousel');
const prevButton = carouselNode.querySelector('.carousel__btn--prev');
const nextButton = carouselNode.querySelector('.carousel__btn--next');
const carouselWindowNode = carouselNode.querySelector('.carousel__window');
const carouselRowNode = carouselWindowNode.querySelector('.carousel__slides-row');
const slideNodes = carouselRowNode.querySelectorAll('.carousel__slide');

let currentSlideNumber = 0;

const debouncedUnsetTransition = debounceWithLeading(() => {
  carouselRowNode.style.transition = 'unset';
}, 250);

const debouncedReturnTransition = debounce(() => {
  carouselRowNode.style.transition = '';
}, 300);

const rearrangeSlide = () => {
  const slideShift = slideNodes[1].getBoundingClientRect().x - slideNodes[0].getBoundingClientRect().x;

  carouselRowNode.style.transform = `translateX(-${currentSlideNumber * slideShift}px)`;
};

const showPrevSlide = () => {
  currentSlideNumber--;
  currentSlideNumber = (currentSlideNumber + slideNodes.length) % slideNodes.length;
  rearrangeSlide();
};

const showNextSlide = () => {
  currentSlideNumber++;
  currentSlideNumber = (currentSlideNumber + slideNodes.length) % slideNodes.length;
  rearrangeSlide();
};

const onWindowResize = () => {
  rearrangeSlide();
  debouncedUnsetTransition();
  debouncedReturnTransition();
};

const initCarousel = () => {
  window.addEventListener('resize', onWindowResize);
  prevButton.addEventListener('click', showPrevSlide);
  nextButton.addEventListener('click', showNextSlide);

  addSwipeHandlers(carouselNode, showNextSlide, showPrevSlide);
};

export { initCarousel };
