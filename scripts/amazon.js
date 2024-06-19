// import { cart as myCart } from "../data/cart.js"; // as - take the input and rename it to myCart

import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

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
        $${(product.priceCents / 100).toFixed(2)}
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

// let addedToTomeout;
const addedMessagTimeouts = {};

document.querySelectorAll('.js-add-to-card')
  .forEach((button) => {
    button.addEventListener('click', () => {
      
      // const productId = button.dataset.productId;
      const {productId} = button.dataset; // shortcut

      let matchingItem;

      cart.forEach((item) => {
        if(productId === item.productId) {
          // console.log(productId)// property
          // console.log(item.productId); // property from object item from forEach(item)
          // console.log(item); // object
          matchingItem = item; // Запись объекта в пустую переменную
        }
      });

      console.log(matchingItem);

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      ).value; //Получение цифры из <selector> внутри есть разные <option> которые размещены в селекторе и селектор с ними связан, когда мы получаем селектор он имеет непосредственный доступ к опциям выбора, с помощью метода .value, мы получаем значение из селектора
      
      const quantity = Number(quantitySelector); // Преобразование полученного значения в тип: number
      
      if(matchingItem) { // проверка если matchinItem=true
        matchingItem.quantity += quantity; // прибавляем значение полученное из селектора 
      } else { // Или загружаем в наш массив cart пару ключ productId вместе с значением которое было преобразованно выше. так-же quantity это значение которое было на тот момент при нажатии на add to cart в selector. Условие срабатывает только при несуществующем matchingItem = false
        cart.push({
          productId,
          quantity
        });
      };
      
      
      // console.log(cart);
      let cartQuantity = 0; // Accumulator в котором мы храним общее количество товаров для нашей корзины

      cart.forEach((item) => { // с помощью forEach мы заглядываем в каждый объект item и если есть объект к пустому аккуммулятору cart quantity прибавляем значения из перебираемого массива с вомощью item.quantity (даёт доступ к количество экземпляров в объекте, прибавляем это значение)
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;  // Добавляем это значение на страницу 
        
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`); // Получаем наш уникальный div с помощью уникального класса
      addedMessage.classList.add('added-to-cart-visible'); // добавляем класс видимости для отображения иконки добавленно 

      const previousTimeoutId = addedMessagTimeouts[productId];
      console.log(previousTimeoutId);
      
      if(previousTimeoutId) {
        clearInterval(previousTimeoutId)
      };

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible')
      }, 2000);

      addedMessagTimeouts[productId] = timeoutId;
      
      
      // if(addedMessage.classList.contains('added-to-cart-visible')) {
      //   clearTimeout(addedToTomeout);
      //   addedToTomeout = setTimeout(() => {
      //     addedMessage.classList.remove('added-to-cart-visible');
      //     console.log('here')
      //   }, 2000);
        
      // } // my solution 
      
  });
});