/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAFOgerKFIQsMuLUaVEVBmz7ySvwdo4_BM",
  authDomain: "next-test-9e654.firebaseapp.com",
  databaseURL: "https://next-test-9e654.firebaseio.com",
  projectId: "next-test-9e654",
  storageBucket: "next-test-9e654.appspot.com",
  messagingSenderId: "90835141186",
  appId: "1:90835141186:web:b6ba43eac72268fee163db",
  measurementId: "G-KT374PLTY5"
});

firebase.messaging();
