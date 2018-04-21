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
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

function logout() {
  store.dispatch({
    type: 'LOGOUT'
  });

}
const styles = {
  smallIcon: {
    width: 36,
    height: 36,
    color: 'white',
  },
  mediumIcon: {
    width: 38,
    height: 38,
  },
  registerIcon:{
    width: 38,
    height: 38,
  },

  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

const HomeIcon = (props) => (
  <SvgIcon {...props} >
    {<path
     d="M16 34V22h8v12h10V18h6L20 0 0 18h6v16z"/>}
    </SvgIcon>
  );

const UserIcon = (props) => (
    <SvgIcon {...props}>
      <path d="M14 19.5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zm12 0a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zM20 0C8.95 0 0 8.95 0 20s8.95 20 20 20 20-8.95 20-20S31.05 0 20 0zm0 36c-8.82 0-16-7.18-16-16 0-.58.04-1.15.1-1.71 4.71-2.09 8.47-5.95 10.42-10.74 3.62 5.1 9.57 8.45 16.31 8.45 1.55 0 3.06-.19 4.5-.53.43 1.44.67 2.96.67 4.53 0 8.82-7.18 16-16 16z"/>
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
              title= {this.home()}
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

home() {
  return(
    <div className="homeJobs">
      <Link to="/">
        <FlatButton label="Jobs." labelStyle={{ color: 'white', fontSize: '20px' }} {...this.props} icon = {<ActionHome style={styles.mediumIcon}/>}/>
      </Link>
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
      <Link to="/register">
        <FlatButton  className="register" {...this.props} icon = {<ActionAccountCircle style={styles.registerIcon}/>} />
      </Link>

    </div>
  )
}

afterLogin() {

  let loginname = "Logout " + this.props.token.name
  return(
    <div style={{position: 'relative'}}>
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <NavLink to="/tools"><MenuItem primaryText="Tools" /></NavLink>
      <NavLink to="/profile"><MenuItem primaryText="Profile" /></NavLink>
      <NavLink to="/" onClick = {logout}><MenuItem primaryText={loginname} /></NavLink>
    </IconMenu>
    </div>
  )
}

}
