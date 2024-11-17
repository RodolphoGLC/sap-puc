const productsInfos = [
  {
    id: "product-1",
    name: "Garrafa Inteligente",
    price: 38.99,
    img: "imgs/produto-1.png",
  },
  {
    id: "product-2",
    name: "Garrafa Vermelha",
    price: 25.99,
    img: "imgs/produto-2.png",
  },
  {
    id: "product-3",
    name: "Garrafa Preta",
    price: 25.99,
    img: "imgs/produto-3.png",
  },
  {
    id: "product-4",
    name: "Garrafa de metal",
    price: 49.99,
    img: "imgs/produto-4.png",
  },
];

const section = document.querySelector(".main-products");

function renderProducts(products) {
  section.innerHTML = "";
  products.forEach((product) => {
    const article = document.createElement("article");
    article.className = "product";
    article.id = product.id;

    const productName = document.createElement("h3");
    productName.className = "product-name";
    productName.textContent = product.name;
    article.appendChild(productName);

    const productImg = document.createElement("img");
    productImg.src = product.img;
    article.appendChild(productImg);

    const productPrice = document.createElement("p");
    productPrice.className = "product-price";
    productPrice.innerHTML = `R$ <span>${product.price.toFixed(2)}</span>`;
    article.appendChild(productPrice);

    const addButton = document.createElement("button");
    addButton.className = "add-cart";
    addButton.textContent = "Add Cart";
    addButton.setAttribute("onclick", `addToCart('${product.id}')`);
    article.appendChild(addButton);

    section.appendChild(article);
  });
}

renderProducts(productsInfos);

function filterProducts() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredProducts = productsInfos.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts);
}

let cart = [];

const addToCart = (id) => {
  const item = cart.find((c) => c.id == id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({
      id: id,
      quantity: 1,
    });
  }
};

const buy = () => {
  let productsPrices = 0;

  cart.forEach((c) => {
    productsPrices +=
      c.quantity * productsInfos.find((p) => p.id == c.id).price;
  });

  if (Number.isFinite(productsPrices)) {
    if (confirm(`Preço final: ${Math.round(productsPrices * 100) / 100}`)) {
      alert("Produto comprado com sucesso!");
      cart = [];
    }
  } else {
    alert("O preço dos produtos é inválido.");
  }
};
