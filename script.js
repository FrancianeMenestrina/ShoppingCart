function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function totalItemsPrices() {
  const cartItems = Array.from(document.querySelectorAll('.cart__item'));
  let totalPrice = 0;
  cartItems.forEach((e) => {
    console.log('log array', [e.length - 1]);
    console.log('log inner', e.innerText);
    const valueProduct = e.innerText.split('|')[e.length - 1].replace('PRICE:', '').trim();
    console.log(valueProduct, parseFloat(valueProduct));
    totalPrice += valueProduct;
  });
  totalPrice.innerText = totalItemsPrices;
}

async function removeItem(e) {
  const idProduct = e.target.innerText.split('|')[0].replace('SKU:', '').trim();
  const cartItemsArray = getSavedCartItems();
  const mapItems = cartItemsArray.map((item) => JSON.parse(item));
  const indexObjSerRemovido = mapItems.findIndex((item) => item.id === idProduct);
  cartItemsArray.splice(indexObjSerRemovido, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
  await e.target.remove();
  totalItemsPrices();
}
function cartItemClickListener(event) {
  const cartItems = Array.from(document.querySelectorAll('.cart__item'));
  cartItems.forEach((elemento2) => {
    elemento2.addEventListener('click', removeItem);
  });
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addTotalPrice() {
  const price = await totalItemPrices();
  document.querySelector('.total-price').appendChild(price);
}

const loadProducts = async () => {
  const products = await fetchProducts();
  products.forEach((elemento) => {
    const novoElementoLista = createProductItemElement(elemento);
    document.querySelector('.items').appendChild(novoElementoLista);
  });
};

const addListenerProducts = async () => {
  const adicionarAoCarrinho = Array.from(document.getElementsByClassName('item__add'));
  adicionarAoCarrinho.forEach((elemento) => {
    elemento.addEventListener('click', async function test(element) {
      const idItem = element.target.parentNode.querySelector('.item__sku').innerText;
      const product = await fetchItem(idItem);
      const cartIdPriceName = createCartItemElement(product);
      document.querySelector('.cart__items').appendChild(cartIdPriceName);
      const cartItemsArray = getSavedCartItems();
      saveCartItems(product, cartItemsArray);
      cartItemClickListener();
      totalItemsPrices();
    });
  });
};

const loadCartItemfromLocalStorage = async () => {
  const cartItemsArray = getSavedCartItems();
  cartItemsArray.forEach((item) => {
    const cartIdPriceName = createCartItemElement(JSON.parse(item));
    document.querySelector('.cart__items').appendChild(cartIdPriceName);
    cartIdPriceName.addEventListener('click', removeItem);
  });
};

const clear = () => {
const listaPai = document.querySelector('.cart__items');
listaPai.innerHTML = '';
};

const clearCart = () => {
const buttonClear = document.querySelector('.empty-cart');
buttonClear.addEventListener('click', clear);
};
clearCart();

window.onload = async () => {
  await loadProducts();
  await addListenerProducts();
  await loadCartItemfromLocalStorage();
};
