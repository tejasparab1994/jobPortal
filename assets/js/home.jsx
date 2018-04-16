import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import Search from './search'
import Results from './results'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Mui from './mui';
import {AppBar} from 'material-ui';
import { Provider, connect } from 'react-redux';

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
      <div>
        <MuiThemeProvider muiTheme={Mui}>
          <Navbar channel={this.props.channel}/>
          <Search channel={this.props.channel}/>
          <Results jobs={this.props.state.jobs} channel={this.props.channel}/>
        </MuiThemeProvider>
      </div>
    )
  }

}

let App = connect((state) => state)(Jobs);
