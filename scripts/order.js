<!DOCTYPE html>
<html>
  <head>
    <title>The Shroomies - Order Page</title>
    <meta name="description" content="Order your favorite courses" />
    <link rel="stylesheet" href="./styles.css">
    <link rel="stylesheet" href="./css/orderPage.css" />
    <script defer src="./store.js"></script>
    <script defer src="./scripts/order.js"></script>
  </head>
  <body>
    <header id="app-header" class="main-header">
      <script defer src="./scripts/header.js"></script>
      <script type="module" src="./scripts/cart-modal.js" defer></script>
    </header>

    <main class="main-content">
      <section class="content-section container">
        <h2 class="section-header">Order Page</h2>
        <div class="order-form-container">
          <form class="order-form" id="order-form">
            <h2>Delivery & Payment Details</h2>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
              <label for="phone">Number</label>
              <input type="phone" id="phone" name="phone" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" name="address" required />
            </div>
            <div class="form-group">
              <label for="postal-code">Postal Code</label>
              <input type="text" id="postal-code" name="postal-code" class="postal-code" required />
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <select id="country" name="country" required>
                <option value="">Select Country</option>
                <option value="uk">United Kingdom</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <!-- Add more countries as needed -->
              </select>
            </div>
            <div class="form-group form-group-buttons">
              <button type="button" id="next-step">Next Step</button>
              <button type="button" id="cancel">Cancel</button>
            </div>
          </form>

          <form class="payment-form" id="payment-form" style="display: none;">
            <h2>Payment Details</h2>
            <div class="form-group">
              <label for="crypto">Select Cryptocurrency</label>
              <select id="crypto" name="crypto" required>
                <option value="btc">Bitcoin (BTC)</option>
                <option value="usdt">Tether (USDT)</option>
                <option value="monero">Monero (XMR)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="qr-code">QR Code</label>
              <img id="qr-code" src="" alt="QR Code" />
            </div>
            <div class="form-group">
              <label for="crypto-address">Crypto Address</label>
              <input type="text" id="crypto-address" name="crypto-address" readonly />
              <button type="button" id="copy-address" class="copy-button">Copy</button>
            </div>
            <div class="form-group form-group-buttons">
              <button type="button" id="previous-step">Previous</button>
              <button type="button" id="cancel-payment">Cancel</button>
              <button type="submit">Submit Payment</button>
            </div>
          </form>
        </div>
      </section>
    </main>

    <footer id="app-footer" class="main-footer">
      <script defer src="./scripts/footer.js"></script>
    </footer>

    <script>
      document.getElementById('next-step').addEventListener('click', function() {
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('payment-form').style.display = 'block';
      });

      document.getElementById('previous-step').addEventListener('click', function() {
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('order-form').style.display = 'block';
      });

      document.getElementById('cancel').addEventListener('click', function() {
        document.getElementById('order-form').reset();
      });

      document.getElementById('cancel-payment').addEventListener('click', function() {
        document.getElementById('payment-form').reset();
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('order-form').style.display = 'block';
      });

      document.getElementById('crypto').addEventListener('change', function() {
        const crypto = this.value;
        const qrCode = document.getElementById('qr-code');
        const cryptoAddress = document.getElementById('crypto-address');

        if (crypto === 'btc') {
          qrCode.src = 'images/btc-qr-code.png';
          cryptoAddress.value = '1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71';
        } else if (crypto === 'usdt') {
          qrCode.src = 'images/usdt-qr-code.png';
          cryptoAddress.value = '0x3e4d9c2d7c7b6d3e3cb4cfe4f1b1f2b3ae9d0e6a';
        } else if (crypto === 'monero') {
          qrCode.src = 'images/monero-qr-code.png';
          cryptoAddress.value = '45GjcbHh1fvEyXEA6mDAKqNDMmy1Gon6CNHrdhp9hghfLXQNQj4J76TLtwYGoooKApWLM7kaZwdAxLycceHmuVcELCSFPHq';
        }
      });
    </script>
  </body>
</html>