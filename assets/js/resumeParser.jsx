
import React from 'react'
// import axios, { post } from 'axios';

export default class ResumeParser extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    console.log(this.state.file);
    let formData = new FormData();
    let reader = new FileReader()
    let file = this.state.file.name;
    reader.readAsDataURL(this.state.file)
    reader.addEventListener("load", ()=> {
      console.log(file);
      // console.log(reader.result.split(",", 2)[1]);
      let payload = {binary: reader.result.split(",", 2)[1], filename: file}
      console.log(payload);
      this.props.channel.push("uploadfile", payload)
  }, false);

  }

  onChange(e) {
    this.setState({file:e.target.files[0]})

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
    return  "post(url, formData,config)"
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}
