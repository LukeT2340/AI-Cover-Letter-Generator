// Frontend: CoverLetterHook.js
import { useState } from "react"

interface CoverLetterHookInterface {
    coverLetter: string
    isLoading: boolean
    getCoverLetter: (resume: File, jobDescription: string) => Promise<void>
}

const CoverLetterHook = (setError: (error: string) => void): CoverLetterHookInterface => {
    const [coverLetter, setCoverLetter] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)

    const getCoverLetter = async (resume: File, jobDescription: string): Promise<void> => {
        setLoading(true)
        setError("")

        try {
            const formData = new FormData()
            formData.append("resume", resume)
            formData.append("jobDescription", jobDescription)

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/coverLetter/create`, {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to generate cover letter")
            }

            const data = await response.json()
            setCoverLetter(data.coverLetter)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("Unknown server error. Please try again later.")
            }
        } finally {
            setLoading(false)
        }
    }

    return { coverLetter, isLoading, getCoverLetter }
}

export default CoverLetterHook