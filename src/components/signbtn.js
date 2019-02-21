import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Signbtn extends Component {
  render() {
    return (
        <div>
          <Link to="/signup"><button className="btn"> Sign Up</button></Link>
          <Link to="/"><button className="btn"> Sign In</button></Link>
        </div>
    );
  }
}
export default Signbtn;