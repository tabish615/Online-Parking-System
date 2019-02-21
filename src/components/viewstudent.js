import React, { Component } from 'react';
import * as firebase from 'firebase';

class AllStudents extends Component {
    constructor(){
        super();
        this.state = {
            students : [],
            all : [],
            uid : [],
            type : true,
            button: [],
            view : [],
            name : [],
        }
    }
    componentDidMount(){
            if(firebase.auth().currentUser){
                firebase.database().ref("users").on("value", snap=>{
                    let obj = snap.val();
                    let studentsObj = {};
                    let uidObj = {};
                    for(let key in obj){
                        if(obj[key].type.toLowerCase() === "student"){
                            studentsObj[key] = obj[key];
                            uidObj[key] = key;
                        }
                    }
                    let students = [];
                    let uid = [];
                    let button = [];
                    let view = [];
                    let name = [];
                    for(let a in studentsObj){
                        students.push(studentsObj[a])
                    }
                    for(let i in uidObj){
                        uid.push(uidObj[i])
                        name.push(true);
                        button.push("View");
                        view.push(false);
                    }
                    this.setState({
                        students : students,
                        uid : uid,
                        name : name,
                        view : view,
                        button : button,
                    })
                })
            }
    }
    click(index){
        if(this.state.button[index] === "Hide"){
            const button = this.state.button.slice(0);
            button.splice(index, 1, "View");
            const view = this.state.view.slice(0);
            view.splice(index, 1, false);
            const name = this.state.name.slice(0);
            name.splice(index, 1, true);
            this.setState({
                view: view,
                button: button,
                name: name,
    })
 }
        else if(this.state.button[index] === "View"){
            const button = this.state.button.slice(0);
            button.splice(index, 1, "Hide");
            const view = this.state.view.slice(0);
            view.splice(index, 1, true);
            const name = this.state.name.slice(0);
            name.splice(index, 1, false);
            this.setState({
                view: view,
                button: button,
                name: name,
    })
}
}
render(){
    return(
        <div className="all">
            <h3>All Students</h3>          
            <hr /><br />
            {
                this.state.students && this.state.students.length ?
                this.state.students.map((data, index) => {
                    return <div className="list">
                            <ul className="abc">
                                {this.state.name[index] && <li><span><strong>Name : </strong></span>{data.name}</li>}
                                {this.state.view[index] &&
                                <div>
                                <li> <span><strong>Name : </strong></span> {data.name}</li>
                                <li> <span><strong>Email : </strong></span> {data.email}</li>
                                <li> <span><strong>Education : </strong></span> {data.education}</li>
                                <li> <span><strong>GPA : </strong></span> {data.gpa}</li>
                                <li> <span><strong>Skills : </strong></span> {data.skills}</li>
                                <li> <span><strong>Overview : </strong></span> {data.overview}</li>
                                </div>
                                }
                                <li><button className="pbtn" onClick={this.click.bind(this, index)}>{this.state.button[index]}</button></li>
                            </ul>
                    </div>
                })
                :false
            }                                 
        </div>
    )
}
}
export default AllStudents;