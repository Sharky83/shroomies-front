document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.shop-item-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartClicked);
    });

    const purchaseButton = document.querySelector('.btn-purchase');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', purchaseClicked);
    }

    const removeCartItemButtons = document.querySelectorAll('.btn-danger');
    removeCartItemButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
    });

    const basketButton = document.getElementById('basket-button');
    if (basketButton) {
        basketButton.addEventListener('click', openCartModal);
    }
});

function addToCartClicked(event) {
    event.preventDefault();
    const button = event.target;
    const shopItem = button.closest('.shop-item');
    const title = shopItem.querySelector('.shop-item-title').innerText;
    const price = shopItem.querySelector('.shop-item-price').innerText;
    const imageSrc = shopItem.querySelector('.shop-item-image').src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartItems = document.querySelector('.cart-items');
    const cartItemNames = cartItems.querySelectorAll('.cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
}

function purchaseClicked() {
    alert('Thank you for your purchase');
    const cartItems = document.querySelector('.cart-items');
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    closeCartModal();
}

function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.cart-row').remove();
    updateCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    const cartItemContainer = document.querySelector('.cart-items');
    const cartRows = cartItemContainer.querySelectorAll('.cart-row');
    let total = 0;
    cartRows.forEach(cartRow => {
        const priceElement = cartRow.querySelector('.cart-price');
        const quantityElement = cartRow.querySelector('.cart-quantity-input');
        const price = parseFloat(priceElement.innerText.replace('£', ''));
        const quantity = quantityElement.value;
        total += price * quantity;
    });
    document.querySelector('.cart-total-price').innerText = '£' + total.toFixed(2);
    document.querySelector('.basket-total-price').innerText = total.toFixed(2);
}

function openCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('Cart modal element not found');
    }
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error('Cart modal element not found');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};