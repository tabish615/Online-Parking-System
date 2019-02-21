import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';

class Signup extends Component {
      constructor(){
    super();
    this.state = {
      userType : "student"
    }
  }
    componentDidMount(){
    document.getElementById('lgbtn').className="hide"
  }
  submission(event){
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.pass.value).then((data) =>
    {
      firebase.auth().currentUser.updateProfile({displayName:this.refs.name.value,})

      firebase.database().ref().child("users/"+firebase.auth().currentUser.uid).set({
        email : this.refs.email.value,
        password : this.refs.pass.value,
        name : this.refs.name.value,
        type : this.state.userType,
        education : null,
        GPA : null,
        skills : null,
        overview : null,
      })
    })
    }
  render() {
    return (
        <form>
          <fieldset className="Input">
            <h1><strong>Signup</strong></h1>
            
            <input className="check" type="text" placeholder="Full Name" required="required" size="50" ref="name" /><br /><br /><br />
            
            <input className="check" type="text" placeholder="Email" required="required" size="50" ref="email"/><br /><br /><br />
            
            <input className="check" type="Password" placeholder="Password" required="required" size="50" ref="pass"/><br /><br /><br />
            
            <input className="sbtn"type="submit" value="Signup" onClick={this.submission.bind(this)} />
          </fieldset>
        </form>
    )
  }
}
export default Signup;