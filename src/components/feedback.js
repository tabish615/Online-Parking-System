import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Feedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedback : [],
            reply : [],
            uid : [],
            fb : true,
        }
    }
    componentDidMount(){
            if(firebase.auth().currentUser){
                firebase.database().ref("feedbacks").on("value", snap=>{

                    let obj = snap.val();
                    let feedbackObj = {};
                    let reply = [];
                    let uid = [];
                    for(let key in obj){
                        if(obj[key].postedby === firebase.auth().currentUser.email){
                            feedbackObj[key] = obj[key];
                            uid.push(key);
                            reply.push(false);
                        }
                    }
            
                    let feedback = [];
                    for(let a in feedbackObj){
                        feedback.push(feedbackObj[a])
                    }
                    
                    this.setState({
                        feedback : feedback,
                        reply : reply,
                        uid : uid,
                    });
                })
            }
        }
    submit(event){
        if(this.state.feedback.length !== null){
        event.preventDefault();
        firebase.database().ref().child("feedbacks/").push({
        Comments : this.refs.comment.value,
        postedby : firebase.auth().currentUser.email,
        }).then(alert("Thank You for giving Feedback"))
            .then(this.props.history.push("/student/booking"))
        }
    }
    fb(){
        this.setState({
            fb : false,
        })
    }
    fb2(){
        this.setState({
            fb : true,
        })
    }
    render(){
        return ( this.state.fb ?
            <div className="fb">
            <form>
                <h3>Write FeedBack</h3>
                <textarea placeholder="Enter your message......" ref="comment" cols="60" rows="4" required="required"></textarea><br /><br/>
                <input className = "slotbtn" type="submit" value="Submit" onClick={this.submit.bind(this)} />
            <button className = "slotbtn" onClick={this.fb.bind(this)}>My Feedbacks</button>
            </form>
            </div>
            :
            <div className="all">
            <h3 id="myfb">My Feedback</h3>  
            <button className= "gbbtn" onClick={this.fb2.bind(this)}>Go Back</button>        
            <hr /><br />    
            {
                this.state.feedback && this.state.feedback.length ?
                this.state.feedback.map((data, index) => {
                    return <div className="list">
                        <ul className="abc">
                            <div>
                            <li> {<span><strong>Comment : </strong></span>}      {data.Comments}</li>
                            <li> {<span><strong>Posted by : </strong></span>}      {data.postedby}</li>
                            <li><b>Admin Replied:</b> {data.reply ? data.reply 
                                : <i>Admin didn't reply</i>}</li>
                            </div>
                        </ul>
                    </div>
                })
                :false
            }                                    
        </div>
        );
    }
}

export default Feedback;