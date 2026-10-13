//LISTA PARA GUARDAR TAREFAS
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


//PEGA OS ELEMENTOS DA PAGINA
const botaoAdicionar = document.querySelector(".click-adicionar")
const inputDigitar = document.querySelector(".input-adicionar")
const lista = document.querySelector(".lista-container")

//SALVAR O ARRAY ATUAL DA PÀGINA
function salvar(){
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
};

//CRIAR UM LI NA TELA A PARTIR DO OBJETO TAREFA
function criarTarefaNaTela(tarefa, index) {
  const novaTarefa = document.createElement("li");
    novaTarefa.classList.add("tarefa");
    if (tarefa.concluida) novaTarefa.classList.add("concluida");
  
   const texto = document.createElement("span");
   texto.classList.add("texto-tarefa");
   texto.textContent = tarefa.texto
   novaTarefa.appendChild(texto)  

   const acoes = document.createElement("div");
   acoes.classList.add("acoes");

   //BOTAO CONCLUIR
   const botaoConcluir = document.createElement("button");
   botaoConcluir.classList.add("botao-concluir");
   botaoConcluir.textContent = "✔";
   botaoConcluir.addEventListener("click", () =>{
    novaTarefa.classList.toggle("concluida");
    
    tarefa.concluida = novaTarefa.classList.contains("concluida");

    salvar();
   });
   acoes.appendChild(botaoConcluir)

   //BOTAO EXCLUIR
   const botaoExcluir = document.createElement("button");
   botaoExcluir.classList.add("botao-excluir");
   botaoExcluir.textContent = "X";
   botaoExcluir.addEventListener("click", ()=> {
    tarefas.splice(index, 1);
    salvar();
    renderizarTudo();
   })
   acoes.appendChild(botaoExcluir);

   novaTarefa.appendChild(acoes)
   lista.appendChild(novaTarefa)
}

//LIMPA E REDESENHAR TODAS AS TAREFAS NA TELA
function renderizarTudo(){
  lista.innerHTML = "";
  tarefas.forEach((tarefa, index) => criarTarefaNaTela(tarefa, index));
}

// QUANDO CLICAR NO BOTAO ADICIONAR
botaoAdicionar.addEventListener("click", () => {
  if (inputDigitar.value.trim() === "") return;

  tarefas.push ({ texto: inputDigitar.value, concluida: false})
  salvar();
  renderizarTudo();

  inputDigitar.value = "";
})

//CARREGA AS TAREFAS SALVAS AO ABRIR A PAGINA
renderizarTudo();
