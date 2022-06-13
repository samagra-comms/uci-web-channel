import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
    apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_PUBLIC_FIREBASE_MEASUREMENT_ID
};
  
export const getFirebaseToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: process.env.REACT_APP_PUBLIC_FIREBASE_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        //console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.error('An error occurred while retrieving token in getFirebaseToken Function:', err);
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
