document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    createCartModal();
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
                <span class="cart-total-price">$0.00</span>
            </div>
            <button class="btn purchase-button">Purchase</button>
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
}