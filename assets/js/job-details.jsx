import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class JobDetails extends React.Component {

  redirect(url) {
    return <Redirect push to={url} />
  }

render() {
  let job = this.props.jobs.filter((el) => {
    return(el.id === this.props.id)
  })
  console.log(job[0])
  return(<div className="container-fluid">
  <Card>
    <CardHeader
      title={job[0].title}
      subtitle={job[0].location}
      avatar={job[0].company_logo}
      >
    </CardHeader>
    <CardText>
    {job[0].description.replace(/<\/?[^>]+(>|$)/g,"")}
    <div className="organizer-padding"></div>
      <RaisedButton label="APPLY" primary={true} onClick={() => window.open(job[0].url, "_blank")} />
    </CardText>
  </Card>
  </div>)
}

}

export default connect((state) => state)(JobDetails);
