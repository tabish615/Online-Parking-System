import React, { Component } from 'react';
import * as firebase from 'firebase';

class EditDetail extends Component {
    constructor(){
    super();
    }
    componentDidMount(){
        const user = firebase.auth().currentUser;
        firebase.database().ref().child('users/' + user.uid)
        .on('value', snap => 
        {
            const value = snap.val();
            const name = value.name;
            const CNIC = value.CNIC;
            const VehicleName = value.VehicleName;
            const VehicleNumber = value.VehicleNumber;

            if(name !== undefined || null){
                this.refs.name.value = name;
             }
            if(CNIC !== undefined || null){
                this.refs.CNIC.value = CNIC;
            }
            if(VehicleName !== undefined || null){
                this.refs.VehicleName.value = VehicleName;
            }
            if(VehicleNumber !== undefined || null){
                this.refs.VehicleNumber.value = VehicleNumber;
            }
        })
    }
    detail(event){
        event.preventDefault();
        firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).update({
        name : this.refs.name.value,
        CNIC : this.refs.CNIC.value,
        VehicleName : this.refs.VehicleName.value,
        VehicleNumber : this.refs.VehicleNumber.value,
        })
    }
render(){
    return(
        <div>
            <form>
                <fieldset className="editfield">

                    <h1><strong>Edit Detail</strong></h1><hr/><br/>
                    
                    <input className="check" type="text" placeholder="Full Name" required="required" size="50" ref="name" /><br /><br /><br />

                    <input className="check" type="text" placeholder="CNIC No." required="required" size="50" ref="CNIC" /><br /><br /><br />

                    <input className="check" type="text" placeholder="Vehicle Name " required="required" size="50" ref="VehicleName" /><br /><br /><br />

                    <input className="check" type="text" placeholder="Vehicle No." required="required" size="50" ref="VehicleNumber" /><br /><br /><br />
                    
                    <input className="updatebtn" type="submit" value="Update" onClick={this.detail.bind(this)} />
                </fieldset>
            </form>                               
        </div>
    )
}
}
export default EditDetail;