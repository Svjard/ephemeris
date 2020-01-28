import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

export default class SideBar extends React.Component {
  public render() {
    return (
      <div id="sidebar" className="sidebar sidebar-inverse">
			  <ul className="nav">
					<li className="nav-profile">
						<button type="button" className="btn btn-default m-b-3 btn-block">Add New Schedule</button>
					</li>
					<li className="nav-divider"></li>
					<li className="has-sub expand">
						<a href="#">
							<FontAwesomeIcon icon={faCaretDown} className="pull-right" style={{fontSize: '1rem', marginBottom: '2px'}} />
						  <FontAwesomeIcon icon={faCalendarAlt} style={{fontSize: '1rem'}} />
						  <span style={{fontSize: '0.9rem', marginLeft: '0.5rem'}}>My Schedules</span>
						</a>
						<ul className="sub-menu" style={{display: 'block'}}>
							<li><a href="#">Epic Music Festival</a></li>
							<li><a href="#">ACG - Spring Semester</a></li>
						</ul>
					</li>
				</ul>
			</div>
    )
  }
}