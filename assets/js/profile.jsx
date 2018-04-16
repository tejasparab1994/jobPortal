import React from 'react';
import ReactDOM from 'react-dom';
import Job from './job';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ResumeParser from './resumeParser';
import Organizer from './organizer';
import ApplyLater from './applyLater';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <ResumeParser channel={this.props.channel} />
        <Tabs>
          <Tab label ="Applied Jobs">
            <Organizer />
          </Tab>

          <Tab label = "Marked for Apply Later">
            <ApplyLater />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
