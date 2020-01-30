import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

import { ApplicationState } from '../store'
import { register } from '../store/register/actions'
import { check } from '../store/auth/actions'
import { User } from '../store/auth/types'

interface PropsFromState {
  loading: boolean
  data: string|null
  auth: User|null
  error?: string
}

interface PropsFromDispatch {
  register: typeof register
  check: typeof check
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps

class RegisterPage extends React.Component<AllProps> {
  private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
  }

  private validateForm(): boolean {
    // TODO - validate form
    return true;
  }

  private registerUser(): void {
    this.props.register()
  }
  
  public render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { loading, data } = this.props

    if (data) {
      return <Redirect to={from} />
    }
  
    return (
      <Page>
        <Container>
          <div className="register">
            <div className="register-cover"></div>
            <div className="register-content">
              <div className="register-brand">
                <a href="/">
                  Ephemeris
                </a>
                <p className="m-b-20">Putting intelligence behing bulk scheduling.</p>
              </div>
              <h3 className="m-b-20"><span>Sign Up</span></h3>
              <form name="register_form" onSubmit={this.handleSubmit}>
                <div className="row row-space-20">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">First Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" value="" />
                    </div>
                    <div className="form-group">
                      <label className="control-label">Last Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" value="" />
                    </div>
                    <div className="form-group">
                      <label className="control-label">Email Address <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" value="" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">Password <span className="text-danger">*</span></label>
                      <input type="password" className="form-control" value="" />
                    </div>
                    <div className="form-group">
                      <label className="control-label">Confirm Password <span className="text-danger">*</span></label>
                      <input type="password" className="form-control" value="" />
                    </div>
                  </div>
                </div>
                <div className="m-b-10 m-t-10" style={{fontSize: '0.9rem'}}>
                  <div className="checkbox-inline">
                    <input type="checkbox" id="register-agreement" /> <label htmlFor="register-agreement">I have read and agree to the <a href="/terms-of-service" target="_blank" style={{color: '#5ac8fa', fontWeight: 'bold'}}>Terms of Service</a> and <a href="/privacy-policy" target="_blank" style={{color: '#5ac8fa', fontWeight: 'bold'}}>Privacy Policy</a>.</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.registerUser}>Sign Up</button>
                <div className="m-t-20" style={{fontSize: '0.9rem'}}>
                  Already registered? <a href="/login" style={{marginLeft: '5px', color: '#5ac8fa', fontWeight: 'bold'}}>Sign In</a>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </Page>
    )
  }
}

const mapStateToProps = ({ register, auth }: ApplicationState) => ({
  loading: register.loading || auth.loading,
  errors: register.error || auth.error,
  auth: auth.data,
  data: register.data
})

const mapDispatchToProps = {
  register,
  check
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)
