import { FaTimes, FaEdit } from "react-icons/fa";
import Card from "./shared/Card";
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem({ feedback }) {
    
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

    return (
        <Card>
            <div className='num-display'>{feedback.rating}</div>
            <button className='close' onClick={() => deleteFeedback(feedback.id)}>
                <FaTimes color='purple'></FaTimes>
            </button>
            <button className='edit' onClick={() => editFeedback(feedback)}>
                <FaEdit color='purple'></FaEdit>
            </button>
            <div className='text-display'>{feedback.text}</div>
        </Card>
    )
}

export default FeedbackItem
