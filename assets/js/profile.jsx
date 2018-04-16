import React from 'react';
import ReactDOM from 'react-dom';
import Job from './job';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ResumeParser from './resumeParser';

export default class Profile extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <ResumeParser />
      </div>
    );
  }
}
