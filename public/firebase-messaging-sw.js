importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyC...",
    authDomain: "krushi-kalpa.firebaseapp.com",
    projectId: "krushi-kalpa",
    messagingSenderId: "1035924995818",
    appId: "1:1035924995818:web:d2a2f25a305da869f0e193",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
    });
});
