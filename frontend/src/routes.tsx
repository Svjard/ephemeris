import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Global, keyframes, css } from '@emotion/core'

import Root from './components/layout/Root'
import IndexPage from './pages/index'
import LoginPage from './pages/login'

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.

const Routes: React.SFC = () => (
  <Root>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
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
