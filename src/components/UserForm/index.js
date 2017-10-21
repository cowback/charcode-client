import React from 'react'

import Panel from '../Panel'
import Input from '../Input'
import Button from '../Button'

const errorMessages = {
  '400': 'Telefone ou senha inválidos.',
  '404': 'Usuário não encontrado.',
}

class UserForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mobile: '',
      password: '',
      wrongNumberMessage: ''
    }
  }

  handleChange = ({ target }) => {
    if (target.name === 'mobile' && target.value.substring(0, 3) !== '519') {
      this.setState({ wrongNumberMessage: 'O número deve começar com 519' })
    } else {
      this.setState({ [target.name]: target.value })
      if (target.name === 'mobile') this.setState({ wrongNumberMessage: '' })
    }
  }

  render() {
    return (
      <Panel column x="l" y="l" between="l" style={{ width: 350 }}>
        <h4 style={{ textAlign: 'center' }}>
          Acesse sua conta ou cadastre-se
        </h4>
        {this.props.error && (
          <p style={{ color: 'red', textAlign: 'center' }}>
            {errorMessages[this.props.error]}
          </p>
        )}
        <Panel column between="s">
          <Input
            type="number"
            name="mobile"
            placeholder="Telefone (apenas os 11 digitos, incluindo DDD)"
            minlength="11"
            maxlength="11"
            onChange={this.handleChange}
          />
        <span>{this.state.wrongNumberMessage}</span>
          <Input
            type="password"
            name="password"
            placeholder="Senha (mínimo 8 dígitos)"
            minlength="8"
            maxlength="16"
            onChange={this.handleChange}
          />
        </Panel>
        <Panel between="s">
          <Button fit onClick={() => this.props.onLogin(this.state)}>
            Entrar
          </Button>
          <Button fit ghost onClick={() => this.props.onCreateAccount({mobile: this.state.mobile, password: this.state.password})}>
            Criar Conta
          </Button>
        </Panel>
      </Panel>
    )
  }
}

export default UserForm
