// server.ts
// Import libraries
import express from 'express'
import cors from "cors"

// Import routers
const coverLetterRouter = require('./routes/coverLetterRouter')

// Use environmental variables
require("dotenv").config()

// Create express app
const app = express();

// Use cors
app.use(cors({
  origin: process.env.REACT_APP_URL, 
  credentials: true,
}))

// Use cover letter routes
app.use("/api/coverLetter", coverLetterRouter)

// Use port specified in environmental variables or 3000 
const port = process.env.PORT || 3000;

app.listen(port, () => {
  return console.log(`Express is listening on port ${port}`);
});