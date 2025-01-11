

// Verificar se o Firebase está carregado corretamente
if (typeof firebase !== 'undefined') {
  // Inicializar Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAO3As6jMMmENtzaK9zlDADbpS9UlNxx8o",
    authDomain: "mac-projeto-4e552.firebaseapp.com",
    projectId: "mac-projeto-4e552",
    storageBucket: "mac-projeto-4e552.appspot.com",
    messagingSenderId: "537330451519",
    appId: "1:537330451519:web:5a1b4c921119b5ee98e48a",
  };

  firebase.initializeApp(firebaseConfig);

  // Inicializar auth e firestore
  const auth = firebase.auth();
  const db = firebase.firestore();

  console.log("Firebase carregado e inicializado!");
} else {
  console.error("Firebase não foi carregado corretamente.");
}

