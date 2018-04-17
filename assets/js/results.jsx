import React from 'react';
import ReactDOM from 'react-dom';
import Job from './job';
import { connect } from 'react-redux';

class Results extends React.Component {

  render() {
    let jobs = _.map(this.props.jobs, (job) => <Job key={job.id} job={job} />);
    return(<div className="container-fluid">
    {jobs.length > 0 ? <div className="container-fluid organizer-padding">Found {jobs.length} results </div> : <div></div>}
    {jobs}
  </div>)
}
}

export default connect((state) => state)(Results);
