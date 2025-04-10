import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type MessagePayload,
  getMessaging,
  getToken,
  onMessage,
  isSupported as isFcmSupported,
} from "firebase/messaging";
import {
  initializeAnalytics as initializeFirebaseAnalytics,
  isSupported as isFaSupported,
} from "firebase/analytics";

export default defineNuxtPlugin(() => {
  class FirebaseManager {
    protected app: FirebaseApp;
    protected fcmToken: string | undefined = undefined;
    protected messagingDeviceTokenIsSaved = false;
    protected VAPID_KEY =
      "BFr78asASqjvUE0eIC7AkhEgwLAC6LLAYNiTzyDMmxoOGHTTBjrNlkdhYob0jqz0k6DSt9LxBOYVWxL2Ygl5RyA";
    protected FIREBASE_CONFIG = {
      apiKey: "AIzaSyDno7bA1eogyYLQewZZUZgnmiKIk1HSXVU",
      authDomain: "bulldropnet.firebaseapp.com",
      projectId: "bulldropnet",
      storageBucket: "bulldropnet.appspot.com",
      messagingSenderId: "1027887240307",
      appId: "1:1027887240307:web:88e503637d7c44d25c0606",
      measurementId: "G-6DQPHDR1LV",
    };

    constructor() {
      this.app = initializeApp(this.FIREBASE_CONFIG);
    }

    protected async requestNotificationPermission(
      this: FirebaseManager,
      uid: number,
    ) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        this.saveMessagingDeviceToken(uid);
      }
    }

    protected handleMessage(payload: MessagePayload) {
      if (
        !payload.notification ||
        !payload.notification.title ||
        !payload.notification.body
      ) {
        throw new Error("An incorrect notification was received");
      }
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || "",
        image: payload.notification.image || "",
      };
      new Notification(notificationTitle, notificationOptions);
    }

    async saveMessagingDeviceToken(this: FirebaseManager, uid: number) {
      const fcmIsSupported = await isFcmSupported();
      if (!fcmIsSupported) {
        throw new Error("FCM is not supported on this platform");
      }
      const messaging = getMessaging(this.app);
      this.fcmToken = await getToken(messaging, {
        vapidKey: this.VAPID_KEY,
      });
      if (this.fcmToken) {
        try {
          const api = useApi();
          await api.push.createToken({
            deviceCreateRequest: {
              fcmToken: this.fcmToken,
            },
          });
          this.messagingDeviceTokenIsSaved = true;
          onMessage(messaging, this.handleMessage);
        } catch (error) {
          /* empty */
        }
      } else {
        this.requestNotificationPermission(uid);
      }
    }

    async initializeAnalytics() {
      const faIsSupported = await isFaSupported();
      if (!faIsSupported) {
        throw new Error("Firebase analytics is not supported on this platform");
      }
      initializeFirebaseAnalytics(this.app);
    }

    isMessagingDeviceTokenSaved() {
      return this.messagingDeviceTokenIsSaved;
    }
  }

  return {
    provide: {
      firebaseManager: new FirebaseManager(),
    },
  };
});
