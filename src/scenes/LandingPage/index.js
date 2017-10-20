import React from 'react'

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
  <Panel className="landing-page-panel" x="l" >
    <Panel
      className="landing-page-panel__content"
      direction={media.greaterThan.phone() ? 'row' : 'column'}
      align="center"
      justify="center"
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

  onLoginButtonClick = () => this.setState({registerSteps: 1})

  onAccessButtonClick = () => this.setState({registerSteps: 2})

  onCepButtonClick = () => this.setState({registerSteps: 0})

  onPhoneChange = (event) => this.setState({phone: event.target.value})

  onPasswordChange = (event) => this.setState({password: event.target.value})

  onCepChange = (event) => this.setState({cep: event.target.value})

  render() {
    const accessModalChildren = (
      <Panel column centered>
        <h3>Queijo</h3>
        <Input type="text" placeholder="Telefone (9 últimos digitos)" onChange={this.onPhoneChange} />
        <Input type="password" placeholder="Senha (mínimo 6 dígitos)" onChange={this.onPasswordChange} />
        <Button small ghost onClick={this.onAccessButtonClick} disabled={this.state.phone.length !== 9 || this.state.password.length < 6}>Entrar</Button>
      </Panel>
    )
    const cepModalChildren = (
      <Panel column centered>
        <h3>Goiabada</h3>
        <Input type="text" placeholder="CEP (apenas os 11 dígitos)" onChange={this.onCepChange} />
        <Button small ghost onClick={this.onCepButtonClick} disabled={this.state.cep.length !== 11}>Cadastrar CEP</Button>
      </Panel>
    )

    return (
      <main className="landing-page" style={{ paddingTop: '4rem' }}>
        <Modal isOpen={this.state.registerSteps === 1}>
          {accessModalChildren}
        </Modal>
        <Modal isOpen={this.state.registerSteps === 2}>
          {cepModalChildren}
        </Modal>
        <Header >
          <Button small ghost onClick={this.onLoginButtonClick}>
            Entrar
          </Button>
        </Header>
        <LandingPagePanel>
          <h2 style={{ marginBottom: 0 }}>Lorem ipsum dolor sit amet.</h2>
          <PhoneImage size={media.greaterThan.phone() ? 500 : 400} />
        </LandingPagePanel>
        <LandingPagePanel>
          <h2>Sed dorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
        </LandingPagePanel>
        <LandingPagePanel column>
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

export default LandingPage
