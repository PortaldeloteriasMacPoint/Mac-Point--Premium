// Configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAO3As6jMMmENtzaK9zlDADbpS9UlNxx8o",
  authDomain: "mac-projeto-4e552.firebaseapp.com",
  projectId: "mac-projeto-4e552",
  storageBucket: "mac-projeto-4e552.appspot.com",
  messagingSenderId: "537330451519",
  appId: "1:537330451519:web:5a1b4c921119b5ee98e48a",
  measurementId: "G-XXXXXXXXXX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

