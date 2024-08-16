export function showPaymentModal() {
    console.log('Showing payment modal');
    let paymentModal = document.getElementById('payment-modal');
    
    if (!paymentModal) {
        paymentModal = document.createElement('div');
        paymentModal.id = 'payment-modal';
        paymentModal.className = 'modal';
        document.body.appendChild(paymentModal);
    }

    const paymentModalContent = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Delivery Information</h2>
            <form id="delivery-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-cancel">Cancel</button>
            </form>
        </div>
    `;

    paymentModal.innerHTML = paymentModalContent;
    paymentModal.style.display = 'block';

    // Function to close the payment modal
    function closePaymentModal() {
        if (paymentModal) {
            paymentModal.style.display = 'none';
        }
    }

    // Add event listener for the delivery form submission
    const deliveryForm = document.getElementById('delivery-form');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', handleDeliveryFormSubmit);
    }

    // Add event listener for the cancel button
    const cancelButton = document.querySelector('.btn-cancel');
    if (cancelButton) {
        cancelButton.addEventListener('click', closePaymentModal);
    }

    // Add event listener for the close button
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closePaymentModal);
    }

    // Add event listener for clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === paymentModal) {
            closePaymentModal();
        }
    });
}

function handleDeliveryFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    // Process the delivery information
    console.log('Delivery Information:', { name, address, email });

    // Clear the cart and close the payment modal
    const cartItems = document.querySelector('.cart-items');
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    saveCartToLocalStorage();
    closePaymentModal();

    alert('Thank you for your purchase! Your items will be delivered soon.');
}

function closePaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
}