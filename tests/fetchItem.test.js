require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('1 - Teste se fetchItem é uma função;', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', () => {
  fetchItem('MLB1615760527')
  expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  it('4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const retornoFetch = await fetchItem('MLB1615760527')
    expect(retornoFetch).toBe(item);
  })
  it('5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error(mensagem esperada aqui) para comparar com o objeto retornado da API', async () => {
    const retornoFetch = await fetchItem()
    expect(retornoFetch.message).toBe('You must provide an url');
  }) 
});



