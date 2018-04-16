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
  let reducer = combineReducers({jobs, searchParams});
  let state1 = reducer(state0, action);
  console.log("ReduxState", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
