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
  // *****************
  const styles = {
    color: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
    border: '2px solid red',
    margin: '10px'
  }
  // ************
  const status1 = status.map(status => (
    <div style={styles} key={status._id}>
      <Link to={`/status/${status._id}`}>
        <h3>
          {' '}
          {console.log(status)}
          {status.title}{' '}
        </h3>
      </Link>
    </div>
  ))

  return (
    <div>
      <h4>status</h4>
      <ul>{status1}</ul>
    </div>
  )
}
export default IndexStatus
