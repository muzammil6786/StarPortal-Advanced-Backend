const axios = require('axios');

const authServiceUrl = process.env.AUTH_SERVICE_URL;

async function getUserById(userId) {
  try {
    const response = await axios.get(`${authServiceUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user from auth service:', error);
    throw error;
  }
}

module.exports = {
  getUserById
};
