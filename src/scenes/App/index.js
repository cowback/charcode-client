import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'
import { login, logout } from 'store/auth/actions'

import Header from 'components/Header'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Panel from 'components/Panel'
import UserForm from 'components/UserForm'
import LocationForm from 'components/LocationForm'
import Input from 'components/Input'
import Footer from 'components/Footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerSteps: 0,
      phone: '',
      password: '',
      cep: '',
    }
  }

  componentWillReceiveProps({isLogged}) {
    if (this.props.isLogged !== isLogged) {
      this.props.goTo(
        isLogged ? '/' : '/landing'
      )
    }
  }

  componentDidMount() {
    this.props.goTo(
      this.props.isLogged ? '/' : '/landing'
    )
  }

  // TODO: integrate with API, set user logged/unlogged, add way to close modal

  // handleStep = (event) => this.setState({registerSteps: event.target.step})

  handleChange = (event) => this.setState({[event.target.name]: event.target.value})

  onLogoutButtonClick = () => this.props.logout() // set unlogged flag

  onLoginButtonClick = () => this.setState({registerSteps: 1,})

  handleLogin = () => {
    // TODO: verify if user is registered
    // if yes, set logged flag and redirect to status page
    // this.props.login(this.state.phone, this.state.password)
    // if not, go to CEP step
    this.setState({registerSteps: 2,})
  }

  onCepButtonClick = () => {
    const { password, phone } = this.state

    this.props.login({ password, phone })
    this.resetState()
  }

  resetState = () => {
    this.setState({
      registerSteps: 0,
      phone: '',
      password: '',
      cep: '',
    })
  }

  render() {
    return (
      <main>
        <Modal isOpen={this.state.registerSteps === 1}>
          <UserForm
            onLogin={this.handleLogin}
            onCreateAccount={this.handleAccountCreation}
          />
        </Modal>
        <Modal isOpen={this.state.registerSteps === 2}>
          <LocationForm
            onSubmit={this.onSubmitLocation}
          />
        </Modal>
        <Header>
          <Button small ghost hide={this.props.isLogged} onClick={this.onLoginButtonClick}>
            Entrar
          </Button>
          <Button small ghost hide={!this.props.isLogged} onClick={this.onLogoutButtonClick}>
            Sair
          </Button>
        </Header>
        {this.props.children}
        <Footer />
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
    logout,
    goTo: path => replace(path)
  })
)(App)
