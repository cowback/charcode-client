import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'
import * as actions from 'store/auth/actions'

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
      mobile: '',
      password: '',
      cep: '',
    }
  }

  componentWillReceiveProps({isLogged}) {
    if (this.props.isLogged !== isLogged) {
      this.props.goTo(
        isLogged ? '/' : '/'
      )
    }
  }

  componentDidMount() {
    this.props.goTo(
      this.props.isLogged ? '/' : '/'
    )
  }

  // TODO: integrate with API, set user logged/unlogged, add way to close modal

  handleChange = event => this.setState({[event.target.name]: event.target.value})

  handleClose = event => this.setState({
    registerSteps: 0,
    mobile: '',
    password: '',
    cep: '',
  })

  onLogoutButtonClick = () => this.props.logout() // set unlogged flag

  onLoginButtonClick = () => this.setState({ registerSteps: 1, })

  handleLogin = () => {
    // TODO: verify if user is registered
    // if yes, set logged flag and redirect to status page
    // this.props.login(this.state.mobile, this.state.password)
    // if not, go to CEP step
    this.setState({ registerSteps: 2 })
    this.handleClose()
  }

  handleAccountCreation = () => {
    const { password, mobile, cep } = this.state

    this.props.createAccount({ password, mobile, cep })
    this.handleClose()
  }

  render() {
    return (
      <main>
        <Modal onClose={this.handleClose} isOpen={this.state.registerSteps === 1}>
          <UserForm
            onLogin={this.handleLogin}
            onCreateAccount={this.handleAccountCreation}
          />
        </Modal>
        <Modal onClose={this.handleClose} isOpen={this.state.registerSteps === 2}>
          <LocationForm
            onSubmit={this.handleAccountCreation}
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
    ...actions,
    goTo: path => replace(path)
  })
)(App)
