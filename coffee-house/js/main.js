import { addBurgerHandlers } from './burger.js';

addBurgerHandlers();

if (document.querySelector('.carousel') !== null) {
  const carouselModule = await import('./carousel.js');
  carouselModule.initCarousel();
}
