document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    createCartModal();
    loadCartFromLocalStorage(); // Load cart data when the modal is created
});

function createCartModal() {
    console.log('Creating cart modal');
    let cartModal = document.getElementById('cart-modal');
    
    if (!cartModal) {
        cartModal = document.createElement('div');
        cartModal.id = 'cart-modal';
        cartModal.className = 'modal';
        document.body.appendChild(cartModal);
    }

    const cartModalContent = `
        <div class="modal-content">
            <span class="close-button" onclick="closeCartModal()">&times;</span>
            <h2>Your Cart</h2>
            <div class="cart-items"></div>
            <div class="cart-total">
                <strong>Total:</strong>
                <span class="cart-total-price">£0.00</span>
            </div>
            <button class="btn purchase-button">Proceed to checkout</button>
        </div>
    `;

    function closeCartModal() {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.style.display = 'none';
        }
    }

    cartModal.innerHTML = cartModalContent;
    console.log('Cart modal created');

    // Add event listener to the purchase button
    const purchaseButton = cartModal.querySelector('.purchase-button');
    purchaseButton.addEventListener('click', function () {
        window.location.href = 'orderPage.html'; // Update with the correct path to your order page
    });
}

// Function to show the cart modal
function showCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'block';
    }
}

// Function to load cart data from local storage and update the cart display
function loadCartFromLocalStorage() {
    updateCartDisplay();
    updateCartTotal();
}

// Function to update the cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) {
        console.error('Cart items container not found');
        return;
    }
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

// Function to update the cart total
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('£', ''));
        if (!isNaN(price)) {
            total += price * item.quantity;
        }
    });

    const cartTotalPriceElement = document.querySelector('.cart-total-price');
    if (cartTotalPriceElement) {
        cartTotalPriceElement.innerText = '£' + total.toFixed(2);
    }
}

// Function to remove an item from the cart
function removeCartItem(event) {
    const buttonClicked = event.target;
    const cartRow = buttonClicked.closest('.cart-row');
    const title = cartRow.querySelector('.cart-item-title').innerText;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartDisplay();
    updateCartTotal();
}

// Function to handle quantity changes
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

    updateCartDisplay();
    updateCartTotal();
}