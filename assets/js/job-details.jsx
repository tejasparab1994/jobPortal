import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {Redirect} from 'react-router-dom'

class JobDetails extends React.Component {

  componentDidMount() {
    let jobs = null

      if (this.props.source === "HomeTab"){
      jobs = this.props.jobs.filter((el) => {
        return(el.id === this.props.id)
      })}
      if (this.props.source === "AppliedTab"){
      jobs = this.props.AppliedJobs.filter((el) => {
        return(el.id === this.props.id)
      })}
      if (this.props.source === "ApplyLaterTab"){
      jobs = this.props.ApplyLaterJobs.filter((el) => {
        return(el.id === this.props.id)
      })}
      let job = jobs[0]
      if(this.props.token){
    this.props.channel.push("GET_SCORE_FROM_DESCRIPTION", {
      description: job.description.replace(/<\/?[^>]+(>|$)/g,""),
      user_id: this.props.token.user_id
    }).receive("ok",(resp) => {
      this.props.dispatch({type:'JOB_DETAIL_SCORE', score: resp.score})
    })}
  }

  redirect(url) {
    return <Redirect push to={url} />
  }

  card() {
    return(<div className="container">
    <Card>
      <CardHeader
        title={job.title}
        subtitle={job.location}
        avatar={job.company_logo}
        >
      </CardHeader>
      <CardText>
        {job.description.replace(/<\/?[^>]+(>|$)/g,"")}
        <div className="organizer-padding"></div>
        <RaisedButton label="APPLY" primary={true} onClick={() => window.open(job.url, "_blank")} />
      </CardText>
    </Card>
  </div>)
  }

  render() {
    console.log(this.props.source);
    let jobs = null

      if (this.props.source === "HomeTab"){
      jobs = this.props.jobs.filter((el) => {
        return(el.id === this.props.id)
      })}
      if (this.props.source === "AppliedTab"){
      jobs = this.props.AppliedJobs.filter((el) => {
        return(el.id === this.props.id)
      })}
      if (this.props.source === "ApplyLaterTab"){
      jobs = this.props.ApplyLaterJobs.filter((el) => {
        return(el.id === this.props.id)
      })}
      let job = jobs[0]
      console.log("joblength???", jobs.length)

      if (jobs.length === 0) {
        return <Redirect to="/" />
      }
      else {
        return (<div className="container">
        <Card>
          <CardHeader
            title={job.title}
            subtitle={job.location}
            avatar={job.company_logo}
            >
          </CardHeader>
          <CardText>
            {job.description.replace(/<\/?[^>]+(>|$)/g,"")}
            <div className="organizer-padding"></div>
            <RaisedButton label="APPLY" primary={true} onClick={() => window.open(job.url, "_blank")} />
            <span className="float-right"><h5>Your Profile Matches {this.props.jobDetailScore}% with this job</h5></span>
          </CardText>
        </Card>
      </div>)
      }
}
}

export default connect((state) => state)(JobDetails);
