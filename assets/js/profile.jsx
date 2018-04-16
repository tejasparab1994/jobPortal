import React from 'react';
import ReactDOM from 'react-dom';
import Job from './job';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
   e.preventDefault() // Stop form submit
   this.fileUpload(this.state.file).then((response)=>{
     console.log(response.data);
   })
 }

 onChange(e) {
   console.log("hello");
   this.setState({file:e.target.files[0]})
   console.log(this.state);
 }

  fileUpload(file){

    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    console.log(this.state);
    return  
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="resume-upload">
          <b>Upload your resume here: </b>
          <form onSubmit={this.onFormSubmit}>
            <input type="file" onChange={this.onChange}/>
            <RaisedButton type="submit" label="Submit" className="button-submit" primary={true} />
          </form>
          </div>
        </div>
    );
  }
}
