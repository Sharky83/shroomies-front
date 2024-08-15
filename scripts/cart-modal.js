document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.getElementById('cart-modal');
  
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
  
    cartModal.innerHTML = cartModalContent;
  });