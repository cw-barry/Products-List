// import { products } from './products.js';

let products = [];

const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');

const displayProducts = (productList) => {
  let displayProduct = productList.map(
    (item) =>
      `<article class="product-item">
          <img src=${item.thumbnail} alt=${item.title} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.description}
            </p>
          </div>
        </article>`
  );
  displayProduct = displayProduct.join('');
  sectionCenter.innerHTML = displayProduct;
};

const displayCategoryButtons = () => {
  const categories = products.reduce(
    (acc, item) => {
      if (!acc.includes(item.category)) {
        acc.push(item.category);
      }
      return acc;
    },
    ['all']
  );

  const categoryBtns = categories
    .map(
      (
        category
      ) => `<button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>`
    )
    .join('');

  btnContainer.innerHTML = categoryBtns;
};

btnContainer.addEventListener('click', (e) => {
  if (e.target.className == 'filter-btn') {
    const category = e.target.dataset.id;
    const productCategory = products.filter(
      (item) => item.category === category
    );
    if (category === 'all') {
      displayProducts(products);
    } else {
      displayProducts(productCategory);
    }
  }
});

async function getData() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    products = data?.products;
    displayProducts(products);
    displayCategoryButtons();
  } catch (error) {
    console.log(error);
  }
}

getData();
