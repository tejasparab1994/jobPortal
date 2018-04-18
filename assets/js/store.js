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
let empty_scorer = {
  description: "",
  score: "",
  skillsRequired: [],
  skillsPresent: []
};
function scorer(state=empty_scorer, action) {
  switch (action.type) {
    case 'UPDATE_SCORER_DESCRIPTION':
    return Object.assign({}, state, action.data);
    case 'UPDATE_SCORER_SCORE':
    return Object.assign({}, state, action.data);
    case "RESET_SCORER":
    return empty_scorer;
    default:
    return state;

  }
}

function jobs(state = [], action) {
  switch (action.type) {
    case 'ADD_JOB_LIST':
    return [...action.data];
    case 'UPDATE_JOB_LIST':
    return [...state, ...action.data];
    default:
    return state;
  }
}

function isMobile(state = false, action) {
  switch(action.type) {
    case 'SET_MOBILE':
    return true;
    case 'SET_DESKTOP':
    return false;
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

let empty_login = {
  name: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
    return Object.assign({}, state, action.data);
    case 'CLEAR_LOGIN_FORM':
    return empty_login;
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

function loading(state=false, action) {
  switch(action.type) {
    case 'SET_TRUE':
    return true;
    case 'SET_FALSE':
    return false;
    default:
    return state;
  }
}

let empty_searchParams = {
  title: "",
  location: "",
  page: 0,
  alldisp: false,
};

function searchParams(state = empty_searchParams, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_PARAMS':
    return Object.assign({}, state, action.data);
    case 'ON_SUBMIT':
    return state;
    case 'INCREMENT_PAGE':
    return Object.assign({}, state, {page: state.page+1});
    case 'RESET_PAGE':
    return Object.assign({}, state, {page: 0, alldisp: false,});
    case 'RESET_FORM':
    return empty_searchParams;
    case 'ALL_JOBS_DISPLAYED':
    return Object.assign({}, state, {alldisp: true});
    default:
    return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({jobs, searchParams, users, resume, login, token, userForm, scorer, loading, isMobile});
  let state1 = reducer(state0, action);
  console.log("ReduxState", state1);
  return deepFreeze(state1);
};
let store = createStore(root_reducer);
export default store;
