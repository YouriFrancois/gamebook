import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createStatus } from '../../api/status'
// import messages from '../AutoDismissAlert/messages'

const CreateStatus = props => {
  const { user } = props
  const [create, setcreate] = useState(false)

  const [status, setstatus] = useState({
    title: ''
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
      .then(res => {
        setcreate(res.data.status)
        console.log('this is ', res.data.status)
      })
      .catch(console.error)
  }
  // *************************************
  let reviewjsx = ''
  if (create) {
    return (reviewjsx = <Redirect to={'/status/' + create._id} />)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>create status</label>
        <br />
        <input
          placeholder="create a status"
          value={status.title}
          name="title"
          onChange={handleChange}
        />
        <button type="submit">Submit{reviewjsx}</button>
      </form>
    </div>
  )
}

export default CreateStatus
