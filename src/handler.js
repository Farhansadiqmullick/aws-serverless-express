const serverless = require('serverless-http');
const app = require('./app');

// Wrap Express app with serverless-http for Lambda compatibility
const handler = serverless(app);

// Export the Lambda handler
module.exports.handler = async (event, context) => {
  // You can do any pre-processing here if needed
  const result = await handler(event, context);
  
  // You can do any post-processing here if needed
  return result;
};