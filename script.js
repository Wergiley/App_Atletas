// Código para o Projeto 1 com interface HTML e CSS
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

await addDoc(collection(db, "atletas"), {
    nome,
    notas,
    media,
    criadoEm: Date.now()
});

function calcularMedia(notas) {
    let ordenadas = notas.sort((a, b) => a - b);
    let meio = ordenadas.slice(1, 4);

    let soma = 0;
    meio.forEach(n => soma += n);

    return soma / meio.length;
}

function adicionarAtleta() {
    let nome = document.getElementById("nome").value;
    let notasInput = document.getElementById("notas").value;

    if (!nome || !notasInput) {
        alert("Preencha todos os campos!");
        return;
    }

    let notas = notasInput.split(", ").map(n => parseFloat(n.trim()));

    if (notas.length !== 5) {
        alert("Digite exatamente 5 notas!");
        return;
    }

    let media = calcularMedia(notas);

    let resultado = document.getElementById("resultado");

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <p class="nome">Atleta: ${nome}</p>
        <p class="notas">Notas Obtidas: ${notas.join(", ")}</p>
        <p>Média Válida: ${media.toFixed(5)}</p>
    `;

    resultado.appendChild(card);

    document.getElementById("nome").value = "";
    document.getElementById("notas").value = "";
}



// Código do Projeto 1
/*
function calcularNotas(atletas) {

  for (let i = 0; i < atletas.length; i++) {
    let nome = atletas[i].nome;
    let notas = atletas[i].notas;

    // Ordena as notas
    notas = notas.sort((a, b) => a - b);

    // Elimina a menor (posição 0) e a maior (posição 4)
    let notasComputadas = notas.slice(1, 4);

    // Soma das notas computadas
    let soma = 0;
    notasComputadas.forEach(function(nota) {
      soma += nota;
    });

    // Média
    let media = soma / notasComputadas.length;

    // Exibição do Dados
    console.log(`Atleta: ${nome}`);
    console.log(`Notas Obtidas: ${notas.join(",")}`);
    console.log(`Média Válida: ${media}`);
    console.log(); // linha em branco
  }
}

// Entrada de Dados
let atletas = [
 {
   nome: "Cesar Abascal",
   notas: [10, 9.34, 8.42, 10, 7.88]
 },
 {
   nome: "Fernando Puntel",
   notas:  [8, 10, 10, 7, 9.33]
 },
 {
   nome: "Daiane Jelinsky",
   notas: [7, 10, 9.5, 9.5, 8]
 },
 {
   nome: "Bruno Castro",
   notas: [10, 10, 10, 9, 9.5]
 }
];

// Executa
calcularNotas(atletas);
*/
