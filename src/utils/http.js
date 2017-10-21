import cookie from './cookie';

const baseURL = 'http://localhost:8000/api/v1/'

const request = (path, options) =>
  fetch(`${baseURL}${path}`, options) .then(res => res.json())

const makePayload = (method, token, data) => data ? ({
  method,
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}) : token ? ({
  method,
  headers: new Headers({
    'Content-Type': 'application/json',
    'authorization': token.toString()
  })
}) : ({
  method
})

const http = Object.assign(window.fetch, {
  get: path => request(path, makePayload('GET', cookie.get().token)),
  post: (path, _, data) => request(path, makePayload('POST', _, data))
})

export default http
