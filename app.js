// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAO3As6jMMmENtzaK9zlDADbpS9UlNxx8o",
    authDomain: "mac-projeto-4e552.firebaseapp.com",
    projectId: "mac-projeto-4e552",
    storageBucket: "mac-projeto-4e552.appspot.com",
    messagingSenderId: "537330451519",
    appId: "1:537330451519:web:5a1b4c921119b5ee98e48a"
};

// Inicializando o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Função para verificar a autenticação e o status do usuário
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Se o usuário estiver autenticado, verifica o status no Firestore
        db.collection('usuarios').doc(user.uid).get().then(doc => {
            if (doc.exists) {
                // Se o status do usuário for "ativo", libera o conteúdo
                if (doc.data().status === 'ativo') {
                    document.getElementById('conteudo').style.display = 'block';
                } else {
                    // Se o status for "inativo", redireciona para o login
                    alert('Sua conta está inativa. Você será redirecionado para o login.');
                    window.location.href = 'login.html';
                }
            } else {
                // Caso o documento do usuário não exista no Firestore
                alert('Usuário não encontrado no Firestore. Redirecionando para o login.');
                window.location.href = 'login.html';
            }
        }).catch(error => {
            // Erro ao buscar o status do usuário no Firestore
            console.error("Erro ao buscar o status do usuário:", error);
            alert('Erro ao verificar o status. Você será redirecionado.');
            window.location.href = 'login.html';
        });
    } else {
        // Se o usuário não estiver autenticado, redireciona para o login
        alert('Você não está autenticado. Redirecionando para o login.');
        window.location.href = 'login.html';
    }
});



