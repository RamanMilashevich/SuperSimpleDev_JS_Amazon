export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
};


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
};

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      // console.log(productId)// property
      // console.log(item.productId); // property from object item from forEach(item)
      // console.log(item); // object
      matchingItem = cartItem; // Запись объекта в пустую переменную
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  ).value; //Получение цифры из <selector> внутри есть разные <option> которые размещены в селекторе и селектор с ними связан, когда мы получаем селектор он имеет непосредственный доступ к опциям выбора, с помощью метода .value, мы получаем значение из селектора
  
  const quantity = Number(quantitySelector); // Преобразование полученного значения в тип: number
  
  if(matchingItem) { // проверка если matchinItem=true
    matchingItem.quantity += quantity; // прибавляем значение полученное из селектора 
  } else { // Или загружаем в наш массив cart пару ключ productId вместе с значением которое было преобразованно выше. так-же quantity это значение которое было на тот момент при нажатии на add to cart в selector. Условие срабатывает только при несуществующем matchingItem = false
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  };

  saveToStorage();
};

 export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem)
    };

  });

  cart = newCart;
  saveToStorage();
};

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => { 
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};

 export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {

    console.log(cartItem);
  
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    };
   
  })
  matchingItem.quantity = newQuantity;
  saveToStorage();
};


