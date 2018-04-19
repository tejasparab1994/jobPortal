import React from 'react';
import ReactDOM from 'react-dom';
import {InputGroup, Button, Input} from 'reactstrap'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import ActionSearch from 'material-ui/svg-icons/action/search';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.params = props;
    console.log("this is constructor");

  }
  componentDidMount(){
    console.log("this is on Mount");

    this.params.dispatch({type: 'RESET_FORM'});
    window.onscroll = () => {
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;
      if (offset === height && this.props.params.alldisp==false) {
        this.props.channel.push("search", {
          title: this.props.params.title,
          location: this.props.params.location,
          page: this.props.params.page + 1,
          jobids: _.map(this.props.state.jobs,  function(num){ return num.id; })
        }).receive("ok", resp=> {
          let data = resp.github.concat(resp.authenticJobs)

          if (data.length != 0) {
            let action = {
              type: 'UPDATE_JOB_LIST',
              data: resp.github.concat(resp.authenticJobs),
            };
            this.params.dispatch({type: 'INCREMENT_PAGE'})
            this.params.dispatch(action);
          }
          else {
            this.params.dispatch({type: 'ALL_JOBS_DISPLAYED'})
          }
        })
      }
    };
  }
  nextPage(){

  }
  update(ev){
    let tgt = $(ev.target);
    let value = tgt.val();
    let data = {};
    data[tgt.attr('name')] = value;
    let action = {
      type: 'UPDATE_SEARCH_PARAMS',
      data: data,
    };

    this.params.dispatch(action);
  }

  submit(ev){
    //console.log("searchParams", this.props);
    this.props.dispatch({type: "SET_TRUE"})
    this.params.dispatch({type: 'RESET_PAGE'});
    this.params.channel.push("search", {
      title: this.props.params.title,
      location: this.props.params.location,
      page: 0,
      jobids:[]
    }).receive("ok", resp=> {
      //console.log(resp.github.concat(resp.authenticJobs));
      this.props.dispatch({type: "SET_FALSE"})
      let action = {
        type: 'ADD_JOB_LIST',
        data: resp.github.concat(resp.authenticJobs),
      };
      this.params.dispatch({type: 'RESET_FORM'});
      this.params.dispatch(action);})
    }

    render() {

      return(
        <div className="search-input">
          <TextField
            name="title"
            className="job-description"
            floatingLabelText="Keyword or Title"
            inputStyle={{ color: 'white', fontSize: '16px' }}
            floatingLabelStyle ={{color: 'white', fontSize: '16px'}}
            onChange={(ev)=>this.update(ev)}
          />

          <TextField
            name="location"
            floatingLabelText="Location"
            inputStyle={{ color: 'white', fontSize: '16px' }}
            floatingLabelStyle ={{color: 'white', fontSize: '16px'}}
            onChange={(ev)=>this.update(ev)}
          />

          <RaisedButton
            className="search-margin"
            label="Search"
            onClick={(ev)=>this.submit(ev)}
            primary={true}
            icon={<ActionSearch />}/>
        </div>
      )
    }
  }

  function state2props(state, props) {


    return { params: state.searchParams, state: state};
  }


  // Export the result of a curried function call.
  export default connect(state2props)(Search);
