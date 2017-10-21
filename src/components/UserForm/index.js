import React from 'react'

import Panel from '../Panel'
import Input from '../Input'
import Button from '../Button'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = ({ target }) =>
    this.setState({ [target.name]: target.value })

  render() {
    return (
      <Panel column x="l" y="l" between="l" style={{ width: 350 }}>
        <h4 style={{ textAlign: 'center' }}>
          Acesse sua conta ou cadastre-se
        </h4>
        <Panel column between="s">
          <Input
            type="text"
            name="phone"
            placeholder="Telefone (9 últimos digitos)"
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha (mínimo 6 dígitos)"
            onChange={this.handleChange}
          />
        </Panel>
        <Panel between="s">
          <Button fit onClick={() => this.props.onLogin(this.state)}>
            Entrar
          </Button>
          <Button fit ghost onClick={() => this.props.onCreateAccount(this.state)}>
            Criar Conta
          </Button>
        </Panel>
      </Panel>
    )
  }
}

export default UserForm
