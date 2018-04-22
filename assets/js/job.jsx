import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {FlatButton} from 'material-ui/FlatButton'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class Job extends React.Component {

  dapplied(ev, job){
    if(true){
      this.props.channel.push("REMOVE_APPLIED", {job: JSON.stringify(job), user_id: this.props.token.user_id, status: "Applied" })
      let action = {
        type: 'REMOVE_APPLIED',
        data: job,
      };
      this.props.dispatch(action);

    }
  }

  applyLater(ev, job){
    if(true){
      this.props.channel.push("ADD_APPLY_LATER", {job: JSON.stringify(job), user_id: this.props.token.user_id, status: "ApplyLater" })
      let action = {
        type: 'ADD_APPLY_LATER',
        data: job,
      };
      this.props.dispatch(action);
      alert("job added to your list")
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


    let appliedLaterArray = this.props.ApplyLaterJobs
    let appliedURLArray = [];
    for(let i=0; i < appliedLaterArray.length; i++) {
      appliedURLArray.push(appliedLaterArray[i].url)
    }
    let applyraised = appliedURLArray.includes(this.props.job.url)

    let RemoveFromAppliedButton = this.props.token && this.props.source==="AppliedTab" ? <RaisedButton label= "Remove" onClick={(ev)=>{this.dapplied(ev, this.props.job)}}/> : <div></div>;

    let ApplyButton = this.props.token && this.props.source==="HomeTab" ? <RaisedButton label= "Apply Later" disabled = {applyraised} onClick={(ev)=>{this.applyLater(ev, this.props.job)}}/> : <div></div>;
    let DApplyButton = this.props.token && applyraised == true ? <RaisedButton label= "Remove From Apply Later" onClick={(ev)=>{this.dapplyLater(ev, this.props.job)}}/> : <div></div>;
    let Applied = (this.props.token && this.props.source==="ApplyLaterTab" )? <RaisedButton className="ml-1" label= "Mark as Applied" onClick={(ev)=>{this.AddToApplied(ev, this.props.job)}}/> : <div></div>;
        let companyName = null
        if(this.props.job.company instanceof Object) {
          companyName = this.props.job.company.name
        }
        else {
          companyName = this.props.job.company
        }
        let default_image = "https://careerforum.net/assets/company-default-96f4ffcb9967f09089dae7656368a5ec5489cd028f5236192e21095006cc86e1.png"
        let description = this.props.job.description.replace(/<\/?[^>]+(>|$)/g,"")
        let newd = description.split(/\s+/).slice(0,30).join(" ")
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
              <div>
                {newd}
              <span className="description-padding">
              <Link to={"/description/"+this.props.source+"/"+this.props.job.id}>more description</Link>
              </span>
              <div className="description-height"></div>
              <div>
              {this.props.token && applyraised == true ? DApplyButton : ApplyButton}
              {Applied}
              {RemoveFromAppliedButton}
            </div>

          </div>
            </CardActions>
            {/*{this.props.job.description.replace(/<\/?[^>]+(>|$)/g,"")}*/}
          </CardText>
        </Card>
      </div>)
    }
  }

  export default connect((state) => state)(Job);
