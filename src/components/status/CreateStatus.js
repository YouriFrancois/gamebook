import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import { createStatus } from '../../api/status'
import messages from '../AutoDismissAlert/messages'

const CreateStatus = props => {
  const { msgAlert, history, user } = props

  const [status, setstatus] = useState({
    title: '',
    comment: [
      { name: user.email, message: '1 item' },
      { name: user.email, message: '2 item' }
    ],
    review: [1, 2]
  })
  // *************************************
  const handleChange = event => {
    event.persist()
    // setstatus(event.target.value)
    setstatus(status => ({
      ...status,
      [event.target.name]: event.target.value
    }))
  }
  // *************************************
  const handleSubmit = event => {
    event.preventDefault()

    createStatus(status, user)
      .then(() =>
        msgAlert({
          heading: 'status Success',
          message: messages.newStatusSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/'))
      .catch(error => {
        setstatus('')
        msgAlert({
          heading: 'status Failed with error: ' + error.message,
          message: messages.newStatusFailure,
          variant: 'danger'
        })
      })
  }
  // *************************************
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>create status</label>
        <br />
        <input
          placeholder="A Wonderful Film"
          value={status.title}
          name="title"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateStatus
