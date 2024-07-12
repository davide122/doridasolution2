const crypto = require('crypto');

// Function to pad text for AES encryption
function pad(text) {
  const blockSize = 16;
  const paddingSize = blockSize - (text.length % blockSize);
  const padding = String.fromCharCode(paddingSize).repeat(paddingSize);
  return text + padding;
}

// Function to encrypt the password
function encryptPassword(password, key) {
  const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(key, 'hex'), null);
  let encrypted = cipher.update(pad(password), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

module.exports = encryptPassword;
