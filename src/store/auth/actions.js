import { createAction } from 'redux-actions'

const setUser = createAction('SET_USER')

const authenticate = (phone, password) => dispatch => Promise
  .resolve(true)
  .then(() => dispatch(setUser({ phone: 123, password: 123 })))

export {
  setUser,
  authenticate,
}
