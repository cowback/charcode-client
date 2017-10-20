import React from 'react'
import { connect } from 'react-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'
import { authenticate } from 'store/auth/actions'

const App = ({ children }) => (
  <main>
    {children}
  </main>
)

export default connect(
  state => ({
    location: state.location,
    isLogged: isLogged(state),
  }),
  bindActionCreators({
    authenticate,
  })
)(App)
