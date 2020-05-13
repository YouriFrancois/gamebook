import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexStatus } from '../../api/status'
import { indexStyles } from './style'

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
  // *****************

  // ************
  let status1 = (
    <div>
      <h2>create a review</h2>
    </div>
  )

  if (status) {
    status1 = status.map(status => (
      <div style={indexStyles} key={status._id}>
        <Link to={`/status/${status._id}`}>
          <h3> {status.title} </h3>
        </Link>
      </div>
    ))
  }

  return (
    <div>
      <h4>all Review</h4>
      <ul>{status1}</ul>
    </div>
  )
}
export default IndexStatus
