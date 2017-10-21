import http from 'utils/http'

export default {
  logout: () => Promise.resolve(false),
  login: credentials => http.post('auth', null, credentials),
  createAccount: user => http.post('user', null, user),
  getUserStatus: () => http.get('user/status'),
}
