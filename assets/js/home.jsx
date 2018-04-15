import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import Search from './search'
import Results from './results'

export default function home_init(root) {
  ReactDOM.render(<Jobs />, root);
}

class Jobs extends React.Component {

  render() {
    return(
      <div>
        <Navbar />
        <Search />
        <Results />
      </div>
    )
  }

}
