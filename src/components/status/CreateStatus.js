import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createStatus } from '../../api/status'
import { textareaStyles, buttonStyle } from './style'

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
        <label>
          <h2>Add Game To Review</h2>
        </label>
        <br />
        <textarea
          required="required"
          style={textareaStyles}
          placeholder="Game Title"
          value={status.title}
          name="title"
          onChange={handleChange}
        />
        <br />

        <button style={buttonStyle} type="submit">
          Submit{reviewjsx}
        </button>
      </form>
    </div>
  )
}

export default CreateStatus
