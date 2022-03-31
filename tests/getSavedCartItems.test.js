const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('1 - Teste se, ao executar getSavedCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.getItem é chamado;', async () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('2 - Teste se, ao executar getSavedCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.getItem é chamado;', async () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
