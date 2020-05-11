import React, { useState, useEffect } from 'react'
import { showStatus } from '../../api/status'

const ShowStatus = props => {
  const [status, setstatus] = useState({})

  useEffect(() => {
    showStatus(props.match.params.id)
      .then(res => {
        setstatus(res.data.status)
      })
      .catch(console.error)
  }, [])

  let comment = []
  let review = []
  if (status.comment) {
    comment = status.comment.map(comment => (
      <div key={comment.name}>
        {comment.name}:{comment.message}
      </div>
    ))
  }
  if (status.review) {
    review = status.review.reduce(function (a, b) {
      return a + b
    }, 0)

    review = review / status.review.length
  }

  return (
    <div>
      <h2>{status.title}</h2>
      <h4>review: {review}</h4>
      <h4>comment :{comment}</h4>
    </div>
  )
}
export default ShowStatus
