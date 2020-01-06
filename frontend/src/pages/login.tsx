import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

const coverStyle = {
  'background-image': 'url(/images/bg.jpg)'
} as React.CSSProperties

const LoginCover = () => (
  <div className="login-cover">
    <div className="login-cover-image" style={coverStyle}></div>
    <div className="login-cover-bg"></div>
  </div>
)

function LoginPage() {
  return (
    <Page>
      <Container>
        <LoginCover/>
        <div className="login login-v2" data-pageload-addclass="animated fadeIn">
          <div className="login-header">
            <div className="brand">
              <span className="logo"></span> <b>Allied</b> Sage
              <small>Bringing intelligence to the IT world</small>
            </div>
            <div className="icon">
              <img src="/images/sage.svg"/>
            </div>
          </div>
          <div className="login-content">
            <form method="GET" className="margin-bottom-0">
              <div className="form-group m-b-20">
                <input type="text" className="form-control form-control-lg" placeholder="Email Address" required />
              </div>
              <div className="form-group m-b-20">
                <input type="password" className="form-control form-control-lg" placeholder="Password" required />
              </div>
              <div className="login-buttons">
                <button type="submit" className="btn btn-success btn-block btn-lg">LOGIN</button>
              </div>
              <div className="m-t-20">
                <a href="#">Forgot Password</a> | <a href="#">Forgot Username</a>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Page>
  )
}

export default LoginPage
