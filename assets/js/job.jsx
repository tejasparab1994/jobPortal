import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {FlatButton} from 'material-ui/FlatButton'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class Job extends React.Component {
  applyLater(ev, job){
    if(this.props.ApplyLaterJobs){
      this.props.channel.push("ADD_APPLY_LATER", {job: JSON.stringify(job), user_id: this.props.token.user_id, status: "ApplyLater" })
      let action = {
        type: 'ADD_APPLY_LATER',
        data: job,
      };
      this.props.dispatch(action);
    }
  }
  dapplyLater(ev, job){
    if(this.props.ApplyLaterJobs){
      this.props.channel.push("REMOVE_APPLY_LATER", {job: JSON.stringify(job), user_id: this.props.token.user_id})
      let action = {
        type: 'REMOVE_APPLY_LATER',
        data: job,
      };
      this.props.dispatch(action);
    }
  }
  render() {
    let ApplyButton = this.props.token? <RaisedButton label= "ApplyLater" onClick={(ev)=>{this.applyLater(ev, this.props.job)}}/> : <div></div>;
    let DApplyButton = this.props.token? <RaisedButton label= "Delete From ApplyLater" onClick={(ev)=>{this.dapplyLater(ev, this.props.job)}}/> : <div></div>;

        let companyName = null
        if(this.props.job.company instanceof Object) {
          companyName = this.props.job.company.name
        }
        else {
          companyName = this.props.job.company
        }
        return(
          <div className="container-fluid job-display">

        <Card className="individual-job">
          <CardHeader
            title={this.props.job.title+" - "+companyName}
            subtitle={this.props.job.location}
            actAsExpander={true}
            showExpandableButton={true}
            avatar={this.props.job.company_logo}
            >

          </CardHeader>
          <CardText expandable={true}>
            <CardActions>
              <Link id={this.props.job.id} to={"/description/"+this.props.job.id}>DESCRIPTION</Link>
              {ApplyButton}
              {DApplyButton}
            </CardActions>
            {/*{this.props.job.description.replace(/<\/?[^>]+(>|$)/g,"")}*/}
          </CardText>
        </Card>
      </div>)
    }
  }

  export default connect((state) => state)(Job);
