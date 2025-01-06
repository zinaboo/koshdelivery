import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBwIWnqdqlEYe7VMIVM5jbn5NdHAClmYnY",
  authDomain: "shaap-80bef.firebaseapp.com",
  projectId: "shaap-80bef",
  storageBucket: "shaap-80bef.firebasestorage.app",
  messagingSenderId: "1020875335767",
  appId: "1:1020875335767:web:207b624dda662c77161b12",
  measurementId: "G-W822QNR6NH"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BBHQH35pSwNuaUax3zfZYtrwVUbmUYt4pf-Jj-frSkwAQyCVf7w8DDUt3xWlZzfawayZTPZVej_B5tnpPoUoLk0",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
