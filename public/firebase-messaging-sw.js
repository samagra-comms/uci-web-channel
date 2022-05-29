importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');


var firebaseConfig = {

    apiKey: "AIzaSyBAW9eosfF-oo5xPXXeoBp810YLyFlYZJw",
  
    authDomain: "testing-uci-web-channel.firebaseapp.com",
  
    projectId: "testing-uci-web-channel",
  
    storageBucket: "testing-uci-web-channel.appspot.com",
  
    messagingSenderId: "584834206650",
  
    appId: "1:584834206650:web:b1a8a5a03dd231406e2b83",
  
    measurementId: "G-WSYRRR972G"
  
  };

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });