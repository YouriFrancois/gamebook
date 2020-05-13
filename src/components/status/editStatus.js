import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { update, showStatus } from '../../api/status'
import { textareaStyles, buttonStyle } from './style'

const EditStatus = props => {
  const { user } = props
  const [create, setcreate] = useState(false)

  const [status, setstatus] = useState({
    title: ''
  })
  //* ***********************************
  useEffect(() => {
    showStatus(props.match.params.id)
      .then(res => {
        setstatus(res.data.status)
      })
      .catch(console.error)
  }, [])
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

    update(status.title, user, props.match.params.id)
      .then(res => {
        setcreate(true)
      })
      .catch(console.error)
  }
  // *************************************
  let reviewjsx = ''
  if (create) {
    return (reviewjsx = <Redirect to={'/status/' + props.match.params.id} />)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>write a game review</h2>
        </label>
        <br />
        <textarea
          style={textareaStyles}
          placeholder="create a status"
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

export default EditStatus
