const TABLET_CARDS_COUNT_MAX = 4;
const WIDTH_TABLET = 768;

const cardTemplateNode = document.querySelector('#card').content.querySelector('.card');
const menuNode = document.querySelector('.menu');
const menuButtonsList = menuNode.querySelector('.menu__categories');
const menuLoadButton = menuNode.querySelector('.menu__btn-load');
const menuList = menuNode.querySelector('.menu__list');

let activeCategory = 'coffee';
let isFirstRender = true;
let products = [];

const createCard = ({ id: id, name, description, price, category }) => {
  const cardNode = cardTemplateNode.cloneNode(true);

  cardNode.querySelector('.card__title').textContent = name;
  cardNode.querySelector('.card__desc').textContent = description;
  cardNode.querySelector('.card__price').textContent = `$${price}`;
  cardNode.querySelector('.card__img').src = `img/menu/${category}/${id}.jpg`;
  cardNode.dataset.cardId = id;

  return cardNode;
};

const renderCards = () => {
  const fragment = document.createDocumentFragment();
  const filteredProducts = products.filter((product) => product.category === activeCategory);

  filteredProducts.forEach((product) => {
    const cardNode = createCard(product);
    fragment.append(cardNode);
  });

  menuList.style.opacity = 0;

  if (isFirstRender) {
    isFirstRender = false;
    menuLoadButton.style.animation = 'rotation 1.5s linear infinite';
    menuLoadButton.style.display = 'flex';
  }

  setTimeout(() => {
    menuList.innerHTML = '';
    menuList.append(fragment);
    menuList.style.opacity = 1;
    menuLoadButton.style.animation = '';
    menuLoadButton.style.display = '';

    if (menuList.childElementCount <= TABLET_CARDS_COUNT_MAX) {
      menuLoadButton.style.display = 'none';
    }
  }, 400);
};

const onMenuButtonsListClick = (evt) => {
  const button = evt.target.closest('.menu__btn-category');

  if (button && !button.matches('.menu__btn-category--active')) {
    const previousActiveButton = menuButtonsList.querySelector('.menu__btn-category--active');

    previousActiveButton.classList.remove('menu__btn-category--active');
    button.classList.add('menu__btn-category--active');

    button.classList.forEach((className) => {
      if (className.startsWith('menu__btn-category--icon_')) {
        activeCategory = className.slice('menu__btn-category--icon_'.length);
      }
    });

    renderCards();
  }
};

const onMenuLoadButtonClick = () => {
  const cardNodes = menuList.childNodes;

  cardNodes.forEach((cardNode) => {
    const displayProperty = window.getComputedStyle(cardNode).getPropertyValue('display');
    if (displayProperty === 'none') {
      cardNode.style.opacity = 0;
      cardNode.style.display = 'flex';

      setTimeout(() => {
        cardNode.style.opacity = 1;
      });
    }
  });

  menuLoadButton.style.display = 'none';
};

const onWindowResize = () => {
  if (window.innerWidth > WIDTH_TABLET && menuList.childElementCount > TABLET_CARDS_COUNT_MAX) {
    const cardNodes = menuList.childNodes;

    cardNodes.forEach((cardNode) => {
      cardNode.style.display = '';
    });

    menuLoadButton.style.display = '';
  }
};

const initMenu = (data) => {
  products = data;
  renderCards();

  menuButtonsList.addEventListener('click', onMenuButtonsListClick);
  menuLoadButton.addEventListener('click', onMenuLoadButtonClick);
  window.addEventListener('resize', onWindowResize);
};

export { initMenu };
