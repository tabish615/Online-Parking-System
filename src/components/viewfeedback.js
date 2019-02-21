import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class AllFeedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedback : [],
            reply : [],
            uid : [],
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
                            feedbackObj[key] = obj[key];
                            uid.push(key);
                            reply.push(false);
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
        submit(index){
            const reply = this.state.reply.slice(0);
            reply[index] = false;
            firebase.database().ref("feedbacks/").child(this.state.uid[index]).update({
                reply: this.refs.reply.innerHTML,
            }).then(alert("Message has been sent.")).then(
                this.setState({
                    reply: reply,
                })    
            ).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // // ...
              })
        }
        reply(index){
                const reply = this.state.reply.slice(0);
                reply[index] = true;
                this.setState({
                    reply: reply,
                })
        }
        cancel(index){
            const reply = this.state.reply.slice(0);
            reply[index] = false;
            this.setState({
                reply: reply,
            })    
        }
    render(){
        return (
            <div className="all">
            <h3>All Feedback</h3>          
            <hr /><br />    
            {
                this.state.feedback && this.state.feedback.length ?
                this.state.feedback.map((data, index) => {
                    return <div className="list">
                        <ul className="abc">
                            <div>
                            <li> {<span><strong>Comment : </strong></span>}      {data.Comments}</li>
                            <li> {<span><strong>Posted by : </strong></span>}      {data.postedby}</li>
                            <li><b>Your Replied:</b> {data.reply ? data.reply 
                                : <i>You didn't reply</i>}</li>
                                {this.state.reply[index] ?
                                    <form>
                                        <br/>
                                        <textarea rows="2" cols="55" ref="reply">Thanks for Feedback</textarea><br/>
                                        <button className = "pbtn" onClick={this.cancel.bind(this, index)}>Cancel</button>
                                        <button  className = "pbtn" type="submit" onClick={this.submit.bind(this, index)}>Send</button>
                                        {/* <button className = "pbtn" onClick={this.cancel.bind(this, index)}>Cancel</button> */}
                                    </form>
                                    :
                                <li>
                                    <button className="pbtn" onClick={this.reply.bind(this, index)}>Reply</button>  
                                </li>}
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

export default AllFeedback;