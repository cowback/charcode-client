import { createAction } from 'redux-actions'

const setUser = createAction('SET_USER')

const authenticate = (phone, password, api) => dispatch =>
  api.authenticate().then(user => dispatch(setUser(user)))

export {
  setUser,
  authenticate,
}
