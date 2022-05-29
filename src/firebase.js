import { initializeApp } from "firebase/app";
import * as mess from "firebase/messaging";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {

    apiKey: "AIzaSyBAW9eosfF-oo5xPXXeoBp810YLyFlYZJw",
  
    authDomain: "testing-uci-web-channel.firebaseapp.com",
  
    projectId: "testing-uci-web-channel",
  
    storageBucket: "testing-uci-web-channel.appspot.com",
  
    messagingSenderId: "584834206650",
  
    appId: "1:584834206650:web:b1a8a5a03dd231406e2b83",
  
    measurementId: "G-WSYRRR972G"
  
  };

  
export const getToken = (setTokenFound) => {
    return mess.getToken(messaging, {vapidKey: 'BKuweez_2-hT2OYFRwUZ6CUuH3B3wrY0y1EOWlnbYtML0Iy7okQQZiiFZwzIYoin5TqdglT-18k-ki5cY_aUyjc'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. Blah Blah Blah ', err);
      // catch error while creating client token
    });
  }

  export const onMessageListener = () =>
  new Promise((resolve) => {
    mess.onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = mess.getMessaging(firebaseApp);
