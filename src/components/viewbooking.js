import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ViewBooking extends Component {
    constructor(props){
        super(props);
        this.state = {
            booked : [],
            uid : [],
        }
    }
    componentDidMount(){
            if(firebase.auth().currentUser){
                firebase.database().ref("places").on("value", snap=>{

                    let obj = snap.val();
                    let bookedObj = {};
                    let uidObj = {};
                    for(let key in obj){
                            bookedObj[key] = obj[key];
                            uidObj[key] = key;
                    }
            
                    let booked = [];
                    let uid = [];
                    for(let a in bookedObj){
                        booked.push(bookedObj[a])
                    }
                    for(let i in uidObj){
                        uid.push(uidObj[i])
                    }
                    this.setState({
                        booked : booked,
                        uid : uid,
                    });
                })
            }
        }
    removeTask(index){
            const uid = this.state.uid.slice(0);
            const uidKey = uid[index];
                firebase.database().ref("places").child(uidKey).remove().then(alert("Removed"))
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
            <div className="all">
            <h3>All Booked</h3>          
            <hr /><br />    
            {
                this.state.booked && this.state.booked.length ?
                this.state.booked.map((data, index) => {
                    return <div className="list">
                        <ul className="abc">
                            <div>
                            <li> {<span><strong>Area : </strong></span>}      {data.place}</li>
                            <li> {<span><strong>Start Time : </strong></span>}      {new Date(data.stime).toString().slice(16, 21)}</li>
                            <li> {<span><strong>End Time : </strong></span>}      {new Date(data.etime).toString().slice(16, 21)}</li>
                            <li> {<span><strong>Date : </strong></span>}      {new Date(data.stime).toString().slice(0, 15)}</li>
                            <li> {<span><strong>Booked By : </strong></span>}      {data.email}</li>
                            </div>
                            
                            <li><button className="pbtn" onClick={this.removeTask.bind(this, index)}>Delete</button></li>
                            {/* <li><button className="pbtn" onClick={this.click.bind(this, index)}>{this.state.button[index]}</button></li> */}
                        </ul>
                    </div>
                })
                :false
            }                                    
        </div>
        );
    }
}

export default ViewBooking;