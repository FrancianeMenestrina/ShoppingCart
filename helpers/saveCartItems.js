const saveCartItems = (cartItemsArray) => {
  localStorage.setItem('cartItems', cartItemsArray);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
