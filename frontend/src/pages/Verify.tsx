import * as React from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'

import LoadingOverlay from '../components/data/LoadingOverlay'
import LoadingOverlayInner from '../components/data/LoadingOverlayInner'
import LoadingSpinner from '../components/data/LoadingSpinner'

import { ApplicationState } from '../store'
import { verify } from '../store/auth/actions'
import { User } from '../store/auth/types'

interface PropsFromState {
  loading: boolean
  data: User|null
  error?: string
}

interface PropsFromDispatch {
  verify: typeof verify
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps

class VerifyPage extends React.Component<AllProps> {
  public componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    const verificationToken = parsed.verificationToken

    if (verificationToken && typeof verificationToken === 'string') {
      verify(verificationToken)
    }
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
          <div className="login">
            <div className="login-cover"></div>
            <div className="login-content">
              <div className="login-brand">
                <a href="/">Ephemeris</a>
                <p className="m-b-20">Putting intelligence behing bulk scheduling.</p>
              </div>
              {loading && (
                <LoadingOverlay>
                  <LoadingOverlayInner>
                    <LoadingSpinner />
                  </LoadingOverlayInner>
                </LoadingOverlay>
              )}
              {!loading && (
                <div className="m-t-20" style={{fontSize: '1.25rem'}}>
                  <h3>We have successfully verified your email address! You may now <a href="/login">Login</a> to Ephemeris.</h3>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Page>
    )
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  loading: auth.loading,
  errors: auth.error,
  data: auth.data
})

const mapDispatchToProps = {
  verify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyPage)
