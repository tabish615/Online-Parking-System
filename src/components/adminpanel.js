import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';


class AdminPanel extends Component {
  constructor(){
    super();
    this.state = {
      user : null
    }
  }
  componentDidMount(){
    if(firebase.auth().currentUser !== null){
      const user = firebase.auth().currentUser;
      firebase.database().ref().child('users/' + user.uid).on('value', snap => {
        this.setState({user:snap.val().name})
      })
    }
    else{
        this.props.history.push('/')
        // window.history.back();
    }
  }
  render() {
    return (
        <div className="panel">
          <h2>ADMIN PANEL</h2>
          <h3>Welcome {this.state.user}</h3><hr/>
          <Link to="/admin/viewstudent"><button className="btnpanel">All Student</button></Link>
          <Link to="/admin/viewbooking"><button className="btnpanel">All Booking</button></Link>
          <Link to="/admin/viewfeedback"><button className="btnpanel">All Feedback</button></Link><hr/>
        </div>  
    )
  }
}
export default AdminPanel;