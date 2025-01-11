

const auth = firebase.auth();
const db = firebase.firestore();

const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmacaoSenha = document.getElementById("confirmacao-senha").value;

  if (senha === confirmacaoSenha) {
    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
      const user = userCredential.user;

      // Salvar dados adicionais no Firestore
      await db.collection("users").doc(user.uid).set({
        nome: nome,
        email: email,
        status: "pendente",
        subscriptionActive: false,
        subscriptionEndDate: null,
      });

      console.log("Cadastro realizado com sucesso!");
      
      // Limpar os campos do formulário
      formCadastro.reset();

      // Redirecionar para login.html
      window.location.href = "login.html";
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
    }
  } else {
    alert("As senhas não coincidem!");
  }
});

