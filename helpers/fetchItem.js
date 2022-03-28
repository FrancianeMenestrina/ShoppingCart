const fetchItem = async (ID) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${ID}`);
  const data = await response.json();
  return data;
};

// async function foo() {
//   console.log(await fetchItem());
// }

// foo();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
