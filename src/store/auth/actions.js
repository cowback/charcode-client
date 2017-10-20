import { createAction } from 'redux-actions'

const setUser = createAction('SET_USER')

const login = (phone, password) => (dispatch, _, api) =>
  api.login().then(user => dispatch(setUser(user)))

const logout = (phone) => (dispatch, _, api) =>
  api.logout().then(() => dispatch(setUser(null)))

export {
  setUser,
  login,
  logout
}
