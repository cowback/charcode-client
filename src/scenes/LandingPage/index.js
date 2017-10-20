import React from 'react'

import Panel from 'components/Panel'
import Button from 'components/Button'
import Header from 'components/Header'
import Footer from 'components/Footer'

import media from 'utils/media'

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
