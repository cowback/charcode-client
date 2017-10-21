import React from 'react'
import { connect } from 'react-redux'

import bindActionCreators from 'utils/action-binder'
import { status } from 'store/status'
import { getUserStatus } from 'store/status/actions'

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

const CheckmarkImage = ({size, status}) => (
  <figure
    className={cn(
      'image',
      status === 'ok' && 'image--ok'
    )}
    style={{
      height: size,
    }}
  />
)

class Home extends React.Component {
  componentDidMount() {
    this.props.getUserStatus(null)
  }

  render() {
    return (
      <main className="home" style={{ paddingTop: '4rem' }}>
        <HomePagePanel column centered>
          <CheckmarkImage size={300} status={this.props.status} />
          <h3>{`Status: ${this.props.status}`}</h3>
        </HomePagePanel>
        {this.props.children}
      </main>
    )
  }
}

export default connect(
  state => ({
    location: state.location,
    status: status(state),
  }),
  bindActionCreators({
    getUserStatus,
  }),
)(Home)
