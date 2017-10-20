import React from 'react'

import Panel from 'components/Panel'
import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'

import phone from '../../assets/phone.png'
import logo from '../../assets/logo.png'

import './landing-page.css'

const Header = ({onHeaderButtonClick}) => (
  <Panel
    className="header"
    tag="header"
    row
    x="m"
    align="center"
    justify="space-between"
    sizing="border"
    fit
  >
    <Panel row align="center" between="s">
      <img src={logo} width="50" />
      <h4>climalerta</h4>
    </Panel>
    <Button small ghost onButtonClick={onHeaderButtonClick}>
      entrar
    </Button>
  </Panel>
)

const Footer = () => (
  <Panel
    tag="footer"
    className="footer"
    inset="l"
    between="m"
    row
    justify="space-around"
  >
    <a target="_blank" href="https://github.com/cowback/">Contribua</a>
    <a target="_blank" href="https://github.com/cowback/">Link</a>
    <a target="_blank" href="https://github.com/cowback/">Outro link</a>
  </Panel>
)

const LandingPagePanel = ({ children }) => (
  <Panel
    className="landing-page-panel"
    column
    x="l"
    align="center"
    justify="center"
  >
    {children}
  </Panel>
)

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerSteps: 0
    }
  }

  onHeaderButtonClick() {
    this.setState({
      registerSteps: 1
    })
  }

  onAccessButtonClick() {
    this.setState({
      registerSteps: 2
    })
  }

  onCepButtonClick() {
    this.setState({
      registerSteps: 0
    })
  }

  render() {
    const accessModalChildren = (
      <Panel column centered>
        <h3>Queijo</h3>
        <Input type="text" placeholder="Telefone" onChange={(event) => console.log(event.target.value)} required />
        <Input type="password" placeholder="Senha" onChange={(event) => console.log(event.target.value)} required />
        <Button small ghost onClick={this.onAccessButtonClick}>Entrar</Button>
      </Panel>
    )
    const cepModalChildren = (
      <Panel column centered>
        <h3>Goiabada</h3>
        <Input type="text" placeholder="CEP" onChange={(event) => console.log(event.target.value)} required />
        <Button small ghost onClick={this.onCepButtonClick}>Cadastrar CEP</Button>
      </Panel>
    )

    return (
      <main className="landing-page" style={{ paddingTop: '4rem' }}>
        <Modal isOpen={this.state.registerSteps === 1} children={accessModalChildren} />
        <Modal isOpen={this.state.registerSteps === 2} children={cepModalChildren} />
        <Header onButtonClick={this.onHeaderButtonClick} />
        <LandingPagePanel>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <div className="phone-image" />
        </LandingPagePanel>
        <LandingPagePanel>
          <h2>Sed dorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
        </LandingPagePanel>
        <LandingPagePanel>
          <h2>Fique constantemente blabla alerta</h2>
          <Button>
            Começe agora
          </Button>
        </LandingPagePanel>
        <Footer />
      </main>
    )
  }
}

export default LandingPage
