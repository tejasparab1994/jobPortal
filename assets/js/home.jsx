import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import Search from './search'
import Results from './results'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Mui from './mui';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {AppBar} from 'material-ui';
import { Provider, connect } from 'react-redux';

import Scorer from './scorer'

export default function home_init(root, store, channel) {
  ReactDOM.render(<Provider store={store}><App state={store.getState()} channel={channel} /></Provider>, root);
  // ReactDOM.render(<Provider store={store}> <App state={store.getState()} /> </Provider>, root);
}

class Jobs extends React.Component {
  constructor(props){
    super(props);
    this.channel = props.channel
    console.log(props);
  }

  render() {
    return(
      <Router>
      <div>
        <MuiThemeProvider muiTheme={Mui}>
          <Navbar channel={this.props.channel}/>
          <Route path="/" exact={true} render={() => <div><Search channel={this.props.channel} /> <Results jobs={this.props.state.jobs} channel={this.props.channel}/> </div>} />
          <Route path="/tools" render={() => <Scorer />} />
        </MuiThemeProvider>
      </div>
    </Router>
    )
  }

}

let App = connect((state) => state)(Jobs);
