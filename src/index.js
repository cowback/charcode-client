import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'

import App from 'scenes/App'
import Home from 'scenes/Home'
import LandingPage from 'scenes/LandingPage'
import Sandbox from 'scenes/Sandbox'
import reducers from 'store/reducers'

import api from './api'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const history = createHistory()
const store = createStore(
  combineReducers({
    router: routerReducer,
    ...reducers
  }),
  applyMiddleware(
    logger,
    routerMiddleware(history),
    thunk.withExtraArgument(api),
    multi
  )
)

const ConnectedSwitch = connect(state => ({ location: state.location }))(Switch)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          <App>
            <Route exact path="/" component={Home} />
            <Route path="/landing" component={LandingPage} />
            <Route path="/sandbox" component={Sandbox} />
          </App>
        </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()