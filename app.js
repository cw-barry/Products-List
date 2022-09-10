import { products } from './products.js';

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

  // const filterBtns = btnContainer.querySelectorAll('.filter-btn');
  // filterBtns.forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     const category = e.currentTarget.dataset.id;
  //     const productCategory = products.filter(
  //       (item) => item.category === category
  //     );
  //     if (category === 'all') {
  //       displayProducts(products);
  //     } else {
  //       displayProducts(productCategory);
  //     }
  //   });
  // });
};

window.addEventListener('DOMContentLoaded', function () {
  displayProducts(products);
  displayCategoryButtons();
});
