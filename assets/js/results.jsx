import React from 'react';
import ReactDOM from 'react-dom';
import Job from './job';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress'

class Results extends React.Component {

  render() {
    if(this.props.loading) {
      return(<CircularProgress style={{marginLeft: '50%', marginTop: '15%'}} size={80}/>)
    }
    let jobs = _.map(this.props.jobs, (job) => <Job key={job.id} job={job} />);
    return(<div className="container-fluid">
    {jobs.length > 0 ? <div className="container-fluid organizer-padding">Found {jobs.length} results </div> : <div></div>}
    {jobs}
  </div>)
}
}

export default connect((state) => state)(Results);
