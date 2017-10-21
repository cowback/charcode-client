import http from 'utils/http'

export default {
  login: ({ phone, password }) => http.post('signin', null, { mobile: phone, password }),
  logout: () => Promise.resolve(false),
  getUserStatus: () => http.get('user/status'),
}
