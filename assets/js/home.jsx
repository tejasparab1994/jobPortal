import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import Search from './search'
import Results from './results'
import Profile from './profile'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Mui from './mui';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {AppBar} from 'material-ui';
import { Provider, connect } from 'react-redux';
import JobDetails from './job-details'
import UserForm from './newUser'
import Scorer from './scorer'

export default function home_init(root, store, channel) {
  ReactDOM.render(<Provider store={store}><App state={store.getState()} channel={channel} /></Provider>, root);
  let tokenval = document.getElementById("token-carrier")
    let user_id = document.getElementById("user-id")
    if(tokenval.dataset.token != null) {
        let resp = {
            user_id: tokenval.dataset.userid,
            token: tokenval.dataset.token,
            name: tokenval.dataset.name
        }
        store.dispatch({
            type: 'SET_TOKEN',
            token: resp,
          });
        channel.push("AFTER_LOG_IN", {user_id: tokenval.dataset.userid})
          .receive("ok", response => {
            console.log(response);
            store.dispatch({
              type: 'AFTER_LOG_IN',
              data: {
                applylater: _.map(response.applyLaterJobs,function(num){ return JSON.parse(num) }),
                applied: _.map(response.appliedJobs,function(num){ return JSON.parse(num) }),
              }

            });
        })

    }
  // ReactDOM.render(<Provider store={store}> <App state={store.getState()} /> </Provider>, root);
}

class Jobs extends React.Component {
  constructor(props){
    super(props);
    this.channel = props.channel
    console.log(props);
  }

  componentDidMount() {
    if (window.innerWidth < 1200) {
      this.props.dispatch({type: "SET_MOBILE"})
    }

  }

  render() {
    return(
      <Router>
        <MuiThemeProvider muiTheme={Mui}>
          <Navbar channel={this.props.channel} token = {this.props.token}/>
          <div className= "containerd-fluid">
            <Route path="/" exact={true} render={() => <div><Search channel={this.props.channel} /><div className="container"><Results jobs={this.props.state.jobs} channel={this.props.channel}/></div></div>} />
            <Route path="/githubToken" exact={false} render={(history) => <div>{history.history.push("/")}</div>} />
            <Route path="/register" exact={false} render={(history) => <div> <UserForm history = {history}/> </div>} />
            <Route path="/tools" render={(history) => this.props.token ? (<Scorer channel={this.props.channel} />) : (<div>{history.history.push("/")}</div>) }/>
            <Route path="/profile" render={(history) => this.props.token ? ( <Profile channel={this.props.channel} />) : (<div> {history.history.push("/")} </div>)} />
            <Route name="description" path="/description/:id" render={(id) => <JobDetails id={id.match.params.id} />} />
          </div>
    </MuiThemeProvider>
    </Router>
    )
  }

}

let App = connect((state) => state)(Jobs);
