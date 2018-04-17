import store from './store';
class TheServer {
request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
            type: 'USERS_LIST',
            users: resp.data,
          });
      },
      error: (error) => {
        console.log(error)
       
      }
    });
  }
requestGithub() {
$.ajax("/api/v1/githubToken", {
  method: "get",
  dataType: "json",
  contentType: "application/json; charset=UTF-8",
  success: (resp) => {
    console.log(resp)
    store.dispatch({
      type: 'SET_TOKEN',
      token: resp,
    });
    },

});

}

  submit_user(data, history) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data}),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
        store.dispatch({
          type: 'CLEAR_USER_FORM',
          user: resp.data,
        });
        location.href = "/"
      },
      error: (error) => {
        console.log(error)
        alert("validation errors")
      }
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        console.log(resp)
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (err) => {
        console.log(err)
        alert("invalid user name or password. please register below if you have not registered")
      }
    });
  }

  updateForm(task, taskid) {
    store.dispatch({
      type: 'LOAD_TASK_FORM_DATA',
      data: task,
    });
  }
  updateCreatedTask(taskid, data, history) {
    $.ajax("/api/v1/tasks/" + taskid, {
      method: "patch",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({id: taskid, task: data}),
      success: (resp) => {
        console.log("response is")
        console.log(resp)
        console.log("history is")
        console.log(history)
        store.dispatch({
          type: 'UPDATE_TASK'
        });
        this.request_tasks()
       alert("task updated successfully")
       history.push('/')
       
      },
    });
  }
   
}

export default new TheServer();