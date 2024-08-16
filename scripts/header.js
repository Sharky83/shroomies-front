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
        <button id="basket-button" class="btn btn-primary basket-button" type="button">
            Basket Total: £<span class="basket-total-price">0.00</span>
        </button>
    `;

  header.innerHTML = headerContent;

  // Add event listener for the basket button
  const basketButton = document.getElementById("basket-button");
  basketButton.addEventListener("click", function () {
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