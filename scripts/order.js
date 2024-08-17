document.getElementById("next-step").addEventListener("click", function () {
  document.getElementById("order-form").style.display = "none";
  document.getElementById("payment-form").style.display = "block";
});

document.getElementById("previous-step").addEventListener("click", function () {
  document.getElementById("payment-form").style.display = "none";
  document.getElementById("order-form").style.display = "block";
});

document.getElementById("cancel").addEventListener("click", function () {
  document.getElementById("order-form").reset();
});

document
  .getElementById("cancel-payment")
  .addEventListener("click", function () {
    document.getElementById("payment-form").reset();
    document.getElementById("payment-form").style.display = "none";
    document.getElementById("order-form").style.display = "block";
  });

document.getElementById("crypto").addEventListener("change", function () {
  const crypto = this.value;
  const qrCode = document.getElementById("qr-code");
  const cryptoAddress = document.getElementById("crypto-address");

  if (crypto === "btc") {
    qrCode.src = "images/btc-qr-code.png";
    cryptoAddress.value = "1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71";
  } else if (crypto === "usdt") {
    qrCode.src = "images/usdt-qr-code.png";
    cryptoAddress.value = "0x3e4d9c2d7c7b6d3e3cb4cfe4f1b1f2b3ae9d0e6a";
  } else if (crypto === "monero") {
    qrCode.src = "images/monero-qr-code.png";
    cryptoAddress.value =
      "45GjcbHh1fvEyXEA6mDAKqNDMmy1Gon6CNHrdhp9hghfLXQNQj4J76TLtwYGoooKApWLM7kaZwdAxLycceHmuVcELCSFPHq";
  }

});

// copy crypto address to clipboard

document.addEventListener('DOMContentLoaded', function () {
  const copyButton = document.getElementById('copy-address');
  const cryptoAddressInput = document.getElementById('crypto-address');

  copyButton.addEventListener('click', function () {
      const cryptoAddress = cryptoAddressInput.value;

      if (cryptoAddress) {
          navigator.clipboard.writeText(cryptoAddress).then(function () {
              console.log('Crypto address copied to clipboard');
              alert('Crypto address copied to clipboard');
          }).catch(function (error) {
              console.error('Error copying crypto address: ', error);
              alert('Failed to copy crypto address');
          });
      } else {
          alert('No crypto address to copy');
      }
  });
});


