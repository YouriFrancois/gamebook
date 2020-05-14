import apiUrl from '../apiConfig'
import axios from 'axios'

export const createStatus = (status, user) => {
  return axios({
    url: apiUrl + '/status',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { status: { title: user.email + ' : ' + status.title } }
  })
}

export const indexStatus = user => {
  return axios({
    url: apiUrl + '/status',
    method: 'GET',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const showStatus = (id, user) => {
  return axios({
    url: apiUrl + '/status/' + id,
    method: 'GET',
    headers: {
      // Authorization: `Token token=${user.token}`
    }
  })
}

export const updateComment = (comment, user, id) => {
  return axios({
    url: apiUrl + '/status-comment/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      status: { comment }
    }
  })
}

export const updatereview = (review, user, id) => {
  return axios({
    url: apiUrl + '/status-comment/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      status: { review }
    }
  })
}
export const update = (title, user, id) => {
  return axios({
    url: apiUrl + '/status/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { status: { title } }
  })
}

export const deleteReview = (user, id) => {
  return axios({
    url: apiUrl + '/status/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}
