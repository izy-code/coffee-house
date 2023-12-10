import { addBurgerHandlers } from './burger.js';

addBurgerHandlers();

if (document.querySelector('.carousel') !== null) {
  const carouselModule = await import('./carousel.js');
  carouselModule.initCarousel();
}

if (document.querySelector('.menu') !== null) {
  const dataModule = await import('./data.js');
  const menuModule = await import('./menu.js');
  const modalModule = await import('./modal.js');
  const products = await dataModule.getDataWithIds();

  menuModule.initMenu(products);
  modalModule.initModalWindow(products);
}
