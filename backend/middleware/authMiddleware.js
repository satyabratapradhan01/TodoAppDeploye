// ===========================================
// middleware/authMiddleware.js - Authentication Middleware
// ===========================================
// This middleware PROTECTS routes by verifying the JWT token.
// Any route that uses this middleware requires the user to be logged in.
//
// HOW IT WORKS (step by step):
// 1. Read the JWT from the HTTP-only cookie (req.cookies.jwt)
// 2. Verify the JWT using the secret key (jwt.verify)
// 3. Decode the userId from the token payload
// 4. Find the user in the database using that userId
// 5. Attach the user object to req.user (so route handlers can use it)
// 6. Call next() to pass control to the next middleware/route handler
//
// If ANY step fails, the request is rejected with a 401 Unauthorized response.
//
// USAGE IN ROUTES:
//   router.get('/protected-route', protect, (req, res) => {
//     // req.user is available here because protect middleware set it
//     res.json({ user: req.user });
//   });

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try {
    // Step 1: Read the JWT from the cookie
    // The cookie was set by generateToken() during login/register
    const token = req.cookies.jwt;

    // If no token exists, the user hasn't logged in (or the cookie expired)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided. Please log in.',
      });
    }

    // Step 2: Verify the token
    // jwt.verify() does two things:
    //   a) Checks if the token was signed with our JWT_SECRET
    //   b) Checks if the token has expired
    // If either check fails, it throws an error (caught by the catch block)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3 & 4: Find the user in the database
    // decoded.userId comes from the payload we set in generateToken()
    // .select('-password') excludes the password field from the query result
    // This ensures the password hash is NEVER sent in API responses
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - User no longer exists',
      });
    }

    // Step 5: Attach the user to the request object
    // Now any subsequent middleware or route handler can access req.user
    req.user = user;

    // Step 6: Move to the next middleware or route handler
    next();
  } catch (error) {
    // This catches jwt.verify() errors (invalid token, expired token, etc.)
    return res.status(401).json({
      success: false,
      message: 'Not authorized - Invalid or expired token',
    });
  }
};

export default protect;
