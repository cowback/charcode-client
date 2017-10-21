import cookie from 'utils/cookie'

import { createAction } from 'redux-actions'

const setStatus = createAction('SET_STATUS')

const getUserStatus = (token) => (dispatch, _, api) =>
  api.getUserStatus()
  .then((data) => {
    dispatch(setStatus(data))
  })
  .catch(console.error)

// const setAuthState = createAction('SET_USER')
//
// const login = credentials => (dispatch, _, api) => api.login(credentials)
//   .then(({ token }) => {
//     cookie.set('token', token)
//     dispatch(setAuthState(true))
//   })
//   .catch(console.error)
//
// const logout = (phone) => (dispatch, _, api) =>
//   api.logout().then(() => dispatch(setAuthState(false)))

export {
  // setAuthState,
  // login,
  // logout
  setStatus,
  getUserStatus
}
