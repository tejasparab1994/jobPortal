import React from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { connect } from 'react-redux';
import api from './api'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

let LoginForm = connect(({login}) => {return {login};})((props) => {
    function update(ev) {
      let tgt = $(ev.target);
      let data = {};
      data[tgt.attr('name')] = tgt.val();
      props.dispatch({
        type: 'UPDATE_LOGIN_FORM',
        data: data,
      });
    }
  
    function create_token(ev) {
      api.submit_login(props.login, props.history );
      console.log(props.login);
    }
    
    return <div>
    <Form inline>
      <FormGroup>
      <TextField hintText="Name" floatingLabelText="Name" name="name" 
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
      <TextField hintText="Password" floatingLabelText="Password" name="pass" 
               value={props.login.pass} type="password" onChange={update} />
      </FormGroup>
      <RaisedButton label="Log In" primary={true} onClick = {create_token} />
    </Form>
  </div>;
  });

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
     <div class="row">
     <div class="col-sm-6">
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
      </div>
      <div class="col-sm-6">
      <LoginForm history = {params.history} />
      </div>
      </div>
</div> )
  }

function state2props(state, props) {
    console.log("rerender", state);
      return { userForm: state.userForm}  
  }

export default connect(state2props)(UserForm);