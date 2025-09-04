let jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://newr7-r7-prod.web.arc-cdn.net/resizer/v2/CI5QJEC7UJDKNN2CXTMJMJZ7XM.jpg?auth=7bab316c28efe1caea985265e0a3ccc21bb5527cc6ec330463faf9ef60f8faa3&width=1080&height=845",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Mb6vQkmAVgyVc80mMGJOn_kL2hpymDe78Q&s",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://cdn.meutimao.com.br/_upload/noticia/2022/01/07/mariza-e-o-segundo-reforco-anunciado-pelo-gy.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLPAclBKf1ob8y-cewxiz98gqtk96hC8LwHw&s",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQucQtjWf0WEzvJ1rGDS9uUHyiLJOlxVFMmNA&s",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];

window.onload = function(){
    if(!localStorage.getItem("players")){
        salvarPlayers();
    } else {
        carregarPlayers();
    }

    mostrarPlayer();
    document.querySelector("#postJogadora").addEventListener("submit", addPlayer);
};



// Create nova jogadora

function addPlayer(event){
    event.preventDefault();

    const jNome = document.querySelector("#name").value.trim();
    const jPosicao = document.querySelector("#posicao").value.trim();
    const jClube = document.querySelector("#clube").value.trim();
    const jFoto = document.querySelector("#foto").value.trim();
    const jGols = parseInt(document.querySelector("#gols").value);
    const jAssistencias = parseInt(document.querySelector("#assistencias").value);
    const jJogos = parseInt(document.querySelector("#jogos").value);
    const jFavorita = document.querySelector("#favorita").value === "true";

    if(!jNome || !jPosicao || !jClube || !jFoto){
        alert("Preencha todos os campos!");
        return;
    }

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

    jogadoras.unshift(novaPlayer);

    document.querySelector("#postJogadora").reset();
    salvarPlayers();
    mostrarPlayer();
    alert("Jogadora adicionada com sucesso!");
}

// Mostrar jogadoras

function mostrarPlayer(){
    const listaJogadoras = document.querySelector("#postList");
    listaJogadoras.innerHTML = "";

    jogadoras.forEach((j, index) => {
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("carousel-item");
        if(index === 0) cardWrapper.classList.add("active");

        cardWrapper.innerHTML = `
          <div class="d-flex justify-content-center">
            <div class="fifa-card">
              <img src="${j.foto}" alt="${j.nome}" style="max-width:200px; height:200px; object-fit:cover;">
              <div class="card-body my-3">
                <h5 class="text-center">${j.nome}</h5>
                <p class="text-center destaque">${j.posicao} - ${j.clube}</p>
                <p class="text-center estatisticas"><i class="fa-solid fa-futbol"></i> ${j.gols} | <i class="fa-solid fa-handshake"></i> ${j.assistencias} | <i class="fa-solid fa-calendar"></i> ${j.jogos}</p>
                <div class="d-flex justify-content-center gap-3">
                  <span class="fav-icon ${j.favorita ? "favorita" : ""}" onclick="toggleFavorita(${index})"><i class="fa-solid fa-heart"></i></span>
                  <button class="btn btn-warning btn-sm" onclick="editarPlayer(${index})"><i class="fa-solid fa-pen-to-square"></i>Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="apagarPlayer(${index})"><i class="fa-solid fa-trash"></i>Apagar</button>
                </div>
              </div>  
            </div>
          </div>
        `;
        listaJogadoras.appendChild(cardWrapper);
    });
}

// Editar jogadora

// Editar jogadora
function editarPlayer(index){
    const j = jogadoras[index];
    const novoNome = prompt("Novo nome:", j.nome);
    if(novoNome) j.nome = novoNome;
    const novaPosicao = prompt("Nova posição:", j.posicao);
    if(novaPosicao) j.posicao = novaPosicao;
    const novoClube = prompt("Novo clube:", j.clube);
    if(novoClube) j.clube = novoClube;
    const novaFoto = prompt("Nova URL da foto:", j.foto);
    if(novaFoto) j.foto = novaFoto;
    const novosGols = prompt("Novo número de gols:", j.gols);
    if(novosGols !== null && !isNaN(novosGols)) j.gols = parseInt(novosGols);
    const novasAssistencias = prompt("Novo número de assistências:", j.assistencias);
    if(novasAssistencias !== null && !isNaN(novasAssistencias)) j.assistencias = parseInt(novasAssistencias);
    const novosJogos = prompt("Novo número de jogos:", j.jogos);
    if(novosJogos !== null && !isNaN(novosJogos)) j.jogos = parseInt(novosJogos);
    const favorita = confirm("Marcar como favorita? (OK = favorita, Cancelar = não favorita)");
    j.favorita = favorita;

    salvarPlayers();
    mostrarPlayer();
    alert("Jogadora editada com sucesso!");
}


// Deletar jogadora

function apagarPlayer(index){
    const confirmar = confirm("Você deseja realmente excluir?");
    if(confirmar){
        jogadoras.splice(index, 1);
        salvarPlayers();
        mostrarPlayer();
        alert("Jogadora removida com sucesso!");
    }
}

// Favoritar jogadora

function toggleFavorita(index){
    jogadoras[index].favorita = !jogadoras[index].favorita;
    salvarPlayers();
    mostrarPlayer();
}

// Local Storage

function salvarPlayers(){
    localStorage.setItem("players", JSON.stringify(jogadoras));
}

function carregarPlayers(){
    const jogadorasGuardadas = localStorage.getItem("players");
    if(jogadorasGuardadas){
        jogadoras = JSON.parse(jogadorasGuardadas);
    }
}
