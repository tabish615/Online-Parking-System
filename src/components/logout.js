import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';

class Logout extends Component { 
    
  render() {
    return (
        <div>
       <Link to="/"> <button id='lgbtn' className="btn" >Logout</button></Link>
        </div>
    );
  }
}
export default Logout;