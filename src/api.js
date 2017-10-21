import http from 'utils/http'

export default {
  logout: () => Promise.resolve(false),
  login: credentials => http.post('auth', credentials),
  createAccount: user => http.post('user', user),
  getUserStatus: () => http.get('user/status'),
}
