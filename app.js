function buildProductCard(product) {
    const div = document.createElement('div');
    const title = domBuilder.h2(product.name);
    const image = domBuilder.img(product.img);
    const price = domBuilder.p(product.price);
    const button = domBuilder.button('Seleccionar', 'btnProduct', product.id);
    div.appendChild(title);
    div.appendChild(image);
    div.appendChild(price);
    div.appendChild(button);
    return div;
  }

  function onSelectClick(event) {
    const idProduct = event.target.dataset.id;
    selectedProduct = products.find(function(product) {
      if(product.id === idProduct) {
        return product;
      }
    });


    // AGREGANDO EN UN ARRAY UN ELEMENTO
    selectedProducts.push(selectedProduct);
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    buildCart();
  }

  function buildCart() {
    const lastProduct = selectedProducts[selectedProducts.length - 1];
    const card = buildProductCard(lastProduct);
    selectedContainer.appendChild(card);
  }

  const domBuilder = new DOMBuilder();

  let selectedProducts = [];

  window.addEventListener('load', function(){  

    const productContainer = document.getElementById('productContainer');

    const selectedContainer = document.getElementById('selectedContainer');

    const totalProductsContainer = document.getElementById('totalProducts');

    products.forEach( function (product) {
      if(product.available) {
        const card = buildProductCard(product);
        productContainer.appendChild(card);
      }
    });

    const cart = JSON.parse(localStorage.getItem('selectedProducts'));
    if(cart) {
      cart.forEach(function(product) {
        const card = buildProductCard(product);
        selectedContainer.appendChild(card);
      });  
    }

    
    // DOM 
    const btnProducts = document.querySelectorAll('.btnProduct');
    btnProducts.forEach(function(btnProduct) {
      btnProduct.addEventListener('click', onSelectClick);
    })
  })