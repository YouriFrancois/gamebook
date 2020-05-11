import apiUrl from '../apiConfig'
import axios from 'axios'

export const createStatus = (status, user) => {
  return axios({
    url: apiUrl + '/status',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { status: status }
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
