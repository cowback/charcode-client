import cookie from './cookie';

const baseURL = 'http://localhost:8000/api/v1/'

const request = (path, options) =>
  fetch(`${baseURL}${path}`, options) .then(res => res.json())

const makePayload = (method, data) => {
  console.log(data);
  return ({
    method,
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'authorization': cookie.get().token
    })
  })
}

const http = Object.assign(window.fetch, {
  get: path => request(path, makePayload('GET')),
  post: (path, data) => request(path, makePayload('POST', data))
})

export default http
