const WIDTH_TABLET = 768;

const header = document.querySelector('.header');
const nav = header.querySelector('.header__nav');
const burgerButton = header.querySelector('.header__burger');
const burgerButtonTextNode = burgerButton.querySelector('.visually-hidden');

const openBurgerMenu = () => {
  document.body.classList.add('page__body--js-no-scroll');
  header.classList.add('header--js-burger-opened');
  window.scrollTo({ top: 0, behavior: "smooth" });
  burgerButtonTextNode.textContent = 'Close navigation';
};

const closeBurgerMenu = () => {
  document.body.classList.remove('page__body--js-no-scroll');
  header.classList.remove('header--js-burger-opened');
  burgerButtonTextNode.textContent = 'Open navigation';
};

const onBurgerButtonClick = () => {
  if (header.classList.contains('header--js-burger-opened')) {
    closeBurgerMenu();
  } else {
    openBurgerMenu();
  }
};

const onNavClick = (evt) => {
  const linkNode = evt.target.closest('.nav__link');

  if (linkNode && header.classList.contains('header--js-burger-opened')) {
    if (linkNode.matches('a[href]')) {
      evt.preventDefault();

      nav.addEventListener('transitionend', () => {
        window.location.href = linkNode.href;
      }, { once: true });
    }

    closeBurgerMenu();
  }
};

const onWindowResize = () => {
  if (window.innerWidth > WIDTH_TABLET) {
    nav.classList.remove('header__nav--js-transition-added');
  } else {
    nav.classList.add('header__nav--js-transition-added');
  }
};

const addBurgerHandlers = () => {
  burgerButton.addEventListener('click', onBurgerButtonClick);
  nav.addEventListener('click', onNavClick);
  window.addEventListener('resize', onWindowResize);
};

onWindowResize();

export { addBurgerHandlers };
