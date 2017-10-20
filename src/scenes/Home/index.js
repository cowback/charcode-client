import React from 'react'
import { connect } from 'react-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'

class Home extends React.Component {
  render() {
    return (
      <main>
        <h1>Pau no teu cu</h1>
        {this.props.children}
      </main>
    )
  }
}

export default connect(
  state => ({
    isLogged: isLogged(state),
  }),
)(Home)
