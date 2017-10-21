import React from 'react'
import { connect } from 'react-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'
import { login, logout } from 'store/auth/actions'

import Panel from 'components/Panel'
import Button from 'components/Button'

import media from 'utils/media'

import './landing-page.css'

const LandingPagePanel = ({ children, ...rest }) => (
  <Panel className="landing-page-panel" x="m">
    <Panel
      className="landing-page-panel__content"
      direction={media.greaterThan.phone() ? 'row' : 'column'}
      align="center"
      justify={media.greaterThan.phone() ? 'space-between' : 'center'}
      between={media.greaterThan.phone() && 'xl'}
      {...rest}
    >
      {children}
    </Panel>
  </Panel>
)

const PhoneImage = ({ size }) => (
  <figure
    className="phone-image"
    style={{
      height: size,
    }}
  />
)

class LandingPage extends React.Component {
  render() {
    return (
      <main className="landing-page" style={{ paddingTop: '6rem' }}>
        <LandingPagePanel inline>
          <h2 style={{ margin: 0 }}>Lorem ipsum dolor sit amet.</h2>
          <PhoneImage size={media.greaterThan.phone() ? 550 : 400} />
        </LandingPagePanel>
        <LandingPagePanel>
          <h2>Sed dorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
        </LandingPagePanel>
        <LandingPagePanel column justify="center">
          <h2>Fique constantemente blabla alerta</h2>
          <Button onClick={this.onLoginButtonClick}>
            Começe agora
          </Button>
        </LandingPagePanel>
      </main>
    )
  }
}

export default connect(
  state => ({
    location: state.location,
    isLogged: isLogged(state)
  }),
  bindActionCreators({
    login,
    logout
  })
)(LandingPage)
