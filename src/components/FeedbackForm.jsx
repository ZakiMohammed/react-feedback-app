import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const [text, setText] = useState('')
    const [message, setMessage] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [rating, setRating] = useState(10);
    const { addFeedback, feedbackEdit, updateFeedback, editFeedback } = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if (text === '') {
            setMessage(null);
            setBtnDisabled(true);
        } else if (text !== '' && text.trim().length < 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value);
    }
    const handleRatingChange = (rating) => {
        setRating(rating);
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const newFeedback = { text, rating };

        if (feedbackEdit.edit) {
            updateFeedback(feedbackEdit.item.id, newFeedback)
        } else {
            addFeedback(newFeedback)
        }
        
        setText('')
        setRating(10)
        setBtnDisabled(true)
        
        editFeedback({}, false);
    }

    return (
        <Card>
            <form>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={handleRatingChange} />
                <div className='input-group'>
                    <input
                        onChange={handleTextChange}
                        type="text"
                        placeholder='Write a review'
                        value={text} />
                    <Button
                        type='submit' 
                        isDisabled={btnDisabled}
                        handleClick={handleSubmit}>Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
