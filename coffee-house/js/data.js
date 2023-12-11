const BASE_URL = './products.json';

const getParsedObject = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};

const getDataWithIds = async () => {
  const products = await getParsedObject();
  const categoriesObject = {};

  products.forEach((product) => {
    if (categoriesObject[product.category]) {
      product.id = `${product.category}-${++categoriesObject[product.category]}`;
    } else {
      categoriesObject[product.category] = 1;
      product.id = `${product.category}-${categoriesObject[product.category]}`;
    }
  });

  return products;
};

export { getDataWithIds };
