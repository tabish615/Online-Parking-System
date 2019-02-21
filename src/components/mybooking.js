import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class MyBooking extends Component {
    constructor(){
        super();
        this.state = {
            booked : [],
            uid : []
        }
    
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('places').orderByChild('email').equalTo(firebase.auth().currentUser.email)
                .once('value').then((snap) => {
                    var obj = snap.val();
                    let uid = [];
                    let booked = [];
                    for (let key in obj) {
                        uid.push(key);
                        booked.push(obj[key]);
                    }
                    this.setState({ booked, uid })
                })

            }
        })
    }
    removeTask(index){
            const uid = this.state.uid.slice(0);
            const uidKey = uid[index];
                firebase.database().ref("job").child(uidKey).remove().then(alert("Removed"))
                .catch(function(error){alert(error)})
            uid.splice(index, 1);
            const booked = this.state.booked.slice(0);
            booked.splice(index, 1);
            this.setState({
                booked: booked,
                uid : uid,
            });
        }
    render(){
        return (
            <div className= "all">    
            <h3>My Booked Areas</h3><hr /><br />
                    {this.state.booked.map((book, index) => ( 
                    <div className="list">
                        <ul className="abc">
                        <li key={index}>
                            <li>{<span><strong>Area: </strong></span>}   {book.place} </li>
                            <li>{<span><strong>Start Time: </strong></span>}  {new Date(book.stime).toString().slice(16, 21)}   </li>
                            <li>{<span><strong>End Time: </strong></span>} {new Date(book.etime).toString().slice(16, 21)} </li>
                            <li> {<span><strong>Date : </strong></span>}      {new Date(book.stime).toString().slice(0, 15)}</li>
                            <li><button className="pbtn"onClick={this.removeTask.bind(this, index)}>Delete</button></li>
                        </li>
                        </ul>
                        </div>
        
                    ))}                          
        </div>
        )
    }
}

export default MyBooking;