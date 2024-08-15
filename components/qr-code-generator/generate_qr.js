const QRCode = require('qrcode');
const path = require('path');


// Data to be encoded
const data = 'https://mycopunks.com/';

// Define the file path
const filePath = path.join(__dirname, 'output', 'qrcode.png');

// Generate QR code and save it as an image
QRCode.toFile(filePath, data, {
  color: {
    dark: '#000000',  // QR code color
    light: '#ffffff'  // Background color
  }
}, function (err) {
  if (err) throw err;
  console.log(`QR code generated and saved as ${filePath}`);
});