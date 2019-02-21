import React, { Component } from 'react';
import './App.css';
import Signup from './components/signup.js';
import Signin from './components/signin.js';
import Signbtn from './components/signbtn.js';
import AdminPanel from './components/adminpanel.js';
import Student from './components/student.js';
import Areas from './components/areas.js';
import Feedback from './components/feedback.js';
import EditDetail from './components/editdetail.js';
import MyBooking from './components/mybooking.js';
import ViewBooking from './components/viewbooking.js';
import AllStudents from './components/viewstudent.js';
import AllFeedback from './components/viewfeedback.js';
import Logout from './components/logout.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Online Parking System</h2>
          <Route path="/signup" component={Signbtn} />
          <Route exact path="/" component={Signbtn} />
          <Logout />
        </div>
          <Route exact path="/" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/admin/viewbooking" component={ViewBooking} />
          <Route path="/admin/viewstudent" component={AllStudents} />
          <Route path="/admin/viewfeedback" component={AllFeedback} />
          <Route path="/student" component={Student} />
          <Route path="/student/editdetail" component={EditDetail} /> 
          <Route path="/student/areas" component={Areas} />
          <Route path="/student/feedback" component={Feedback} />
          <Route path="/student/mybooking" component={MyBooking} />
      </div>
      </Router>
    );
  }
}

export default App;
