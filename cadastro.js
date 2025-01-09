

document.getElementById("cadastro-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      const db = firebase.firestore();
      db.collection("users").doc(user.uid).set({
        nome: nome,
        email: email,
        status: "inativo",
        subscriptionActive: false,
        subscriptionEndDate: null
      })
      .then(() => {
        alert("Cadastro realizado com sucesso. Acesse o site após o pagamento.");
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Erro ao salvar dados no Firestore: ", error);
      });
    })
    .catch((error) => {
      console.error("Erro ao criar usuário: ", error.message);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    });
});


