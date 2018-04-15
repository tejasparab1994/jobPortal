import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

export default class Results extends React.Component {
  render() {
    return(<div className="container-fluid">
    Results
    <Card>
      <CardHeader
        title="Quilt"
        subtitle="Java Developer"
        actAsExpander={true}
        showExpandableButton={true}
        avatar="http://github-jobs.s3.amazonaws.com/55aa15ba-3381-11e8-8aa5-cd3357a09495.png"
        >
      </CardHeader>
      <CardText expandable={true}>
        Some descripttion of this job
      </CardText>
    </Card>
  </div>)
}
}
