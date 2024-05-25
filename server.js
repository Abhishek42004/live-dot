// Import the http module
const http = require('http');
require('dotenv').config();

// Define the port
const port = process.env.PORT || 8000; // Default to port 5000 if PORT environment variable is not set

// Create the server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Check if the request is for the root URL
  if (req.url === '/') {
    res.end('Hello World\n');
  } else {
    res.statusCode = 404;
    res.end('Not Found\n');
  }
});

// Make the server listen on the defined port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
