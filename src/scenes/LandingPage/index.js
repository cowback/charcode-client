import React from 'react'

import Panel from 'components/Panel'
import Button from 'components/Button'

import media from 'utils/media'

import logo from '../../assets/logo.png'

import './landing-page.css'

const Header = () => (
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
      <img src={logo} width="50" alt="logo" />
      <h4>climalerta</h4>
    </Panel>
    <Button small ghost>
      entrar
    </Button>
  </Panel>
)

const Footer = () => (
  <Panel
    tag="footer"
    className="footer"
  >
    <Panel
      tag="section"
      className="footer__content"
      inset="l"
      between="m"
      row
      justify="space-around"
    >
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/cowback/">Contribua</a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/cowback/">Link</a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/cowback/">Outro link</a>
    </Panel>
  </Panel>
)

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
  render() {
    return (
      <main className="landing-page" style={{ paddingTop: '4rem' }}>
        <Header />
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
