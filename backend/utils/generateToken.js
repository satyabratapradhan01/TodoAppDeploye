// ===========================================
// utils/generateToken.js - JWT Token Generation
// ===========================================
// This utility creates a JWT (JSON Web Token) and stores it in an HTTP-only cookie.
//
// WHAT IS JWT?
// JWT is a compact, URL-safe token that contains encoded data (called "claims").
// It has three parts separated by dots: Header.Payload.Signature
//   - Header: contains the token type and signing algorithm
//   - Payload: contains the data (in our case, the userId)
//   - Signature: ensures the token hasn't been tampered with
//
// WHY HTTP-ONLY COOKIES?
// We store the JWT in an HTTP-only cookie instead of localStorage because:
// 1. HTTP-only cookies CANNOT be read by JavaScript (document.cookie won't show them)
// 2. This protects against XSS (Cross-Site Scripting) attacks
//    - Even if an attacker injects malicious JavaScript, they can't steal the token
// 3. The browser automatically sends cookies with every request to the same domain
// 4. localStorage can be read by ANY JavaScript running on the page
//
// ALTERNATIVES (and why we don't use them):
// - localStorage: vulnerable to XSS attacks
// - sessionStorage: same vulnerability, plus clears when tab closes
// - In-memory: lost on page refresh

import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // Create the JWT token
  // Arguments:
  //   1. Payload: { userId } - the data encoded in the token
  //   2. Secret: JWT_SECRET - a secret key used to sign the token
  //      (only the server knows this key, so only the server can create/verify tokens)
  //   3. Options: expiresIn - when the token expires (30 days)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set the token as an HTTP-only cookie on the response
  res.cookie('jwt', token, {
    httpOnly: true, // JavaScript cannot access this cookie (XSS protection)
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'strict', // Cookie only sent for same-site requests (CSRF protection)
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration: 30 days in milliseconds
  });
};

export default generateToken;
