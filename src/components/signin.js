import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';

class Signin extends Component {
    componentDidMount(){
    document.getElementById('lgbtn').className="hide"
  }
    submission(event){
    event.preventDefault();

  firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.pass.value)
  .then((data) => {

      const user = firebase.auth().currentUser;
      firebase.database().ref().child('users/' + user.uid).on('value', snap => 
      {
        if(snap.exists() === false){
          firebase.auth().currentUser.delete().then(alert("You may have been deleted by Admin"))
          this.props.history.push('/signup');
        }
        else {
        const typeCheck = snap.val()
        const xyz = typeCheck.type

      if(xyz === 'student'){
      this.props.history.push('/student');
                document.getElementById('lgbtn').className="show"
      }
      else{
      this.props.history.push('/admin');
                document.getElementById('lgbtn').className="show"
      }
      }
    })
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(
      errorMessage
    );
  })
}
  render() {
    return (
      <form>
          <fieldset className="Input">
            
            <h1><strong>Signin</strong></h1>
            
            <input className="check"type="email" placeholder="Email" required="required" size="50" ref="email" /><br /><br />
            
            <input className="check" type="Password" placeholder="Password" required="required" size="50" ref="pass" /><br /><br /><br />

            <input className="sbtn"type="submit" value="Signin" onClick={this.submission.bind(this)} />

           </fieldset>
      </form>
    )
  }
}
export default Signin;