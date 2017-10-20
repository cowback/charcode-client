import React from 'react'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'
import multi from 'redux-multi'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'

import App from 'scenes/App'
import LandingPage from 'scenes/LandingPage'
import Sandbox from 'scenes/Sandbox'
import reducers from 'store/reducers'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

const history = createHistory()
const store = createStore(
  combineReducers({
    router: routerReducer,
    ...reducers
  }),
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    multi
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/sandbox" component={Sandbox} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
