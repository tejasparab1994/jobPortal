import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Scorer extends React.Component {
  render() {
    return(<div className="container-fluid">
    <div className="scorer">
    <p>Paste the text of the job description in the box below. Click on MATCH! and find out how closely your resume matches to this job description</p>
    </div>
    <div className="scorer">
    <TextField
      floatingLabelText="Enter job description"
      multiLine={true}
      rowsMax={10}
      fullWidth={true}
      />
    <RaisedButton label="Match!" primary={true}/>
    </div>
    <div className="scorer">
    <p className="display2">Your score is</p>
    <h5>100%</h5>
    </div>
  </div>)
}
}
