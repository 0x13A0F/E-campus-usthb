import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCUjL8HT3WJt5xWoPra7_aJYKYPxBKWB94",
  authDomain: "cryptographie-1d631.firebaseapp.com",
  databaseURL: "https://cryptographie-1d631.firebaseio.com",
  projectId: "cryptographie-1d631",
  storageBucket: "cryptographie-1d631.appspot.com",
  messagingSenderId: "749308929916",
  appId: "1:749308929916:web:fb6431856e33d8941ba6f9",
  measurementId: "G-CB0R7S84B4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const database = firebase.database();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const citiesRef = firestore.collection("users");
