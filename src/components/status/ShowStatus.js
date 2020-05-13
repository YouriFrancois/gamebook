import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import {
  showStatus,
  updatereview,
  updateComment,
  deleteReview
} from '../../api/status'

import { showStyles1, showStyles2 } from './style'

const ShowStatus = props => {
  let arr1 = ''
  const [status, setstatus] = useState({})
  const [deleted, setdeleted] = useState(false)
  const [comment, setcomment] = useState({
    name: props.user.email,
    message: ''
  })
  const [review, setreview] = useState({
    name: props.user.email,
    point: ''
  })

  useEffect(() => {
    showStatus(props.match.params.id)
      .then(res => {
        setstatus(res.data.status)
      })
      .catch(console.error)
  }, [comment.message, review.point])
  //= ==================================================================
  let comments = []
  let reviewjsx = 'no review '
  console.log('this is', status.review)
  if (status.comment) {
    comments = status.comment.map(comments => (
      <div key={comments._id}>
        {comments.name}:{comments.message}
      </div>
    ))
  }
  if (status.review) {
    console.log(status.review.length < 1)
    console.log('this ', status.review.length)
    status.review.forEach(review => {
      arr1 = review.name
    })
    arr1.includes(props.user.email)

    reviewjsx = status.review.reduce(function (a, b) {
      return a + b.point
    }, 0)

    reviewjsx = reviewjsx / status.review.length
    if (Number.isNaN(reviewjsx)) {
      reviewjsx = 'no review '
    }
  }
  //= =================================================================
  const handleChange = event => {
    event.persist()
    // setstatus(event.target.value)
    setcomment(comment => ({
      ...comment,
      [event.target.name]: event.target.value
    }))

    setreview(review => ({
      ...review,
      [event.target.name]: event.target.value
    }))
  }
  // ---------------------------------------------
  const handleSubmit = event => {
    event.preventDefault()
    updateComment(comment, props.user, props.match.params.id).then(res => {
      setcomment(comment => ({
        ...comment,
        message: ''
      }))
    })
  }
  //= ==================

  const handleReview = event => {
    event.preventDefault()
    updatereview(review, props.user, props.match.params.id).then(res => {
      setreview(review => ({
        name: props.user.email,
        point: 'done'
      }))
    })
  }
  //= ===================================================================
  let reviewForm = (
    <form onSubmit={handleReview}>
      <label> number have to be 0 to 10 </label>
      <input
        placeholder="review"
        type="number"
        value={review.point}
        name="point"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
  // ===========================

  //= ==================================
  if (review.point === 'done' || arr1) {
    reviewForm = ''
  }

  //= ============================================================
  const deletereview = (id, user) => {
    deleteReview(user, id)
      .then(res => {
        setdeleted(true)
      })
      .catch(console.error)
  }

  //= =============================================================
  let button1 = ''
  if (props.user._id === status.owner) {
    button1 = (
      <button
        onClick={() => {
          deletereview(props.match.params.id, props.user)
        }}
      >
        delete
      </button>
    )
  }
  if (deleted) {
    return (reviewjsx = <Redirect to="/status" />)
  }
  return (
    <div style={showStyles2}>
      <div style={showStyles1}>
        <h2>{status.title}</h2>
        review: {reviewjsx} {'   '}
        <br />
        {button1}
      </div>

      <br />
      {reviewForm}
      <h4>comment: {comments}</h4>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          placeholder="comment"
          value={comment.message}
          name="message"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default ShowStatus
