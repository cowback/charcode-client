import React from 'react'

import Panel from '../Panel'
import Input from '../Input'
import Button from '../Button'

class LocationForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange = ({ target }) =>
    this.setState({ cep: target.value })

  render() {
    return (
      <Panel column x="xl" y="l" between="l" style={{ width: 350 }}>
        <h4 style={{ textAlign: 'center' }}>Insira seu CEP</h4>
        <Panel y="m" column>
          <Input
            type="text"
            name="cep"
            placeholder="CEP (apenas os 8 dígitos)"
            onChange={this.handleChange}
          />
        </Panel>
        <Button onClick={this.props.onSubmit}>
          Finalizar Cadastro
        </Button>
      </Panel>
    )
  }
}

export default LocationForm
