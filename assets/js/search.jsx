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
    console.log("searchParams", this.props);
    this.params.channel.push("search", {
      title: this.props.params.title,
      location: this.props.params.location,
    }).receive("ok", resp=> {
      console.log(resp.github.concat(resp.authenticJobs));
      let action = {
      type: 'UPDATE_JOB_LIST',
      data: resp.github.concat(resp.authenticJobs),
    };

    this.params.dispatch(action);})
  }

  render() {

    return(
      <div className="container-fluid search-input">
        <TextField
          name="title"
          floatingLabelText="Job"
          onChange={(ev)=>this.update(ev)}
        />
        <TextField
          name="location"
          floatingLabelText="Location"
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


  return { params: state.searchParams};
}


// Export the result of a curried function call.
export default connect(state2props)(Search);
