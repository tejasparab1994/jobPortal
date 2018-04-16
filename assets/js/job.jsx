import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

export default class Job extends React.Component {
  render() {
    console.log(this.props.job);
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
      {this.props.job.description}
      </CardText>
    </Card>
  </div>)
}
}
