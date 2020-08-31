if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  /*-----------------------Item added to cart----------------------- */

  var shopItemButton = document.getElementsByClassName("shop-item-btn");

  var cartAddButton;
  Array.prototype.forEach.call(shopItemButton, (button) => {
    cartAddButton = button;
    cartAddButton.addEventListener("click", addToCartClicked);
  });
}

function updateCardTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerHTML.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var imgSrc = shopItem.getElementsByClassName("shop-item-img")[0].src;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;

  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    const cartItemsName = cartItemsNames[i];
    if (cartItemsNames[i].innerText === title) {
      alert("You already added to cart");
      return;
    }
  }
  addItemToCart(title, price, imgSrc);
  updateCardTotal();
}

function addItemToCart(title, price, imgSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartRowContents = ` <div class="cart-item cart-column">
  <img class="cart-item-img" src="${imgSrc}" alt="" width="100" height="100"> 
  <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
  <input class="cart-quantity-input" type="number" value="1">
  <button class="btn btn-danger" type="button">REMOVE</button>
</div>`;

  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

  /* ---------------------------removimg cart item------------------------ */

  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);

  /* -----------------------------cart quantity change----------------------- */

  // console.log(cartRow);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", updateCardTotal);
}

function removeCartItem(event) {
  event.target.parentElement.parentElement.remove();
  updateCardTotal();
}

function cartQuantityChange(event) {
  console.log(event);
}