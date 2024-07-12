import axios from 'axios';
import { signServiceRequest, signTokenRequest } from './signRequest';

const fetchWithSignature = async (url, method, data, accessToken = null) => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const timestamp = Date.now().toString();

  const headers = {
    'Content-Type': 'application/json',
    'client_id': clientId,
    't': timestamp,
    'sign_method': 'HMAC-SHA256',
  };

  if (accessToken) {
    const sign = signServiceRequest(clientId, accessToken, timestamp, clientSecret);
    headers['sign'] = sign;
  } else {
    const sign = signTokenRequest(clientId, timestamp, clientSecret);
    headers['sign'] = sign;
  }

  try {
    const response = await axios({
      url,
      method,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export default fetchWithSignature;
