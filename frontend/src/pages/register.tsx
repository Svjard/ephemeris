import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

function RegisterPage() {
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
				    <form action="index.html" method="POST" name="register_form">
					    <div className="row row-space-20">
						    <div className="col-md-6">
							    <div className="form-group">
                    <label className="control-label">Name <span className="text-danger">*</span></label>
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
					    <button type="submit" className="btn btn-primary">Sign Up</button>
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

export default RegisterPage
