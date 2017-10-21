import http from 'utils/http'

export default {
  logout: () => Promise.resolve(false),
  login: ({ phone, password }) => {
    return http.post('signin', { mobile: phone, password })
  },
  getUserStatus: (token) => Promise.resolve(3),
}
