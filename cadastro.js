const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmacaoSenha = document.getElementById("confirmacao-senha").value.trim();

  if (!nome || !email || !senha || !confirmacaoSenha) {
    console.error("Todos os campos devem ser preenchidos!");
    return;
  }

  if (senha !== confirmacaoSenha) {
    console.error("As senhas não coincidem!");
    return;
  }

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
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
    window.location.href = "login.html";
  } catch (error) {
    console.error("Erro ao realizar o cadastro:", error.message);
    alert("Erro ao realizar o cadastro: " + error.message);
  }
});

