import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {FlatButton} from 'material-ui/FlatButton'
import {Link} from 'react-router-dom'

export default class Job extends React.Component {
  render() {
    let companyName = null
    if(this.props.job.company instanceof Object) {
      companyName = this.props.job.company.name
    }
    else {
      companyName = this.props.job.company
    }
    return(<div className="container-fluid job-display">

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
            <Link id={this.props.job.id} to={"/description/"+this.props.job.id}><a>DESCRIPTION</a></Link>
          </CardActions>
          {/*{this.props.job.description.replace(/<\/?[^>]+(>|$)/g,"")}*/}
        </CardText>
      </Card>
    </div>)
}
}
