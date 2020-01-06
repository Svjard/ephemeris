import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Global, keyframes, css } from '@emotion/core'

import Root from './components/layout/Root'
import IndexPage from './pages/index'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

const Routes: React.SFC = () => (
  <Root>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <div style={{width: 1000, margin: '0 auto'}}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route component={() => <div>Not Found</div>} />
        </Switch>
      </div>
    </Switch>
  </Root>
)

export default Routes
