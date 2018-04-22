import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Job from './job';

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};
const chipstyles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

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
        let payload = {binary: reader.result.split(",", 2)[1], filename: filename, user_id: this.props.token.user_id}

        this.props.channel.push("uploadfile", payload).receive("ok", (resp)=>{

        this.props.dispatch({ type: 'AFTER_UPDATE_RESUME', data: resp.skills})
        alert("successfully uploaded.")
      })
      }, false);
    }

  }

  render() {
    let jobs = _.map(this.props.jobs, (job) => <Job channel={this.props.channel} source= "HomeTab" key={job.id} job={job} />);

    let skills = _.map(this.props.userSkills, (skill, id)=> <Chip key={id} style={chipstyles.chip} className=""> {skill} </Chip>)
    return (
      <div className="container-fluid organizer-padding">
        <form onSubmit={(ev)=>this.onFormSubmit(ev)}>
          <div className="row d-flex align-items-center">
            <RaisedButton
              className=""
              label="Update Resume"
              labelPosition="before"
              style={styles.uploadButton}
              containerElement="label"
              secondary={true}>
              <input id="fileform" type="file" name="file" accept=".pdf" onChange={(ev)=>this.update(ev)} style={styles.uploadInput} />
            </RaisedButton>
            {this.props.resume.name != "" ? <Chip className="ml-1 mr-1" onRequestDelete={(ev)=>this.clear(ev)}> {this.props.resume.name} </Chip> : <div><Chip className="ml-1 mr-1" > Only PDF files are allowed </Chip></div>}
            {this.props.resume.name != "" ? <RaisedButton className="mt-1" label="Upload" type="submit" className="button-submit" primary={true}/> :<div></div>}
          </div>
           <div className="gap">
          <h3>Your Skills are:</h3>
          <div style={chipstyles.wrapper}>{skills}</div>
          </div>

        </form>
      </div>
    )
  }
}

export default connect((state) => state)(ResumeParser);
