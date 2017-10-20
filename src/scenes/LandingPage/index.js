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
  constructor(props) {
    super(props)
    this.state = {
      registerSteps: 0,
      phone: '',
      password: '',
      cep: '',
    }
  }

  // TODO: integrate with API, set user logged/unlogged, add way to close modal

  // handleStep = (event) => this.setState({registerSteps: event.target.step})

  handleChange = (event) => this.setState({[event.target.name]: event.target.value})

  onLoginButtonClick = () => this.setState({registerSteps: 1,})

  onAccessButtonClick = () => {
    // TODO: verify if user is registered
    // if yes, set logged flag and redirect to status page
    // this.props.login(this.state.phone, this.state.password)
    // if not, go to CEP step
    this.setState({registerSteps: 2,})
  }

  onCepButtonClick = () => {
    // TODO: set logged flag
    this.props.login(this.state.phone, this.state.password)
    this.resetState()
  }

  resetState = (event) => {
    if (!event || event.target === event.currentTarget){
      this.setState({
        registerSteps: 0,
        phone: '',
        password: '',
        cep: '',
      })
    }
  }

  render() {
    const accessModalChildren = (
      <Panel column centered>
        <h3>Queijo</h3>
        <Input type="text" name="phone" placeholder="Telefone (9 últimos digitos)" onChange={this.handleChange} />
        <Input type="password" name="password" placeholder="Senha (mínimo 6 dígitos)" onChange={this.handleChange} />
        <Button small ghost onClick={this.onAccessButtonClick} disabled={this.state.phone.length !== 9 || this.state.password.length < 6}>Entrar</Button>
      </Panel>
    )
    const cepModalChildren = (
      <Panel column centered>
        <h3>Goiabada</h3>
        <Input type="text" name="cep" placeholder="CEP (apenas os 11 dígitos)" onChange={this.handleChange} />
        <Button small ghost onClick={this.onCepButtonClick} disabled={this.state.cep.length !== 11}>Cadastrar CEP</Button>
      </Panel>
    )

    return (
      <main className="landing-page" style={{ paddingTop: '4rem' }}>
        <Modal onClick={this.resetState} isOpen={this.state.registerSteps === 1}>
          {accessModalChildren}
        </Modal>
        <Modal onClick={this.resetState} isOpen={this.state.registerSteps === 2}>
          {cepModalChildren}
        </Modal>
        <Header >
          <Button small ghost hide={this.props.isLogged} onClick={this.onLoginButtonClick}>
            Entrar
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
    login,
  })
)(LandingPage)
