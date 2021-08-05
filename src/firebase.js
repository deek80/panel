import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {makeFirebaseHooks} from "@deek80/firebase-hooks";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  appId: process.env.REACT_APP_appId,
  authDomain: process.env.REACT_APP_authDomain,
  measurementId: process.env.REACT_APP_measurementId,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
});

const {useAuth, useData} = makeFirebaseHooks(firebase);

const signIn = () => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

const signOut = () => {
  firebase.auth().signOut();
};

const switchUser = () => {
  firebase.auth().signInWithPopup(
    new firebase.auth.GoogleAuthProvider().setCustomParameters({
      prompt: "select_account",
    })
  );
};

export {useAuth, useData, signIn, signOut, switchUser};
