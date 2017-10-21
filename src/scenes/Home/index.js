import React from 'react'
import { connect } from 'react-redux'

import bindActionCreators from 'utils/action-binder'
import { isLogged } from 'store/auth'
import { logout } from 'store/auth/actions'

import Panel from 'components/Panel'

import media from 'utils/media'
import cn from 'utils/cn'

import './home.css'

const HomePagePanel = ({children, ...rest}) => (
  <Panel className="home-panel" x="m">
    <Panel
      className="home-panel__content"
      direction={media.greaterThan.phone() ? 'row' : 'column'}
      align="center"
      justify={media.greaterThan.phone() ? 'space-between' : 'center'}
      between={media.greaterThan.phone() && 'xl'}
      {...rest}
    >
      {children}
    </Panel>
  </Panel>
)

const CheckmarkImage = ({size}) => (
  <figure
    className={cn(
      'image',
      true && 'image--ok'
    )}
    style={{
      height: size,
    }}
  />
)

class Home extends React.Component {
  render() {
    return (
      <main className="home" style={{ paddingTop: '4rem' }}>
        <HomePagePanel column centered>
          <CheckmarkImage size={300} />
          <h3>{'Status: OK'}</h3>
        </HomePagePanel>
        {this.props.children}
      </main>
    )
  }
}

export default connect(
  state => ({
    isLogged: isLogged(state),
  }),
  bindActionCreators({
    logout,
  })
)(Home)
