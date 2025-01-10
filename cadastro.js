const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmacaoSenha = document.getElementById("confirmacao-senha").value;

  if (senha === confirmacaoSenha) {
    // Criar usuário no Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        // Salvar dados adicionais no Firestore
        db.collection("users").doc(user.uid).set({
          nome: nome,
          email: email,
          status: "pendente",
          subscriptionActive: false,
          subscriptionEndDate: null
        })
        .then(() => {
          console.log("Dados do usuário salvos no Firestore!");
        })
        .catch((error) => {
          console.error("Erro ao salvar no Firestore:", error);
        });
      })
      .catch((error) => {
        console.error("Erro ao criar usuário:", error);
      });
  } else {
    console.log("As senhas não coincidem!");
  }
});
