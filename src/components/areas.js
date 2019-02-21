import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Areas extends Component {
    constructor(){
        super();
        this.state={
            placekey : true,
            booked : [],
            place : null,
            submit : false,
            bool : [],
            stime : null,
            etime : null,
            date : [],
            time : [],
            endtime : [],
        }
    }
    submit(form){
        form.preventDefault();
            this.setState({
                date : this.refs.date.value.split('-'),
                time : this.refs.time.value.split(':'),
                endtime : this.refs.etime.value.split(':'),
            })
        if(this.state.place !== null){
            firebase.database().ref().child("places/").on("value", snap => {
                const obj = snap.val();
                const booked = [];
                for(let key in obj){
                    booked.push(obj[key]);
                }
                this.setState({
                    booked : booked
                });
                const date = this.state.date.slice(0);
                const time = this.state.time.slice(0);
                const etime = this.state.endtime.slice(0);

                var year = date[0];
                var month = date[1];
                var day = date[2];

                var hours = time[0];
                var minutes = time[1];

                var ehours = etime[0];
                var eminutes = etime[1];

                let sDate = Number(new Date(year,month-1,day,hours,minutes).getTime());
                let eDate = Number(new Date(year,month-1,day,ehours,eminutes).getTime());
                let cDate = Number(new Date().getTime().toString());

                if(date && time && etime){
                    if(cDate < sDate){
                        if(sDate < eDate){
                            this.setState({
                                stime : sDate,
                                etime : eDate,
                            })
                            this.setState({
                                submit : true,
                            })
                            let start = sDate;
                            let end = eDate;
                            let arr = this.state.bool.slice(0);
                            let booked = this.state.booked.slice(0);
                            for(let i in booked){
                                if(booked[i].place === this.state.place){
                                    if((booked[i].stime <= start && start <= booked[i].etime)
                                    || (booked[i].stime <= end && end <= booked[i].etime)
                                    || (start <= booked[i].stime && booked[i].etime <= end)){
                                        arr[booked[i].slotIndex] = false;
                                    }
                                }
                            this.setState({
                                bool : arr,
                            })    
                            }
                        }
                        else{
                            alert("Please select correct time");
                        }
                    }
                    else{
                        alert("Please select future date or time");
                    }
                }
            })
        }
    }
    slot(e){
        var ctime = new Date().toString();
        var a = e;
            firebase.database().ref().child("places/").push({
                email : firebase.auth().currentUser.email,
                name : firebase.auth().currentUser.displayName,
                ctime : ctime,
                place : this.state.place,
                userId : firebase.auth().currentUser.uid,
                stime : this.state.stime,
                etime : this.state.etime,
                slotIndex : a,
            })//.then(this.props.history.push("/student/feedback"))
            var bool = this.state.bool.slice(0);
            bool.splice(e, 1, false);
            this.setState({
                bool : bool,
            })
    }
    sel(e){
        var arr = [];
        for(var i = 0; i < 18; i++){
            arr.push(true)
        }
        this.setState({
            bool : arr,
        })
        e.preventDefault();
        let place = e.target.innerHTML;
        this.setState({
            place : place,
            placekey : false,
        })
    }
    hide(){
        var arr = [];
        for(var i = 0; i < 18; i++){
            arr.push(true)
        }
        this.setState({
            submit : false,
            bool : arr,
        })
    }
  render() {
    return ( this.state.placekey ?
        <div className="all">
            <h3>All Areas</h3>          
            <hr /><br />    
            <div>
                <table>
                    <tr className="tr"> 
                        <td className="xyz" ref="1" onClick={this.sel.bind(this)}>SADDAR</td>
                        <td></td>
                        <td className="xyz" ref="1" onClick={this.sel.bind(this)}>Shahrah-e-Faisal</td>
                        <td></td>
                        <td className="xyz" ref="1" onClick={this.sel.bind(this)}>DHA</td>
                        <td></td>
                        <td className="xyz" ref="1" onClick={this.sel.bind(this)}>Gulshan-e-Iqbal</td>
                        <td></td>
                        <td className="xyz" ref="1" onClick={this.sel.bind(this)}>SITE Area</td>
                        <td></td>
                        <td className="xyz" ref="1" onClick={this.sel.bind(this)}>Korangi</td>
                    </tr>
                </table>
            </div>
        </div>
        :
        <div className="all">
            <h3> Booking for {this.state.place} </h3>
            <hr /><br />
            <div>
                <form className="booking">
                    <label> Select Date <input type="date" ref="date" onClick={this.hide.bind(this)} /></label><br /><br/>
                    <label> Start Time  <input type="time" ref="time" onClick={this.hide.bind(this)} /></label>
                    <label> End Time  <input type="time" ref="etime" onClick={this.hide.bind(this)} /></label><br/><br/>
                    <label>
                        <button className="slotbtn" type="submit" onClick={this.submit.bind(this)}>Select Slot</button>
                    </label><br/><br/>
                </form>
                {this.state.submit &&
                <div className="slot">
                    {this.state.bool.map((bol, j) => (
                        bol ?
                            <button className = "slots" onClick={this.slot.bind(this, j)}>Slot {j+1} </button>
                        :
                            <button className="slotclicked"> Slot {j+1} </button>
                    ))}
                </div>
                }
            </div>
        </div>
    );
  }
}
export default Areas;