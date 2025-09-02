// Dados de exemplo dos posts
let jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];


window.onload = function(){
    salvarPlayers();
};

function handleClick(infosDoEvento){
    const action = infosDoEvento.target.dataset.action;
    const index = infosDoEvento.target.dataset.index;

    if(action === "Editar"){
        editarPost(index);
    } else if(action === "Apagar"){
        apagarPost(index);
    }
}

// Adicionar nova jogadora

 function addPlayer(infosDoEvento){
    infosDoEvento.preventDefault();

    const jNome = document.querySelector("#name").value;
    const jPosicao = document.querySelector("#posicao").value;
    const jClube = document.querySelector("#clube").value;
    const jFoto = document.querySelector("#foto").value;
    const jGols = document.querySelector("#gols").value;
    const jAssistencias = document.querySelector("#assistencias").value;
    const jJogos = document.querySelector("#jogos").value;
    const jFavorita = document.querySelector("#favorita").value;

    const novaPlayer = {
        nome: jNome,
        posicao: jPosicao,
        clube: jClube,
        foto: jFoto,
        gols: jGols,
        assistencias: jAssistencias,
        jogos: jJogos,
        favorita: jFavorita,
    }

    jogadoras.unshift(novaPlayer)


    document.querySelector("#postForm").reset();
    salvarPlayers();
    mostrarPlayer();
 }

//Mostrar jogadoras

function mostrarPlayer(){
    //Pegando o elemento onde os Tweets serão inseridos
    const listaPosts = document.querySelector("#postList");
    listaPosts.innerHTML = ""
    //Passando pelo array criando um tweet para cada post
    posts.forEach((pegaItem, index) => {
        const cardPost = document.createElement("div")
        cardPost.classList.add("card")

        cardPost.innerHTML = `
            <h4>${pegaItem.text}</h4>
            <img src="${pegaItem.image}"/>
            <h5>Categoria: ${pegaItem.category}</h5>
            <h6>Data e hora:${pegaItem.date}}</h6>
            <button data-action="Editar" data-index="${index}"<i class="fa-solid fa-pen-to-square"></i> Editar</button>
            <button data-action="Apagar" data-index="${index}"><i class="fa-solid fa-eraser"></i> Apagar</button>
        `
        //Adicionando no HTML
        listaPosts.append(cardPost);
    })
}

//Edidar informações das jogadoras

function editarPlayer(index){
    const novoTexto = prompt('Edite o conteúdo do post', posts[index].text);
    posts[index].text = novoTexto;

    salvarPosts();
    mostrarPost();
}

//Deletar jogadoras

function apagarPlayer(index){
    const confirmar = confirm("Você deseja realmente excluir?");

    if(confirmar){
        posts.splice(index, 1);
    }
    
    salvarPosts();
    mostrarPost()
}

// Local e Section Storage

function salvarPlayers(){
    localStorage.setItem("players", JSON.stringify(jogadoras));
}

function carregarPlayers(){
    const postsGuardados = localStorage.getItem("posts")

    if(postsGuardados){
        posts = JSON.parse(postsGuardados);
    }
}