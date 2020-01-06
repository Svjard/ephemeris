import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

function RegisterPage() {
  return (
    <Page>
      <Container>
        <div className="register register-with-news-feed">
          <div className="news-feed">
            <div className="news-image"></div>
            <div className="news-caption">
              <h4 className="caption-title"><b>Color</b> Admin App</h4>
              <p>
                As a Color Admin app administrator, you use the Color Admin console to manage your organization’s account, such as add new users, manage security settings, and turn on the services you want your team to access.
              </p>
            </div>
          </div>
          <div className="right-content">
            <h1 className="register-header">
              Sign Up
              <small>Create your Color Admin Account. It’s free and always will be.</small>
            </h1>
            <div className="register-content">
              <form method="GET" className="margin-bottom-0">
                <label className="control-label">Name <span className="text-danger">*</span></label>
                <div className="row row-space-10">
                  <div className="col-md-6 m-b-15">
                    <input type="text" className="form-control" placeholder="First name" required />
                  </div>
                  <div className="col-md-6 m-b-15">
                    <input type="text" className="form-control" placeholder="Last name" required />
                  </div>
                </div>
                <label className="control-label">Email <span className="text-danger">*</span></label>
                <div className="row m-b-15">
                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Email address" required />
                  </div>
                </div>
                <label className="control-label">Re-enter Email <span className="text-danger">*</span></label>
                <div className="row m-b-15">
                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Re-enter email address" required />
                  </div>
                </div>
                <label className="control-label">Password <span className="text-danger">*</span></label>
                <div className="row m-b-15">
                  <div className="col-md-12">
                    <input type="password" className="form-control" placeholder="Password" required />
                  </div>
                </div>
                <div className="checkbox checkbox-css m-b-30">
                  <div className="checkbox checkbox-css m-b-30">
                    <input type="checkbox" id="agreement_checkbox" value="" />
                    <label htmlFor="agreement_checkbox">
                    By clicking Sign Up, you agree to our <a href="javascript:;">Terms</a> and that you have read our <a href="javascript:;">Data Policy</a>, including our <a href="javascript:;">Cookie Use</a>.
                    </label>
                  </div>
                </div>
                <div className="register-buttons">
                  <button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
                </div>
                <div className="m-t-30 m-b-30 p-b-30">
                  Already have an account? Click <a href="/login">here</a> to login.
                </div>
                <hr />
                <p className="text-center mb-0">
                  &copy; Marc Fisher All Right Reserved 2019
                </p>
              </form>
            </div>
          </div>
        </div>
		  </Container>
    </Page>
  )
}

export default RegisterPage
