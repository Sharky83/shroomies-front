document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('app-header');

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
        <button type="button" class="btn btn-header" id="cart-button">Basket <span id="cart-total">£0.00</span></button>
    `;

    header.innerHTML = headerContent;

    // Modal functionality
    const cartButton = document.getElementById('cart-button');
    const modal = document.getElementById('cart-modal');
    const closeButton = document.getElementsByClassName('close')[0];

    cartButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
