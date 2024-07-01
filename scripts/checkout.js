import { cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';


let cartSummaryHTML = '';

hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));


cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product;
    }
  });

  
  cartSummaryHTML += `
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
           $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity js-remove-update-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input id="myInput" class="quantity-input js-element-none js-element-initial-${matchingProduct.id}" >
          <span class="save-quantity-link link-primary js-element-none js-link-save-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct)}
      </div>
    </div>
  </div>
  `;
});

function deliveryOptionsHTML(matchingProduct) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    const priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionID


    html +=`
      <div class="delivery-option">
            <input type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
      </div>
    `
  })
  return html;
}


document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    });
  });



  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  };

  updateCartQuantity();

  document.querySelectorAll('.js-update-quantity')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        console.log(productId);
        document.querySelector(`.js-element-initial-${productId}`).classList.add('is-editing-quantity');
        document.querySelector(`.js-link-save-${productId}`).classList.add('is-editing-quantity');
        document.querySelector(`.js-remove-update-${productId}`).classList.add('js-element-none')
      });
    });


   const saveButton = document.querySelectorAll('.save-quantity-link');
      
   saveButton.forEach((link) => {
    
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const newQuantity = Number(document.querySelector(`.js-element-initial-${productId}`).value);

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      };
      
      document.querySelector(`.js-element-initial-${productId}`).classList.remove('is-editing-quantity');
      document.querySelector(`.js-link-save-${productId}`).classList.remove('is-editing-quantity');
      document.querySelector(`.js-remove-update-${productId}`).classList.remove('js-element-none');

      updateQuantity(productId, newQuantity);
  
      updateCartQuantity();
      
      const quantityLabel = document.querySelector(`.quantity-label-${productId}`);
  
      quantityLabel.innerHTML = newQuantity;
  
    });

    link.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const productId = link.dataset.productId;
        console.log(e.key);
        
        const newQuantity = Number(document.querySelector(`.js-element-initial-${productId}`).value);
        console.log(newQuantity);
        
        updateQuantity(productId, newQuantity);
  
        updateCartQuantity();
        
        const quantityLabel = document.querySelector(`.quantity-label-${productId}`);
  
        quantityLabel.innerHTML = newQuantity;
      };
    });
  });

  



  
