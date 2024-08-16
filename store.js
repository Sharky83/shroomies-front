document.addEventListener('DOMContentLoaded', function() {
    // Load products from JSON file
    fetch('./products.json')
        .then(response => response.json())
        .then(products => {
            const sporesItemsContainer = document.getElementById('spores-items');
            const liquidCultureItemsContainer = document.getElementById('liquid-culture-items');

            products.forEach(product => {
                const productElement = createProductElement(product);
                if (product.category === 'Spores') {
                    sporesItemsContainer.appendChild(productElement);
                } else if (product.category === 'Liquid Culture') {
                    liquidCultureItemsContainer.appendChild(productElement);
                }
            });

            // Add event listeners to dynamically created buttons
            const addToCartButtons = document.querySelectorAll('.shop-item-button');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCartClicked);
            });
        })
        .catch(error => console.error('Error loading products:', error));

    // Load cart data from local storage when the page loads
    loadCartFromLocalStorage();
});

function createProductElement(product) {
    const productLink = document.createElement('a');
    productLink.href = `product_item.html?id=${product.id}`;
    productLink.className = 'shop-item-link';

    const productDiv = document.createElement('div');
    productDiv.className = 'shop-item';

    const productImage = document.createElement('img');
    productImage.className = 'shop-item-image';
    productImage.src = product.image;

    const productTitle = document.createElement('span');
    productTitle.className = 'shop-item-title';
    productTitle.textContent = product.title;

    const productDetails = document.createElement('div');
    productDetails.className = 'shop-item-details';

    const productPrice = document.createElement('span');
    productPrice.className = 'shop-item-price';
    productPrice.textContent = product.price;

    const addButton = document.createElement('button');
    addButton.className = 'btn btn-primary shop-item-button';
    addButton.type = 'button';
    addButton.textContent = 'ADD TO CART';

    productDetails.appendChild(productPrice);
    productDetails.appendChild(addButton);

    productDiv.appendChild(productImage);
    productDiv.appendChild(productTitle);
    productDiv.appendChild(productDetails);

    productLink.appendChild(productDiv);

    return productLink;
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

    const basketTotalPriceElement = document.querySelector('.basket-total-price');
    if (basketTotalPriceElement) {
        basketTotalPriceElement.innerText = total.toFixed(2);
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