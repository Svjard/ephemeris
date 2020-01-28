import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

function ForgotPage() {
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
                <label className="control-label">Email</label>
                <input type="text" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="m-t-20" style={{fontSize: '0.9rem'}}>
              Return to login? <a href="/login" style={{marginLeft: '5px', color: '#5ac8fa', fontWeight: 'bold'}}>Login</a>
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}

export default ForgotPage;