import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class Scorer extends React.Component {
  onReset(ev){
    this.props.dispatch({type: 'RESET_SCORER'});
  }
  onChange(ev) {
    let tgt = $(ev.target);
    let value = ev.target.value;
    console.log(value);
    let data = {};
    data[tgt.attr('name')] = value;

    let action = {
      type: 'UPDATE_SCORER_DESCRIPTION',
      data: data,
    };
    this.props.dispatch(action);
  }

  onSubmit(ev){
    let payload = {description: this.props.scorer.description, user_id: this.props.state.token.user_id}
    this.props.channel.push("GET_SCORE_FROM_DESCRIPTION", payload)
    .receive("ok", resp => this.onReceive(resp.score, resp.skillsRequired, resp.skillsPresent))
  }
  onReceive(score, skillsRequired, skillsPresent){
    let action = {
      type: 'UPDATE_SCORER_SCORE',
      data: {
        "score": score,
        "skillsRequired": skillsRequired,
        "skillsPresent": skillsPresent
      },
    };
    this.props.dispatch(action)
  }

  result(){
    let comps = <div></div>
    let skillsPresent = _.map(this.props.scorer.skillsPresent, (job) => <ListItem primaryText={job} />);
    let skillsRequired = _.map(this.props.scorer.skillsRequired, (job) => <ListItem primaryText={job} />);

    if (this.props.scorer.score.length != 0){
      comps =<div>
        <h5 className="display2">Your score is {this.props.scorer.score}</h5>
        <div className="organizer-padding"></div>
        <div className="skills-compare container">
        <div className="left">
        <Card><CardTitle><h4>Skills You Have</h4></CardTitle><List> {skillsPresent} </List></Card>
        </div>
        <div className="right">
        <Card> <CardTitle><h4 className="">Skills Required</h4></CardTitle><List> {skillsRequired} </List></Card>
        </div>
      </div>
    </div>
    }

    return comps
  }
  render() {
    console.log("Scorer", this.props);
    return(<div className="container">
    <div className="scorer">
      <p>Paste the text of the job description in the box below. Click on MATCH! and find out how closely your resume matches to this job description</p>
    </div>
    <div className="scorer">
      <TextField
        floatingLabelText="Enter job description"
        multiLine={true}
        rowsMax={10}
        fullWidth={true}
        name="description"
        onChange={(ev)=>this.onChange(ev)}
        />
      <RaisedButton onClick= {(ev)=>this.onSubmit(ev)} label="Match!" primary={true}/>&nbsp;
        <RaisedButton onClick= {(ev)=>this.onReset(ev)} label="Reset" primary={true}/>
      </div>
      <div className="scorer">


        {this.result()}
      </div>
    </div>)
  }
}

function state2props(state) {

  return { scorer: state.scorer, state: state};
}

export default connect(state2props)(Scorer);
