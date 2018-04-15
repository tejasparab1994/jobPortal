import React from 'react';
import ReactDOM from 'react-dom';
import {InputGroup, Button, Input} from 'reactstrap'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Search extends React.Component {

  render() {

    return(
        <div className="container-fluid search-input">
          <TextField
            floatingLabelText="Job"
            onChange={(e) => {console.log(e.target.value)}}
          />
          <TextField
            floatingLabelText="Location"
          />

          <RaisedButton label="Search" primary={true}/>
      </div>
    )
  }
}
