import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {FlatButton} from 'material-ui/FlatButton'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class Job extends React.Component {
  applyLater(ev, job){
    if(true){
      this.props.channel.push("ADD_APPLY_LATER", {job: JSON.stringify(job), user_id: this.props.token.user_id, status: "ApplyLater" })
      let action = {
        type: 'ADD_APPLY_LATER',
        data: job,
      };
      this.props.dispatch(action);
    }
  }
  AddToApplied(ev, job){
    if(this.props.ApplyLaterJobs){
      this.props.channel.push("MOVE_TO_APPLIED", {job: JSON.stringify(job), user_id: this.props.token.user_id, status: "Applied" })
      let action = {
        type: 'MOVE_TO_APPLIED',
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
    let Applied = (this.props.token && this.props.source==="ApplyLaterTab" )? <RaisedButton label= "Mark as Applied" onClick={(ev)=>{this.AddToApplied(ev, this.props.job)}}/> : <div></div>;

        let companyName = null
        if(this.props.job.company instanceof Object) {
          companyName = this.props.job.company.name
        }
        else {
          companyName = this.props.job.company
        }
        let default_image = "https://careerforum.net/assets/company-default-96f4ffcb9967f09089dae7656368a5ec5489cd028f5236192e21095006cc86e1.png"

        return(
          <div className="container-fluid job-display">

            <Card className="individual-job">
              <CardHeader
                title={this.props.job.title+" - "+companyName}
                subtitle={this.props.job.location}
                actAsExpander={true}
                showExpandableButton={true}
                avatar={this.props.job.company_logo? this.props.job.company_logo: default_image}
              >

              </CardHeader>

          <CardText expandable={true}>
            <CardActions>
              <Link to={"/description/"+this.props.source+"/"+this.props.job.id}>DESCRIPTION</Link>
              {ApplyButton}
              {DApplyButton}
              {Applied}
            </CardActions>
            {/*{this.props.job.description.replace(/<\/?[^>]+(>|$)/g,"")}*/}
          </CardText>
        </Card>
      </div>)
    }
  }

  export default connect((state) => state)(Job);
