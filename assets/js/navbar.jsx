import React from 'react';
import ReactDOM from 'react-dom';
import {NavItem, NavLink} from 'reactstrap'
import UserOptions from './user-options'

export default class Navbar extends React.Component {
  render() {
    return(
      <div className="container-fluid">
        <nav className="navbar navbar-light navbar-expand-lg navbar-blue">
          <a className="navbar-brand text-light">Jobs.</a>
          <UserOptions />
      </nav>
    </div>
  )
}

}
