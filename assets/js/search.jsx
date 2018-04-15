import React from 'react';
import ReactDOM from 'react-dom';
import {InputGroup, Button, Input} from 'reactstrap'

export default class Search extends React.Component {
  render() {
    return(<div className="container-fluid">
    <div className="search-padding">
      <InputGroup className="search-input">
        <Input className="searchbox" placeholder="Job"/>
        <Input className="searchbox" placeholder="Location" />
        <Button>Search</Button>
      </InputGroup>
    </div>
    </div>)
  }
}
