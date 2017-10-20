import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'
import { login } from 'store/auth/actions'

class App extends React.Component {
  componentDidMount() {
    this.props.goTo(
      this.props.isLogged ? '/' : '/landing'
    )
  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    )
  }
}

export default connect(
  state => ({
    location: state.location,
    isLogged: isLogged(state),
  }),
  bindActionCreators({
    login,
    goTo: path => replace(path)
  })
)(App)
