import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

import { ApplicationState } from '../store'
import { LoginToken } from '../store/login/types'
import { login } from '../store/login/actions'

interface PropsFromState {
  loading: boolean
  data: LoginToken|null
  error?: string
}

interface PropsFromDispatch {
  login: typeof login
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps

class LoginPage extends React.Component<AllProps> {
  public render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { loading, data } = this.props

    if (data) {
      return <Redirect to={from} />
    }

    return (
      <Page>
        <Container>
          <div className="login">
            <div className="login-cover"></div>
            <div className="login-content">
              <div className="login-brand">
                <a href="/">Ephemeris</a>
                <p className="m-b-20">Putting intelligence behing bulk scheduling.</p>
              </div>
              <form action="index.html" method="POST" name="login_form">
                <div className="form-group">
                  <label className="control-label">Username</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="control-label">Password</label>
                  <input type="password" className="form-control" />
                </div>
                <a href="/forgot-password" className="pull-right" style={{marginLeft: '5px', fontSize: '0.9rem', color: '#5ac8fa', fontWeight: 'bold'}}>Forgot your password?</a>
                <button type="submit" className="btn btn-primary">Sign In</button>
              </form>
              <div className="m-t-20" style={{fontSize: '0.9rem'}}>
                Not registered yet? <a href="/register" style={{marginLeft: '5px', color: '#5ac8fa', fontWeight: 'bold'}}>Sign Up</a>
              </div>
            </div>
          </div>
        </Container>
      </Page>
    )
  }
}

const mapStateToProps = ({ login }: ApplicationState) => ({
  loading: login.loading,
  errors: login.error,
  data: login.data
})

const mapDispatchToProps = {
  login
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
