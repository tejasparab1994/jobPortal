import React from 'react';
import ReactDOM from 'react-dom';
import {NavItem, NavLink} from 'reactstrap'


export default class UserOptions extends React.Component {

  afterLogin() {
    return(<div className="navbar-nav ml-auto">
      <NavItem className="nav-item">
        <NavLink className="nav-link text-light">Tools</NavLink>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink className="nav-link text-light">Profile</NavLink>
      </NavItem>
    </div>)
  }

  beforeLogin() {
    return(<div className="navbar-nav ml-auto">
      <NavItem className="nav-item">
        <NavLink className="nav-link text-light">Login</NavLink>
      </NavItem>
    </div>)
  }

  render() {
    return(<div className="ml-auto">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#userOptions" aria-controls="userOptions" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="userOptions">
        <ul className="navbar-nav ml-auto">
          {this.beforeLogin()}
        </ul>
      </div>
    </div>)
  }
}
