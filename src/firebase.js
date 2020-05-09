import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: ".",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
// export const firsbase = firebase.initializeApp(firebaseConfig);
var firebaseconfig = firebase.initializeApp(firebaseConfig);
export var database =  firebaseconfig.database();
