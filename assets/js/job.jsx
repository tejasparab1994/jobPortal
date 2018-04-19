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
  render() {
    let ApplyButton = this.props.token? <RaisedButton label= "ApplyLater" onClick={(ev)=>{this.applyLater(ev, this.props.job)}}/> : <div></div>;
    return(<div className="container-fluid">

    <Card>
      <CardHeader
        title={this.props.job.title}
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

        </CardActions>
      {/*{this.props.job.description.replace(/<\/?[^>]+(>|$)/g,"")}*/}
      </CardText>
    </Card>
  </div>)
}
}

export default connect((state) => state)(Job);
