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
import {Link} from 'react-router-dom';
import store from './store';
import api from './api';
import SvgIcon from 'material-ui/SvgIcon';
function logout() {
  store.dispatch({
    type: 'LOGOUT'
  });

}

const HomeIcon = (props) => (
  <SvgIcon {...props} >
    {<path
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
    </SvgIcon>
  );

function login() {
  api.requestGithub();
}
export default class Navbar extends React.Component {
  render() {
    return(
      <div className="containerd-fluid">
        <AppBar showMenuIconButton={false} titleStyle={{flex: 0}}>
          <div className="container">
        <AppBar
          title="Jobs"
          zDepth = {0}
          showMenuIconButton={false}
          iconElementRight = {(this.props.token==null)? this.beforeLogin(): this.afterLogin()}
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
    <div>
      {/*<a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=bdd82a1189d62daed1e5"><IconButton
        iconClassName="muidocs-icon-custom-github" tooltip="Login With Github"
        tooltipPosition="bottom-right"
      /></a>*/}

      <Link to="/"><FlatButton {...this.props}  label="Home" labelStyle={{ color: 'white', fontSize: '16px' }}/></Link>
      <Link to="/register"><FlatButton {...this.props}  label="Register/Login" labelStyle={{ color: 'white', fontSize: '16px' }}/></Link>

    </div>
  )
}

afterLogin() {

  let loginname = "Logout " + this.props.token.name
  return(
    <div style={{position: 'relative'}}>
    <Link to="/" style={{ position: 'absolute', right:'40%', top: '12%' }}><FlatButton {...this.props}  label="Home" labelStyle={{ color: 'white', fontSize: '16px' }}/></Link>
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon color = "white"/></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >

      <NavLink to="/"><MenuItem primaryText="Home" /></NavLink>
      <NavLink to="/tools"><MenuItem primaryText="Tools" /></NavLink>
      <NavLink to="/profile"><MenuItem primaryText="Profile" /></NavLink>
      <NavLink to="/" onClick = {logout}><MenuItem primaryText={loginname} /></NavLink>
    </IconMenu>
    </div>
  )
}

}
