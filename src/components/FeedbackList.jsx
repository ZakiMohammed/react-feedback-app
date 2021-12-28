import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {

    const { feedbacks } = useContext(FeedbackContext)

    if (feedbacks.length === 0) {
        return <p>No Feedbacks Yets</p>
    }

    return (
        <div className='feedback-list'>
            <AnimatePresence>
                {feedbacks.map(feedback => (
                    <motion.div
                        key={feedback.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <FeedbackItem
                            key={feedback.id}
                            feedback={feedback} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default FeedbackList
