import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from './api'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
function UserForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_USER_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }
  
  function submit(ev) {
    console.log("Should create User.");
    console.log(params.userForm);
   validateInput()
  }
  
  function validateInput() {
    console.log("entered validate input")
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(params.userForm.email) ) {
      if(params.userForm.name.length == 0) {
        alert('name is empty')
        return false
      }
      else {
        if(params.userForm.password.length == 0)
        {
          alert("password is empty")
          return false
        }
        else {
          api.submit_user(params.userForm, params.history);
        }
      }
    }
    else {
      alert("invalid email")
      return false
    }
  }
    return (
    <div class="col s12" align="center" style={{padding: "10ex", width: "50%"}}>
     <h3 style={{color: "violet"}} > Register Here</h3>
    <Paper zDepth={2}>
   
      <FormGroup>
        <TextField hintText="Enter your Email" floatingLabelText="Email" name="email" onChange={update} value={params.userForm.email}/>
      </FormGroup>
      <FormGroup>
      <TextField hintText="Enter your name" floatingLabelText="Name" name="name" onChange={update} value={params.userForm.name} />
      </FormGroup>
      <FormGroup>
      <TextField hintText="Password Field" floatingLabelText="Password" type="password" name="password" value={params.userForm.password} onChange={update} />
      </FormGroup>
      <input type="hidden" name = "login_type" value="formRegister" />
      <RaisedButton label="Add User" secondary={true} onClick = {submit} />
      </Paper>
</div> )
  }

function state2props(state, props) {
    console.log("rerender", state);
      return { userForm: state.userForm}  
  }

export default connect(state2props)(UserForm);