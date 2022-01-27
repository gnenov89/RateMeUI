import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import { useState } from 'react'
import FeedbackData from "./data/feedbackData"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import { v4 as uuidv4 } from 'uuid'
import About from "./pages/About"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [feedback, setFeedback] = useState
    (FeedbackData)


  const addFeedback = (newFeedback) => {
    newFeedback.id = parseFloat(uuidv4(), 10)
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }

  }

  return (
    <Router>
      <Header />

      <div className='container'>
        <Routes>
          <Route exact path='/' element={
            <>
              <FeedbackForm handleAdd={addFeedback} />
              <FeedbackStats feedback={feedback} />
              <FeedbackList
                feedback={feedback}
                handleDelete={deleteFeedback} />
            </>
          }>

          </Route>

          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App