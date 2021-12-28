import { createContext, useState, useEffect } from 'react'
import { Spinner } from '../components/Spinner'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

    const apiRoute = 'feedbacks'
    const [loader, setLoader] = useState(false)
    const [feedbacks, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: null,
        edit: false
    })

    useEffect(async () => {
        setLoader(true)
        const response = await fetch(`${apiRoute}?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setLoader(false)
    }, [])

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setLoader(true)
            const response = await fetch(`${apiRoute}/${id}`, { method: 'DELETE' })
            if (response.status === 200) {
                setFeedback(feedbacks.filter(i => i.id !== id))
            } else {
                alert(`Something went wrong [${response.status}]`)
            }
            setLoader(false)
        }
    }
    const addFeedback = async feedback => {
        setLoader(true)
        const response = await fetch(apiRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })

        if (response.status === 201) {
            const data = await response.json()
            setFeedback([data, ...feedbacks])
        } else {
            alert(`Something went wrong [${response.status}]`)
        }

        setLoader(false)
    }
    const editFeedback = (feedback, edit = true) => {
        setFeedbackEdit({
            item: feedback,
            edit: edit
        })
    }
    const updateFeedback = async (id, newFeedback) => {
        setLoader(true)
        const response = await fetch(`${apiRoute}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        if (response.status === 200) {
            const data = await response.json()
            setFeedback(feedbacks.map(i => (
                i.id === id ? { ...i, ...data } : i
            )))
        } else {
            alert(`Something went wrong [${response.status}]`)
        }
        setLoader(false)
    }

    const value = {
        feedbacks,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        loader,
    };

    return (
        <FeedbackContext.Provider
            value={value}>
            {children}
            {loader && <Spinner />}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext