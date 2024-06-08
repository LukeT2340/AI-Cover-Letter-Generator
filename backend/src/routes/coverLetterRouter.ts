// coverLetterRouter.ts

// Import libraries
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import PDFParser from 'pdf-parse'
import multer, { Multer } from 'multer';
const OpenAI = require("openai")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// Initiate router
const router = express.Router()

// Convert bodies to json
router.use(bodyParser.urlencoded({ extended: true }))

// Uses chat GPTs API to generate cover letter
const generateCoverLetter = async (resumeContent: string, jobDescription: string) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

    try {
        const message = `Here is my Resume: ${resumeContent}.\n I want to apply for the following job: \n ${jobDescription}. \n Based on my resume, can you write a cover letter for me?`
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          temperature: 0,
          max_tokens: 1000,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.log(err)
    }
};

// Custom interface to include file property in Request
interface RequestWithFile extends Request {
    file: Multer.File; 
}

// Create cover letter
router.post('/create', upload.single('resume'), async (req: RequestWithFile, res: Response) => {
    try {
        const { jobDescription } = req.body
        const { path: resumePath } = req.file

        // Check if job description is provided
        if (!jobDescription) {
            throw new Error("No job description provided")
        }

        // Read resume file
        const resumeContent = await PDFParser(resumePath)

        // Check if resume content is available
        if (!resumeContent) {
            throw new Error("Failed to read resume file")
        }
        
        // Extract text
        const resumeText = resumeContent.text

        // Generate cover letter
        const coverLetter = await generateCoverLetter(resumeText, jobDescription)

        // Respond with generated cover letter
        res.status(200).json({ coverLetter })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message || "Internal server error" })
    }
})

module.exports = router