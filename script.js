import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAO3As6jMMmENtzaK9zlDADbpS9UlNxx8o",
  authDomain: "mac-projeto-4e552.firebaseapp.com",
  projectId: "mac-projeto-4e552",
  storageBucket: "mac-projeto-4e552.appspot.com",
  messagingSenderId: "537330451519",
  appId: "1:537330451519:web:5a1b4c921119b5ee98e48a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// UID do administrador (substitua pelo seu UID)
const ADMIN_UID = "admin_uid";

// Função para exibir o conteúdo protegido
function exibirConteudo() {
  document.getElementById("conteudo-protegido").style.display = "block";
}

// Função para exibir mensagens de erro
function exibirMensagem(msg) {
  const mensagemElem = document.getElementById("mensagem");
  mensagemElem.innerText = msg;
  mensagemElem.style.display = "block";
}

// Verificar estado de autenticação
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Verificar se é administrador ou se o status é "ativo"
      if (user.uid === ADMIN_UID || userData.status === "ativo") {
        exibirConteudo(); // Mostra o conteúdo protegido
      } else {
        exibirMensagem("Acesso negado: seu status está bloqueado.");
        window.location.href = "/acesso-negado.html"; // Redireciona para página de acesso negado
      }
    } else {
      exibirMensagem("Usuário não encontrado no banco de dados.");
      window.location.href = "/login.html"; // Redireciona para login
    }
  } else {
    exibirMensagem("Você não está autenticado.");
    window.location.href = "/login.html"; // Redireciona para login
  }
});
