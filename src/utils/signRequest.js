const crypto = require('crypto');

// Function to generate a signature for token management operations
function signTokenRequest(clientId, timestamp, clientSecret) {
  const message = `${clientId}${timestamp}`;
  return crypto.createHmac('sha256', clientSecret).update(message).digest('hex').toUpperCase();
}

// Function to generate a signature for service management operations
function signServiceRequest(clientId, accessToken, timestamp, clientSecret) {
  const message = `${clientId}${accessToken}${timestamp}`;
  return crypto.createHmac('sha256', clientSecret).update(message).digest('hex').toUpperCase();
}

module.exports = { signTokenRequest, signServiceRequest };
