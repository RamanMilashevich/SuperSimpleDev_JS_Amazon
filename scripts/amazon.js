// import { cart as myCart } from "../data/cart.js"; // as - take the input and rename it to myCart

import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";



let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-card"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuaantity() {
  let cartQuantity = 0; // Accumulator в котором мы храним общее количество товаров для нашей корзины
  cart.forEach((cartItem) => { 
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity; 
}

const addedMessagTimeouts = {};

document.querySelectorAll('.js-add-to-card')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // const productId = button.dataset.productId;
      const {productId} = button.dataset; // shortcut
      addToCart(productId);
      updateCartQuaantity();
      
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`); // Получаем наш уникальный div с помощью уникального класса
      addedMessage.classList.add('added-to-cart-visible'); // добавляем класс видимости для отображения иконки добавленно 

      const previousTimeoutId = addedMessagTimeouts[productId];
      if(previousTimeoutId) {
        clearInterval(previousTimeoutId)
      };

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible')
      }, 2000);

      addedMessagTimeouts[productId] = timeoutId;
  });
});