import "firebase/messaging";
import firebase from "firebase/app";

import localforage from "localforage";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function() {
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

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false;
      }

      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();

      localforage.setItem("fcm_token", token);
      console.log("fcm_token", token);
    } catch (error) {
      console.error(error);
    }
  }
};

export { firebaseCloudMessaging };
