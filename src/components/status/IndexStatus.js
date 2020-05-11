import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexStatus } from '../../api/status'

const IndexStatus = props => {
  const [status, setstatus] = useState([])
  const { user } = props

  useEffect(() => {
    indexStatus(user)
      .then(res => {
        setstatus(res.data.status)
      })
      .catch(console.error)
  }, [])

  // ************
  const status1 = status.map(status => (
    <li key={status._id}>
      <Link to={`/status/${status._id}`}> {status.title}</Link>
    </li>
  ))

  return (
    <div>
      <h4>status</h4>
      <ul>{status1}</ul>
    </div>
  )
}
export default IndexStatus
