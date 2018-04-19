import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import { connect } from 'react-redux';
import Job from './job';

class Organizer extends React.Component {
  render() {
    let jobs = _.map(this.props.AppliedJobs, (job) => <Job source= "AppliedTab" channel={this.props.channel} key={job.id} job={job} />);

    return(
      <div className="container-fluid organizer-padding">
        {jobs}
      </div>)
    }
  }

  export default connect((state) => state)(Organizer);
