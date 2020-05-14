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

  let reviewjsx = []

  const review = status => {
    reviewjsx = status.review.reduce(function (a, b) {
      return a + b.point
    }, 0)
    reviewjsx = reviewjsx / status.review.length
    if (Number.isNaN(reviewjsx)) {
      return (reviewjsx = 'no rating')
    } else {
      return reviewjsx
    }
  }

  let status1 = ''

  if (status) {
    status1 = status.map(status => (
      <div style={indexStyles} key={status._id}>
        <Link to={`/status/${status._id}`}>
          <h3> {status.title} </h3>
          <h4> Rating: {review(status)} </h4>
        </Link>
      </div>
    ))
  }
  if (status1.length === 0) {
    status1 = (
      <div>
        <h2>create a review</h2>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font1">All Reviews</h2>
      <h3>{status1}</h3>
    </div>
  )
}
export default IndexStatus
