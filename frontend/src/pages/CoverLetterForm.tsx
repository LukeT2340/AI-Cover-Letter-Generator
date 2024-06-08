import { useState } from "react"
import styles from "./CoverLetter.module.scss"
import { Form } from "react-bootstrap"
import CoverLetterHook from "../hooks/CoverLetterHook"

const CoverLetterForm = () => {
    const [resume, setResume] = useState<File>() // pdf/png resume file
    const [jobDescription, setJobDescription] = useState<string>("") // job description
    const [error, setError] = useState<string>("")
    const { coverLetter, isLoading, getCoverLetter } = CoverLetterHook(setError)

    // submit form
    const submitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if (!resume) {
            setError("Pleaase add a resume")
            return
        }
        await getCoverLetter(resume, jobDescription)
    };

    return (
        <div className={styles.coverLetterFormContainer}>
            <Form onSubmit={submitForm}>
                <Form.Group className={styles.formGroup}>
                <label htmlFor="resume" className={styles.labelFile}>
                    Upload Resume (PDF/PNG)
                </label>
                <input
                    type="file"
                    accept=".pdf,.png"
                    id="resume"
                    className={styles.inputFile}
                    onChange={e => {
                        const file = e.target.files?.[0];
                        setResume(file);
                    }}
                />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                <Form.Label>
                    Copy and paste the job description from the job posting.
                </Form.Label>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                <button type="submit" disabled={isLoading}>Submit</button>
                </Form.Group>
            </Form>
            {error && (
                <p>{error}</p>
            )}
            {coverLetter && (
                <p>{coverLetter}</p>
            )}
        </div>
    )
}

export default CoverLetterForm;
