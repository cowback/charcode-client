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
        isLogged ? '/' : '/landing'
      )
    }
  }

  componentDidMount() {
    this.props.goTo(
      this.props.isLogged ? '/' : '/landing'
    )
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleClose = event => this.setState({
    registerSteps: 0,
    mobile: '',
    password: '',
    cep: '',
  })

  handleLogout = () => this.props.logout() // set unlogged flag

  onLoginButtonClick = () => this.setState({ registerSteps: 1, })

  handleLogin = ({ password, mobile }) => {
    this.props.login({ password, mobile })
  }

  handleAccountCreation = cep => {
    this.props
      .createAccount({ ...this.state.user, cep })
      .then(this.handleClose)
  }

  render() {
    return (
      <main>
        <Modal onClose={this.handleClose} isOpen={this.state.registerSteps === 1}>
          <UserForm
            onLogin={this.handleLogin}
            onCreateAccount={user => this.setState({ registerSteps: 2, user })}
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
          <Button small ghost hide={!this.props.isLogged} onClick={this.handleLogout}>
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
