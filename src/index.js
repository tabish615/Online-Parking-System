import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


  var config = {
    apiKey: "AIzaSyArKO4ZA8VHKB2gZZm7SBRt0lPUaLopRB0",
    authDomain: "online-parking-system-8fcb3.firebaseapp.com",
    databaseURL: "https://online-parking-system-8fcb3.firebaseio.com",
    projectId: "online-parking-system-8fcb3",
    storageBucket: "online-parking-system-8fcb3.appspot.com",
    messagingSenderId: "378618658791"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
