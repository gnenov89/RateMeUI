import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeebackContext = createContext()

export const FeedbackProvider = ({ children }) => {



  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback item 1',
      rating: 10
    },
    {
      id: 2,
      text: 'This is feedback item 2',
      rating: 9
    },
    {
      id: 3,
      text: 'This is feedback item 3',
      rating: 7
    }
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  const addFeedback = (newFeedback) => {
    newFeedback.id = parseFloat(uuidv4(), 10)
    setFeedback([newFeedback, ...feedback])
  }
  // Add feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }

  }

  // Update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {
      ...item, ...updItem
    } : item))
  }
  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return (<FeebackContext.Provider value={{
    feedback,
    feedbackEdit,
    addFeedback,
    deleteFeedback,
    editFeedback,
    updateFeedback,
  }}>
    {children}
  </FeebackContext.Provider>
  )
}

export default FeebackContext