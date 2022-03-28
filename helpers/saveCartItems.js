const saveCartItems = (itemDoCarinho, cartItemsArray) => {
  cartItemsArray.push(JSON.stringify(itemDoCarinho));
  localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
