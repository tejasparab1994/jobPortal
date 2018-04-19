import React from 'react';
import ReactDOM from 'react-dom';
import Job from './job';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress'

class Results extends React.Component {

  render() {
    if(this.props.loading) {
      return(
      <img className="img-fluid loading" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"></img>
    )
    }

    let jobs = _.map(this.props.jobs, (job) => <Job channel={this.props.channel} source= "HomeTab" key={job.id} job={job} />);
    return(<div className="container-fluid job-display">
    {jobs.length > 0 ? <div className="container-fluid organizer-padding">Found {jobs.length} results </div> : <div></div>}
    {jobs}
  </div>)
}
}

export default connect((state) => state)(Results);
