const menuList = document.querySelector('.menu__list');
const modalNode = document.querySelector('.modal');
const closeButton = modalNode.querySelector('.modal__close-button');

const onMenuListClick = (evt) => {
  const card = evt.target.closest('.card');

  if (card) {
    modalNode.showModal();
    document.body.style.overflow = 'hidden';
  }
};

const onCloseButtonClick = () => {
  modalNode.close();
  document.body.style.overflow = 'visible';
};

const onModalNodeClick = (evt) => {
  if (evt.target === modalNode) {
    modalNode.close();
    document.body.style.overflow = 'visible';
  }
};

function initModalWindow(products) {
  menuList.addEventListener('click', onMenuListClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  modalNode.addEventListener('click', onModalNodeClick);
}

export { initModalWindow };
