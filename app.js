import { data as products } from "./prods.js";
//render function
function render(items, renderFeild, type, className) {
  items.forEach((item) => {
    let element = document.createElement("div");
    element.classList.add(className);
    let template = `<h1>${item.name}</h1><img src=${item.src} alt=""><button class=${type}>${type}</button>`;
    element.innerHTML = template;
    renderFeild.append(element);
  });
}

//function for removing duplicated from the array
function removedups(array) {
  const set = new Set(array);
  return [...set];
}

//for showing number of items in the cart
const number = document.querySelector(".number");
function showItemNumber(array) {
  return array.length;
}

//rendering the products on load
const products_container = document.querySelector(".products");
render(products, products_container, "add", "product-preview");

//adding items to cart
var cart = [];
const product_previews = document.querySelectorAll(".product-preview");
const cartlist = document.querySelector(".cart");
[...product_previews].forEach((product_preview) => {
  product_preview.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let header = e.target.parentElement.firstChild.textContent;
      let things = products.filter((prod) => prod.name == header);
      if (!cart.includes(...things)) {
        cart.push(...things);
      }
      cartlist.innerHTML = null;
      render(removedups(cart), cartlist, "delete", "cart-preview");
      number.textContent = showItemNumber(cart);
    }
  });
});

//removing items from cart
cartlist.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    let header = e.target.parentElement.firstChild.textContent;
    let things = cart.filter((prod) => prod.name !== header);
    cart = [...things];
    cartlist.innerHTML = null;
    render(removedups(cart), cartlist, "delete", "cart-preview");
    number.textContent = showItemNumber(cart);
  }
});
