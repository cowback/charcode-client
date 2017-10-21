import http from 'utils/http'

import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged, getError } from 'store/auth'
import * as actions from 'store/auth/actions'

import Header from 'components/Header'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Panel from 'components/Panel'
import UserForm from 'components/UserForm'
import LocationForm from 'components/LocationForm'
import Input from 'components/Input'
import Footer from 'components/Footer'

var applicationServerPublicKey = 'BHYkfo6khRJ4t7Q4-UQe07evV794zNYH1NPJOScnYmlVoGGMA8Z7mX7jPfRtQ6BjiTE1ZRBjCIW8bWckAPOlZxs';

function subscribe() {
  navigator.serviceWorker.ready.then(function (reg) {
      var subscribeParams = {userVisibleOnly: true};

      var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
      subscribeParams.applicationServerKey = applicationServerKey;

      reg.pushManager.subscribe(subscribeParams)
          .then(function (subscription) {

              var endpoint = subscription.endpoint;
              var key = subscription.getKey('p256dh');
              var auth = subscription.getKey('auth');
              sendSubscriptionToServer(endpoint, key, auth);
          })
          .catch(function (e) {
              // A problem occurred with the subscription.
              console.log('Unable to subscribe to push.', e);
          });
  });
}

function sendSubscriptionToServer(endpoint, key, auth) {
  var encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)));
  var encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)));

  var pushInfo = {
    "endpoint": endpoint,
    "keys": {
      p256dh: encodedKey,
      auth: encodedAuth
    }
  };

  http.post('push/subscribe', { pushInfo: pushInfo });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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
      if (isLogged) {
        subscribe()
        this.setState({ registerSteps: 0, })
      }
    }
  }

  componentDidMount() {
    this.props.goTo(
      this.props.isLogged ? '/' : '/landing'
    )

    if (!this.props.isLogged) {
      this.props.reauthenticate()
    }
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
            error={this.props.authError}
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
    authError: getError(state),
  }),
  bindActionCreators({
    ...actions,
    goTo: path => replace(path)
  })
)(App)
