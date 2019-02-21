import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Student extends Component {
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
render(){
    return(
        <div className="panel">
            <h2>USER PANEL</h2>
            <h3>Welcome {this.state.user}</h3><hr/>
                <Link to="/student/editdetail"><button className="btnpanel">Edit Detail</button></Link>
                <Link to="/student/areas"><button className="btnpanel">Book Parking</button></Link>
                <Link to="/student/feedback"><button className="btnpanel">Feedback</button></Link>
                <Link to="/student/mybooking"><button className="btnpanel">Booked Parking</button></Link><hr/>
        </div>
    )
}
}
export default Student;