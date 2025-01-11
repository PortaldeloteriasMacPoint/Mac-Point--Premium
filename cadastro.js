

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

      // Salvar dados no Firestore
      await db.collection("users").doc(user.uid).set({
        nome: nome,
        email: email,
        status: "pendente",
        subscriptionActive: false,
        subscriptionEndDate: null,
      });

      alert("Cadastro realizado com sucesso!");
      formCadastro.reset();
      window.location.href = "login.html"; // Redireciona para a página de login
    } catch (error) {
      alert("Erro ao realizar cadastro: " + error.message);
    }
  } else {
    alert("As senhas não coincidem!");
  }
});

