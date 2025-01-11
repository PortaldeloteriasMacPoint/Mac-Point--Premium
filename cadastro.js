const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmacaoSenha = document.getElementById("confirmacao-senha").value;

  if (senha === confirmacaoSenha) {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
      const user = userCredential.user;

      await firebase.firestore().collection("users").doc(user.uid).set({
        nome: nome,
        email: email,
        status: "pendente",
        subscriptionActive: false,
        subscriptionEndDate: null
      });

      console.log("Cadastro realizado com sucesso e dados salvos no Firestore!");
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
    }
  } else {
    console.log("As senhas não coincidem!");
  }
});

