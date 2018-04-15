import React from 'react';
import ReactDOM from 'react-dom';
import {NavItem, NavLink} from 'reactstrap'
import UserOptions from './user-options'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Mui from './mui';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Navbar extends React.Component {
  render() {
    return(
      <div className="container-fluid">
        <AppBar
          title="Jobs."
          showMenuIconButton={false}
          iconElementRight = {false? this.beforeLogin(): this.afterLogin()}
        />
        {/* <nav className="navbar navbar-light navbar-expand-lg navbar-blue">
          <a className="navbar-brand text-light">Jobs.</a>
          <UserOptions />
        </nav> */}
      </div>
  )
}

beforeLogin() {
  return(
    <FlatButton {...this.props} label="Login" />
  )
}

afterLogin() {
  return(
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Tools" />
      <MenuItem primaryText="Profile" />
      <MenuItem primaryText="Log out" />
    </IconMenu>
  )
}

}
