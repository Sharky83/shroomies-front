document.addEventListener("DOMContentLoaded", function () {
  const nextStepButton = document.getElementById("next-step");
  const previousStepButton = document.getElementById("previous-step");
  const cancelOrderButton = document.getElementById("cancel");
  const cancelPaymentButton = document.getElementById("cancel-payment");
  const orderForm = document.getElementById("order-form");
  const paymentForm = document.getElementById("payment-form");
  const cryptoSelect = document.getElementById("crypto");
  const qrCodeImage = document.getElementById("qr-code");
  const cryptoAddressInput = document.getElementById("crypto-address");
  const copyButton = document.getElementById("copy-address");

  const cryptoData = {
    btc: {
      qrCode: "./images/btc-qr-code.png",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    },
    usdt: {
      qrCode: "./images/usdt-qr-code.png",
      address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    },
    monero: {
      qrCode: "./images/monero-qr-code.png",
      address: "44AFFq5kSiGBoZ...",
    },
  };

  nextStepButton.addEventListener("click", function () {
    orderForm.style.display = "none";
    paymentForm.style.display = "block";
  });

  previousStepButton.addEventListener("click", function () {
    paymentForm.style.display = "none";
    orderForm.style.display = "block";
  });

  cancelOrderButton.addEventListener("click", function () {
    orderForm.reset();
  });

  cancelPaymentButton.addEventListener("click", function () {
    paymentForm.reset();
    paymentForm.style.display = "none";
    orderForm.style.display = "block";
  });

  cryptoSelect.addEventListener("change", function () {
    const selectedCrypto = cryptoSelect.value;
    if (cryptoData[selectedCrypto]) {
      qrCodeImage.src = cryptoData[selectedCrypto].qrCode;
      cryptoAddressInput.value = cryptoData[selectedCrypto].address;
    } else {
      qrCodeImage.src = "./images/default-qr-code.png";
      cryptoAddressInput.value = "";
    }
  });

  copyButton.addEventListener("click", function () {
    const cryptoAddress = cryptoAddressInput.value;

    if (cryptoAddress) {
      navigator.clipboard
        .writeText(cryptoAddress)
        .then(function () {
          console.log("Crypto address copied to clipboard");
          alert("Crypto address copied to clipboard");
        })
        .catch(function (error) {
          console.error("Error copying crypto address: ", error);
          alert("Failed to copy crypto address");
        });
    } else {
      alert("No crypto address to copy");
    }
  });
});