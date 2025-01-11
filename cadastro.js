const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmacaoSenha = document.getElementById("confirmacao-senha").value;

  if (senha === confirmacaoSenha) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
      const user = userCredential.user;

      await db.collection("users").doc(user.uid).set({
        nome: nome,
        email: email,
        status: "pendente",
        subscriptionActive: false,
        subscriptionEndDate: null
      });

      console.log("Cadastro realizado com sucesso!");
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error.message);
      alert("Erro ao realizar cadastro: " + error.message);
    }
  } else {
    alert("As senhas não coincidem!");
  }
});
