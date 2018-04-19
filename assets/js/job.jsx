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
