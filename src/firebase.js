import { initializeApp } from "firebase/app";
// import * as mess from "firebase/messaging";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// var firebaseConfig = {

//     apiKey: "AIzaSyBAW9eosfF-oo5xPXXeoBp810YLyFlYZJw",
  
//     authDomain: "testing-uci-web-channel.firebaseapp.com",
  
//     projectId: "testing-uci-web-channel",
  
//     storageBucket: "testing-uci-web-channel.appspot.com",
  
//     messagingSenderId: "584834206650",
  
//     appId: "1:584834206650:web:b1a8a5a03dd231406e2b83",
  
//     measurementId: "G-WSYRRR972G"
  
//   };

var firebaseConfig = {
    apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: "testing-uci-web-channel",
    // projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID
};
  
export const getFirebaseToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BKuweez_2-hT2OYFRwUZ6CUuH3B3wrY0y1EOWlnbYtML0Iy7okQQZiiFZwzIYoin5TqdglT-18k-ki5cY_aUyjc'}).then((currentToken) => {
      if (currentToken) {
        // console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        // console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.error('An error occurred while retrieving token.', err);
      // catch error while creating client token
    });
  }

export const onMessageListener = () =>
new Promise((resolve) => {
  onMessage(messaging, (payload) => {
    resolve(payload);
  });
});
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
