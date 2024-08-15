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

  // Modal functionality
  const basketButton = document.getElementById("basket-button");
  const modal = document.getElementById("cart-modal");
  const closeButton = document.getElementsByClassName("close")[0];

  if (basketButton) {
    basketButton.addEventListener("click", function () {
      if (modal) {
        modal.style.display = "block";
      } else {
        console.error('Modal element not found');
      }
    });
  } else {
    console.error('Basket button element not found');
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      if (modal) {
        modal.style.display = "none";
      } else {
        console.error('Modal element not found');
      }
    });
  } else {
    console.error('Close button element not found');
  }

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});