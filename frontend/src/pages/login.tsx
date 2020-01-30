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

interface LoginFormState {
  email: string
  password: string,
  errors: { [key: string]: string }
}

interface PropsFromDispatch {
  login: typeof login
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps

class LoginPage extends React.Component<AllProps, LoginFormState> {
  constructor(props: AllProps) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)

    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  private validateForm(values: {[key: string]: string}) {
    let errors: { [key: string]: string } = {}
    let hasError: boolean = false
    if (!values.email) {
      errors['email'] = 'This field is required'
      hasError = true
    }

    if (!values.password) {
      errors['password'] = 'This field is required'
      hasError = true
    }

    if (hasError) {
      this.setState({ errors, ...values })
    }
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    this.validateForm({
      email: this.state.email,
      password: this.state.password
    })
  }

  public render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { loading, data } = this.props
    const { errors } = this.state

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
              <form name="login_form" onSubmit={this.handleSubmit}>
                <div className={`form-group ${errors.email ? 'has-error has-feedback' : ''}`}>
                  <label className="control-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={
                      (e: React.FormEvent<HTMLInputElement>) => {
                        this.validateForm({ email: e.currentTarget.value })
                      }
                    }
                    onBlur={
                      (e: React.FormEvent<HTMLInputElement>) => {
                        this.validateForm({ email: e.currentTarget.value })
                      }
                    }
                  />
                  {errors.email && <span className="help-block m-b-0" style={{fontSize: '0.9rem'}}>{errors.email}</span>}
                </div>
                <div className={`form-group ${errors.email ? 'has-error has-feedback' : ''}`}>
                  <label className="control-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={
                      (e: React.FormEvent<HTMLInputElement>) =>
                        this.setState({ password: e.currentTarget.value })
                    }
                    onBlur={
                      (e: React.FormEvent<HTMLInputElement>) =>
                        this.setState({ password: e.currentTarget.value })
                    }
                  />
                  {errors.password && <span className="help-block m-b-0" style={{fontSize: '0.9rem'}}>{errors.password}</span>}
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
