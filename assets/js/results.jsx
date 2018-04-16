import React from 'react';
import ReactDOM from 'react-dom';
import Job from './job';
import { connect } from 'react-redux';

class Results extends React.Component {

  render() {
    console.log("results", this.props);
    let jobs = _.map(this.props.jobs, (job) => <Job key={job.id} job={job} />);
    return(<div className="container-fluid">
    Results
    {jobs}
  </div>)
}
}

export default connect((state) => state)(Results);
