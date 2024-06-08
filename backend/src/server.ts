// server.ts
// Import libraries
import express from 'express';

// Use environmental variables
require("dotenv").config()

// Create express app
const app = express();

// Use port specified in environmental variables or 3000 
const port = process.env.PORT || 3000;

app.listen(port, () => {
  return console.log(`Express is listening on port ${port}`);
});