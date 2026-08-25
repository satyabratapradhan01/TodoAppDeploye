// ===========================================
// middleware/errorMiddleware.js - Error Handling Middleware
// ===========================================
// These middleware functions handle errors consistently across the API.
//
// HOW EXPRESS ERROR HANDLING WORKS:
// - Normal middleware: (req, res, next) - 3 arguments
// - Error middleware: (err, req, res, next) - 4 arguments
// - Express automatically routes errors to 4-argument middleware
// - When you call next(error) or throw an error, Express skips to error middleware
//
// We handle two scenarios:
// 1. notFound: when no route matches the request URL (404)
// 2. errorHandler: when any error is thrown during request processing

// ---- 404 NOT FOUND ----
// This middleware runs after all routes have been checked
// If no route matched, this creates a 404 error
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the errorHandler below
};

// ---- GLOBAL ERROR HANDLER ----
// This catches ALL errors thrown anywhere in the application
// It sends a consistent JSON error response
const errorHandler = (err, req, res, next) => {
  // If the status code is still 200 (default), something went wrong - use 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // ---- Handle Specific Error Types ----

  // 1. Invalid MongoDB ObjectId
  //    Happens when someone requests /api/tasks/not-a-valid-id
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found - Invalid ID format';
    statusCode = 404;
  }

  // 2. Mongoose Validation Error
  //    Happens when required fields are missing or values don't match schema rules
  if (err.name === 'ValidationError') {
    // Collect all validation error messages into a single string
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    statusCode = 400;
  }

  // 3. MongoDB Duplicate Key Error
  //    Happens when trying to create a document with a unique field that already exists
  //    (e.g., registering with an email that's already taken)
  if (err.code === 11000) {
    message = 'Duplicate field value - This record already exists';
    statusCode = 400;
  }

  // Send the error response in our standard format
  res.status(statusCode).json({
    success: false,
    message,
    // Only include the stack trace in development mode (helpful for debugging)
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export { notFound, errorHandler };
