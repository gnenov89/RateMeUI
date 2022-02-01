import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeebackContext = createContext()

export const FeedbackProvider = ({ children }) => {



  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from Context ',
      rating: 10
    }
  ])

  const addFeedback = (newFeedback) => {
    newFeedback.id = parseFloat(uuidv4(), 10)
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }

  }

  return (<FeebackContext.Provider value={{
    feedback,
    addFeedback,
    deleteFeedback,
  }}>
    {children}
  </FeebackContext.Provider>
  )
}

export default FeebackContext