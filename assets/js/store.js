import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

  //
  // state layout:
  // {
  //   jobs: [... Jobs ...],
  //   searchParams: {
  //     title: "",
  //     location: "",
  //   }
  //   user: {
  //     user_id: Number,
  //     user_name: String,
  //     token: String,
  //     type: github/ private,
  //   }
  // }

function jobs(state = [], action) {
  switch (action.type) {
    case 'UPDATE_JOB_LIST':
    return [...action.data];
    default:
    return state;
  }
}

function users(state = [], action) {
  return state;
}

let empty_user_form = {
  name: "",
  email: "",
  password: "",
  login_type: "Register"
};

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      console.log(action.token)
      return action.token;
    case 'LOGOUT' :
      return null;
    default:
      return state;
  }
}

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function userForm(state = empty_user_form, action ) {

  switch (action.type) {
    case 'UPDATE_USER_FORM':
      return Object.assign({}, state, action.data);
   case 'CLEAR_USER_FORM':
      return empty_user_form;
   case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }

}

let empty_login = {
  name: "",
  pass: "",
};

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
  return [action.user, ...state];
  default:
    return state;
  }
}

let empty_resume = {
  file: null,
  name: "",
}
function resume(state=empty_resume, action) {
  switch (action.type) {
    case 'UPDATE_RESUME':
    return Object.assign({}, state, action.data);
    case 'CLEAR_RESUME':
    return Object.assign({}, state, empty_resume);
    default:
    return state;
  }
}

let empty_searchParams = {
  title: "",
  location: "",
};

function searchParams(state = empty_searchParams, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_PARAMS':
    return Object.assign({}, state, action.data);
    case 'ON_SUBMIT':
    return state;
    default:
    return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({jobs, searchParams, users, resume, login, token, userForm});
  let state1 = reducer(state0, action);
  console.log("ReduxState", state1);
  return deepFreeze(state1);
};
let store = createStore(root_reducer);
export default store;