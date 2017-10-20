import React from 'react'
import { connect } from 'react-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'
import { login, logout } from 'store/auth/actions'

import Panel from 'components/Panel'
import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import Header from 'components/Header'
import Footer from 'components/Footer'

import media from 'utils/media'

import logo from '../../assets/logo.png'

import './landing-page.css'

class StatusPage extends React.Component {
  onLogoutButtonClick = () => this.props.logout()

  render() {
    return (
      <main className="status-page" style={{ paddingTop: '4rem' }}>
        <Header >
          <Button small ghost hide={!this.props.isLogged} onClick={this.onLogoutButtonClick}>
            Sair
          </Button>
        </Header>
        <LandingPagePanel inline>
          <h2 style={{ marginBottom: 0 }}>Lorem ipsum dolor sit amet.</h2>
          <PhoneImage size={media.greaterThan.phone() ? 600 : 400} />
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
        <Footer />
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
    logout
  })
)(StatusPage)
