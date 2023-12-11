const menuList = document.querySelector('.menu__list');
const modalItemTemplateNode = document.querySelector('#modal-item').content.querySelector('.modal__item');
const modalNode = document.querySelector('.modal');
const imageNode = modalNode.querySelector('.modal__img');
const modalForm = modalNode.querySelector('.modal__form');
const formTitleNode = modalForm.querySelector('.modal__form-title');
const descriptionNode = modalForm.querySelector('.modal__desc');
const sizeList = modalForm.querySelector('.modal__list--size');
const additivesList = modalForm.querySelector('.modal__list--additives');
const output = modalForm.querySelector('.modal__output');
const closeButton = modalForm.querySelector('.modal__close-button');

const createCheckBox = ({ name }) => {
  const listItem = modalItemTemplateNode.cloneNode(true);
  const listItemInput = listItem.querySelector('.rad-check__input');

  listItem.querySelector('.rad-check').classList.add('rad-check--counter');
  listItemInput.setAttribute('type', 'checkbox');
  listItemInput.setAttribute('name', name.toLowerCase());
  listItem.querySelector('.rad-check__text').textContent = name;

  return listItem;
};

const createRadio = (property, { size }) => {
  const listItem = modalItemTemplateNode.cloneNode(true);
  const listItemInput = listItem.querySelector('.rad-check__input');
  const listItemText = listItem.querySelector('.rad-check__text');

  listItemInput.setAttribute('type', 'radio');
  listItemInput.setAttribute('name', 'size');
  listItemInput.setAttribute('value', property);
  listItemText.textContent = size;
  listItemText.style.setProperty('--pseudo-content', `'${property.toUpperCase()}'`);

  return listItem;
};

const createListItemsFragment = (dataObject) => {
  const fragment = document.createDocumentFragment();

  if (Array.isArray(dataObject)) {
    dataObject.forEach((item) => {
      const listItem = createCheckBox(item);

      fragment.append(listItem);
    });
  } else {
    for (const property in dataObject) {
      const listItem = createRadio(property, dataObject[property]);

      fragment.append(listItem);
    }
  }

  return fragment;
};

const fillList = (listNode, dataObject) => {
  const fragment = createListItemsFragment(dataObject);

  listNode.innerHTML = '';
  listNode.append(fragment);
};

const fillModalData = ({ id, name, description, category, sizes, additives, price }) => {
  imageNode.src = `img/menu/${category}/${id}.jpg`;
  formTitleNode.textContent = name;
  descriptionNode.textContent = description;
  output.textContent = price;
  fillList(sizeList, sizes);
  fillList(additivesList, additives);
};

const openModal = (cardData) => {
  document.body.style.overflow = 'hidden';
  fillModalData(cardData);
  modalNode.showModal();
};

const closeModal = () => {
  document.body.style.overflow = 'visible';
  modalNode.close();
  modalForm.reset();
};

const onCloseButtonClick = () => {
  closeModal();
};

const onModalNodeClick = (evt) => {
  if (evt.target === modalNode) {
    closeModal();
  }
};

const setModalWindowHandlers = (products) => {
  menuList.addEventListener('click', (evt) => {
    const cardNode = evt.target.closest('.card');

    if (cardNode) {
      const cardId = cardNode.dataset.cardId;
      const currentCardData = products.find(({ id }) => id === cardId);

      openModal(currentCardData);
    }
  });
};

closeButton.addEventListener('click', onCloseButtonClick);
modalNode.addEventListener('click', onModalNodeClick);

export { setModalWindowHandlers };
