

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAO3As6jMMmENtzaK9zlDADbpS9UlNxx8o",
  authDomain: "mac-projeto-4e552.firebaseapp.com",
  projectId: "mac-projeto-4e552",
  storageBucket: "mac-projeto-4e552.appspot.com",
  messagingSenderId: "537330451519",
  appId: "1:537330451519:web:5a1b4c921119b5ee98e48a",
  databaseURL: "https://mac-projeto-4e552-default-rtdb.firebaseio.com"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Auth, Firestore e Realtime Database
const auth = firebase.auth();
const db = firebase.firestore();
const realtimeDb = firebase.database();

// Configuração adicional (opcional)
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION) // Persistência de sessão
  .catch(error => console.error("Erro ao configurar persistência de autenticação:", error));

// Exemplo de verificação de autenticação (você pode usá-la em suas páginas protegidas)
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuário logado:", user.email);
  } else {
    console.log("Nenhum usuário logado.");
  }
});

// Exemplo de função para verificar o status da assinatura no Firestore
async function checkSubscriptionStatus(userId) {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return (
        userData.subscriptionActive &&
        userData.subscriptionEndDate.toDate() > new Date()
      );
    }
    return false;
  } catch (error) {
    console.error("Erro ao verificar status da assinatura:", error);
    return false;
  }
}

// Exemplo de função para salvar dados no Realtime Database
function saveUserDataRealtime(userId, data) {
  realtimeDb.ref(`users/${userId}`).set(data, error => {
    if (error) {
      console.error("Erro ao salvar dados no Realtime Database:", error);
    } else {
      console.log("Dados salvos com sucesso no Realtime Database.");
    }
  });
}

Explicação das configurações:

1. databaseURL:

Adicionado para integrar o Realtime Database ao seu projeto.



2. Observação de autenticação:

Exibe no console se o usuário está logado ou não, útil para debug.



3. Funções úteis:

checkSubscriptionStatus: verifica se a assinatura do usuário é válida no Firestore.

saveUserDataRealtime: exemplo para salvar informações no Realtime Database.




