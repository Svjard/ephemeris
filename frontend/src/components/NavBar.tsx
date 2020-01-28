import * as React from 'react'

interface NavBarState {
  profileMenuVisible: boolean
}

export default class NavBar extends React.Component<{}, NavBarState> {
  constructor(props: any, state: NavBarState) {
    super(props, state)

    this.state = {
      profileMenuVisible: false
    }
  }
  
  public handleProfileClick(ev: React.MouseEvent) {
    console.log('handleProfileClick', ev)
    
    ev.preventDefault()

    this.setState({
      profileMenuVisible: true
    })
  }
  
  public render() {
    const { profileMenuVisible } = this.state

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
					  <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="javascript:;">
                  <span className="navbar-user-img online pull-left">
                    <img src="../assets/img/user.jpg" alt="" />
                  </span>
                  <span className="hidden-xs ">Sean Ngu <b className="caret"></b></span>
                </a>
                <ul className={`dropdown-menu ${profileMenuVisible ? 'show' : ''}`}>
                  <li><a href="javascript:;">Edit Profile</a></li>
                  <li><a href="javascript:;">Inbox</a></li>
                  <li><a href="javascript:;">Calendar</a></li>
                  <li><a href="javascript:;">Setting</a></li>
                  <li className="divider"></li>
                  <li><a href="javascript:;">Log Out</a></li>
                </ul>
						  </li>
					  </ul>
				  </div>
        </div>
      </div>
    )
  }
}
