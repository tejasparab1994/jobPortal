import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import { connect } from 'react-redux';
import Job from './job';


class ApplyLater extends React.Component {
  // console.log(this.props.ApplyLaterJobs);
  render(){
    let jobs = _.map(this.props.ApplyLaterJobs, (job) => <Job channel={this.props.channel} key={job.id} job={job} />);

    return (
      <div className="container-fluid organizer-padding">
          {jobs}
        </div>
      );
    }
  }

  export default connect((state) => state)(ApplyLater);
