import React from 'react'

import Panel from 'components/Panel'
import './footer.css'

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
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/cowback/">GitHub</a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/cowback/">Link</a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/cowback/">Outro link</a>
    </Panel>
  </Panel>
)

export default Footer
