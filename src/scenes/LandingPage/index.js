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

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerSteps: 0
    }
  }

  onHeaderButtonClick = () => this.setState({registerSteps: 1})

  onAccessButtonClick = () => this.setState({registerSteps: 2})

  onCepButtonClick = () => this.setState({registerSteps: 0})

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
        <Modal isOpen={this.state.registerSteps === 1}>
          {accessModalChildren}
        </Modal>
        <Modal isOpen={this.state.registerSteps === 2}>
          {cepModalChildren}
        </Modal>
        <Header onButtonClick={this.onHeaderButtonClick}>
          <Button small ghost onClick={this.onButtonClick}>
            entrar
          </Button>
        </Header>
        <LandingPagePanel>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <div className="phone-image" />
        </LandingPagePanel>
        <LandingPagePanel>
          <h2>Sed dorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
        </LandingPagePanel>
        <LandingPagePanel column>
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
