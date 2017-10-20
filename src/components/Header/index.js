import React from 'react'

import Panel from 'components/Panel'
import Button from 'components/Button'

import logo from '../../assets/logo.png'
import './header.css'

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

export default Header
