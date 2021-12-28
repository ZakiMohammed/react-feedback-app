import { createContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'
import { v4 as uuidV4 } from 'uuid';

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

    const [feedbacks, setFeedback] = useState(FeedbackData)
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: null,
        edit: false
    })

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedbacks.filter(i => i.id !== id))
        }
    }
    const addFeedback = (feedback) => {
        feedback.id = uuidV4();
        setFeedback([feedback, ...feedbacks])
    }
    const editFeedback = (feedback, edit = true) => {
        setFeedbackEdit({
            item: feedback,
            edit: edit
        })
    }
    const updateFeedback = (id, newFeedback) => {
        setFeedback(feedbacks.map(i => (
            i.id === id ? { ...i, ...newFeedback } : i
        )))
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedbacks,
                deleteFeedback,
                addFeedback,
                editFeedback,
                feedbackEdit,
                updateFeedback
            }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext