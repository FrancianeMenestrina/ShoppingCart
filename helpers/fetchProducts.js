const fetchProducts = async () => {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const data = await response.json();
  return data.results;
};

// async function foo() {
//   console.log(await fetchProducts());
// }

// foo();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
