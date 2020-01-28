import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Root from './components/layout/Root'
import IndexPage from './pages/index'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ForgotPage from './pages/Forgot'
import AgreementsPage from './pages/Agreement'

const Routes: React.SFC = () => (
  <Root>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/forgot-password" component={ForgotPage} />
      <Route exact path="/terms-of-service" component={() => <AgreementsPage agreementType="terms-of-service" />} />
      <Route exact path="/privacy-policy" component={() => <AgreementsPage agreementType="privacy-policy" />} />
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
