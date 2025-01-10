// main.js
import { auth } from "./config-firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Função para redirecionar para a página de cadastro se não estiver autenticado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redireciona para a página de cadastro se o usuário não estiver autenticado
    window.location.href = "cadastro.html";  // Ajuste para o caminho do seu cadastro
  } else {
    // Usuário autenticado, pode acessar o conteúdo da página
    console.log("Usuário autenticado:", user);
  }
});

