import Card from './shared/Card'
import Button from './shared/Button'
import { useState, useContext } from 'react'
import RatingSelect from './RatingSelect'
import FeedbackContext from './state/FeedbackContext'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState('10')
  const [btnDisabled, setButtonDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback } = useContext(FeedbackContext)

  const handleTextChange = (e) => {
    if (text === '') {
      setButtonDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setButtonDisabled(true)
      setMessage('Type at least 10 characters please')
    } else {
      setMessage(null)
      setButtonDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }
      addFeedback(newFeedback)
      setText('')
    }
  }

  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit}>
          <h2>How Would You Rate Your Service With Us</h2>
          <RatingSelect select={(rating) => setRating(rating)} />
          <div className='input-group'>
            <input onChange={handleTextChange}
              type='text'
              placeholder='Write a review'
              value={text}
            />
            <Button type='submit' version='secondary' isDisabled={btnDisabled}>Send</Button>
          </div>
          {message && <div className='message'>{message}</div>}
        </form>
      </Card>

    </div>
  )
}

export default FeedbackForm
