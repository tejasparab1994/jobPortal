import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class ResumeParser extends React.Component {

  clear(ev) {
    $("#fileform").val('');
    this.props.dispatch({type: 'CLEAR_RESUME'});
  }

  update(ev){
    let tgt = $(ev.target);
    let value = ev.target.files[0];
    let data = {};
    data[tgt.attr('name')] = value;
    data["name"] = value.name;
    let action = {
      type: 'UPDATE_RESUME',
      data: data,
    };
    this.props.dispatch(action);
  }


  onFormSubmit(ev){
    ev.preventDefault() // Stop form submit
    if (this.props.resume.file != null) {

      let reader = new FileReader()
      let filename = this.props.resume.file != null ? this.props.resume.name : "";
      reader.readAsDataURL(this.props.resume.file)
      reader.addEventListener("load", ()=> {
        let payload = {binary: reader.result.split(",", 2)[1], filename: filename}
        console.log(payload);
        this.props.channel.push("uploadfile", payload)
      }, false);
    }

  }

  render() {
    return (
      <form onSubmit={(ev)=>this.onFormSubmit(ev)}>
        <h1>File Upload</h1>
        <input id="fileform" type="file" name="file" onChange={(ev)=>this.update(ev)} />
        <button type="submit">Upload</button>
        <button name="clear" onClick={(ev)=>this.clear(ev)}>Clear</button>

      </form>
    )
  }
}

export default connect((state) => state)(ResumeParser);
