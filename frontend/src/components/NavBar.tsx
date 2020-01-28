import * as React from 'react'
import { connect } from 'react-redux'
import LoadingOverlay from './data/LoadingOverlay'
import LoadingOverlayInner from './data/LoadingOverlayInner'
import LoadingSpinner from './data/LoadingSpinner'

import { ApplicationState } from '../store'
import { check } from '../store/auth/actions'
import { User } from '../store/auth/types'

interface NavBarState {
  profileMenuVisible: boolean
}

interface PropsFromState {
  loading: boolean
  data: User|null
  error?: string
}

interface PropsFromDispatch {
  check: typeof check
}

type AllProps = PropsFromState & PropsFromDispatch
class NavBar extends React.Component<AllProps, NavBarState> {
  private wrapperRef: any
  
  constructor(props: AllProps, state: NavBarState) {
    super(props, state)

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      profileMenuVisible: false
    }
  }

  public componentDidMount() {
    this.props.check()
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  public setWrapperRef(node: any) {
    this.wrapperRef = node
  }
  
  public handleClickOutside(event: MouseEvent) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        profileMenuVisible: false
      })
      return
    }

    if (!this.state.profileMenuVisible) {
      this.setState({
        profileMenuVisible: true
      })
    }
  }
  
  public render() {
    const { profileMenuVisible } = this.state
    const { loading, data, error } = this.props

    return (
      <div id="header" className="header navbar navbar-default navbar-fixed-top">
			  <div className="container-fluid">
          <div className="navbar-header">
					  <a href="index.html" className="navbar-brand">
					    <b>Ephemeris</b>
					  </a>
					  <button type="button" className="navbar-toggle">
						  <span className="icon-bar"></span>
						  <span className="icon-bar"></span>
					  </button>
				  </div>
				  <div className="navbar-xs-justified">
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            {!loading && data && (
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown" ref={this.setWrapperRef}>
                  <a href="#">
                    <span className="navbar-user-img online pull-left">
                      <img src="../assets/img/user.jpg" alt="" />
                    </span>
                    <span className="hidden-xs ">{data.firstName} {data.lastName}<b className="caret"></b></span>
                  </a>
                  <ul className={`dropdown-menu ${profileMenuVisible ? 'show' : ''}`}>
                    <li><a href="/">Profile</a></li>
                    <li><a href="/">Settings</a></li>
                    <li className="divider"></li>
                    <li><a href="/logout">Log Out</a></li>
                  </ul>
                </li>
              </ul>
            )}
				  </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  loading: auth.loading,
  errors: auth.error,
  data: auth.data
})

const mapDispatchToProps = {
  check
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
