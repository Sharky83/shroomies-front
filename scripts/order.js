// Function to copy the crypto address to the clipboard
function copyCryptoAddress() {
    const cryptoAddressInput = document.getElementById('crypto-address');
    cryptoAddressInput.select();
    cryptoAddressInput.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(cryptoAddressInput.value).then(() => {
        alert('Crypto address copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Add event listener for the copy button
document.addEventListener('DOMContentLoaded', function () {
    const copyButton = document.querySelector('.copy-qr-button');
    if (copyButton) {
        copyButton.addEventListener('click', copyCryptoAddress);
    }
});