import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {

    const { feedbacks } = useContext(FeedbackContext)
    const sum = feedbacks.reduce((acc, crr) => acc + crr.rating, 0)
    const average = (sum / feedbacks.length).toFixed(1).replace(/[.,]0$/, '')

    return (
        <div className='feedback-stats'>
            <h4>{feedbacks.length} Reviews</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}

export default FeedbackStats
