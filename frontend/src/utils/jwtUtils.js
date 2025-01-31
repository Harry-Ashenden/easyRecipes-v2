import jwt_decode from 'jwt-decode';

// Decode JWT token
export const decodeJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

// Get user ID from the token (if valid)
export const getUserIdFromToken = (token) => {
  const decodedToken = decodeJwt(token);
  return decodedToken ? decodedToken.sub : null;  // Return user ID (sub) from the token
};
