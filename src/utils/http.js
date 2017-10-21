const baseURL = 'http://localhost:8000/api/v1/'

const request = (path, options) =>
  fetch(`${baseURL}${path}`, options) .then(res => res.json())
  
const makePayload = (method, data) => ({
  method,
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})

const http = Object.assign(window.fetch, {
  get: path => request(path),
  post: (path, data) => request(path, makePayload('POST', data))
})

export default http
