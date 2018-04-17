import React from 'react';
import ReactDOM from 'react-dom';
import {NavItem} from 'reactstrap'
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
import {NavLink} from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return(
      <div className="containerd-fluid">
        <AppBar showMenuIconButton={false} titleStyle={{flex: 0}}>
          <div className="container">
        <AppBar
          title="Jobs."
          zDepth = {0}
          showMenuIconButton={false}
          iconElementRight = {false? this.beforeLogin(): this.afterLogin()}
        /></div>
      </AppBar>
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
      <NavLink to="/"><MenuItem primaryText="Home" /></NavLink>
      <NavLink to="/tools"><MenuItem primaryText="Tools" /></NavLink>
      <NavLink to="/profile"><MenuItem primaryText="Profile" /></NavLink>
      <MenuItem primaryText="Log out" />
    </IconMenu>
  )
}

}
