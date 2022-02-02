import { createContext, useState, use, useEffect } from 'react'


const FeebackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([

  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback from backend 
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newFeedback),
      })

    const data = await response.json()

    setFeedback([data, ...feedback])
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
    isLoading,
  }}>
    {children}
  </FeebackContext.Provider>
  )
}

export default FeebackContext