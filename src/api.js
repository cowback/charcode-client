import http from 'utils/http'

export default {
  logout: () => Promise.resolve(false),
  login: ({ phone, password }) => http.post('signin', null, { mobile: phone, password }),
  getUserStatus: (token) => Promise.resolve(3),
}
