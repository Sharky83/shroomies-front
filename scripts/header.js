document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("app-header");

  const headerContent = `
        <nav class="nav">
            <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./guides.html">Guide</a></li>
                <li><a href="./store.html">Store</a></li>
                <li><a href="./about.html">About</a></li>
                <li><a href="./blog.html">Blog</a></li>
            </ul>
        </nav>
        <h1 class="shop-name">The Shroomies</h1>
        <button id="cart-button" class="btn btn-primary cart-button" type="button">
            cart Total: £<span class="cart-total-price">0.00</span>
        </button>
    `;

  header.innerHTML = headerContent;

  // Add event listener for the cart button
  const cartButton = document.getElementById("cart-button");
  cartButton.addEventListener("click", function () {
    showCartModal();
  });

  // Add event listener for the close button
  const closeButton = document.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeCartModal();
    });
  }

  // Add event listener for clicking outside the modal
  window.addEventListener("click", function (event) {
    const cartModal = document.getElementById('cart-modal');
    if (event.target === cartModal) {
      closeCartModal();
    }
  });

  // Load cart data from local storage when the page loads
  loadCartFromLocalStorage();
});

function showCartModal() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.style.display = 'block';
  }
}

function closeCartModal() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.style.display = 'none';
  }
}

function addToCartClicked(event) {
  event.preventDefault();
  const button = event.target;
  const shopItem = button.closest('.shop-item');
  const title = shopItem.querySelector('.shop-item-title').innerText;
  const price = shopItem.querySelector('.shop-item-price').innerText;
  const imageSrc = shopItem.querySelector('.shop-item-image').src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
  saveCartToLocalStorage();
}

function addItemToCart(title, price, imageSrc) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item is already in the cart
  const existingItem = cart.find(item => item.title === title);
  if (existingItem) {
    alert('This item is already added to the cart');
    return;
  }

  // Add new item to the cart
  cart.push({ title, price, imageSrc, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart display in the header
  updateCartDisplay();
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  localStorage.removeItem('cart');
  updateCartTotal();
  updateCartDisplay();
}

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;
  cart.forEach(item => {
    const price = parseFloat(item.price.replace('£', ''));
    total += price * item.quantity;
  });

  const cartTotalPriceElement = document.querySelector('.cart-total-price');
  if (cartTotalPriceElement) {
    cartTotalPriceElement.innerText = '£' + total.toFixed(2);
  }
  }


function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';

  cart.forEach(item => {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
          <span class="cart-item-title">${item.title}</span>
      </div>
      <span class="cart-price cart-column">${item.price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="${item.quantity}">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItemsContainer.append(cartRow);

    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
  });
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  const cartRow = buttonClicked.closest('.cart-row');
  const title = cartRow.querySelector('.cart-item-title').innerText;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.title !== title);
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartTotal();
  updateCartDisplay();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  const cartRow = input.closest('.cart-row');
  const title = cartRow.querySelector('.cart-item-title').innerText;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.title === title);
  if (item) {
    item.quantity = input.value;
  }
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartTotal();
  updateCartDisplay();
}

// Load cart data from local storage
function loadCartFromLocalStorage() {
  updateCartTotal();
  updateCartDisplay();
}