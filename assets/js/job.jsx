import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {FlatButton} from 'material-ui/FlatButton'
import {Link} from 'react-router-dom'

export default class Job extends React.Component {
  render() {
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
        <Link id={this.props.job.id} to={"/description/"+this.props.job.id}><a>DESCRIPTION</a></Link>
        </CardActions>
      {/*{this.props.job.description.replace(/<\/?[^>]+(>|$)/g,"")}*/}
      </CardText>
    </Card>
  </div>)
}
}
