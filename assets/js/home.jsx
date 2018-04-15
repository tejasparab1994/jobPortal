import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import Search from './search'
import Results from './results'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Mui from './mui';
import {AppBar} from 'material-ui';

export default function home_init(root) {
  ReactDOM.render(<Jobs />, root);
}

class Jobs extends React.Component {
  
  render() {
    return(
      <div>
        <MuiThemeProvider muiTheme={Mui}>

          <Navbar />
          <Search />
          <Results />
        </MuiThemeProvider>
      </div>
    )
  }

}
