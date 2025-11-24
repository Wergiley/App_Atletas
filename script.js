// =========================
// LISTA ESTÁTICA DE ATLETAS (SEUS DADOS)
// =========================

let atletas = [
    {
        nome: "Cesar Abascal",
        notas: [10, 10, 7.88, 8.42, 9.34]
    },
    {
        nome: "Fernando Puntel",
        notas: [10, 10, 7, 8, 9.33]
    },
    {
        nome: "Daiane Jelinsky",
        notas: [10, 7, 8, 9.5, 9.5]
    },
    {
        nome: "Bruno Castro",
        notas: [10, 10, 10, 9, 9.5]
    }
];


// =========================
// CÁLCULO DA MÉDIA VÁLIDA
// =========================
// Remove menor e maior nota e faz a média das 3 restantes.

function calcularMedia(notas) {
    let ordenadas = [...notas].sort((a, b) => a - b);
    let meio = ordenadas.slice(1, 4);

    let soma = meio.reduce((acc, n) => acc + n, 0);

    return soma / meio.length;
}


// =========================
// EXIBIR ATLETAS NA TELA
// =========================

function exibirAtletas() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Atletas cadastrados:</h3>";

    atletas.forEach(atleta => {
        let media = calcularMedia(atleta.notas);

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <p class="nome">Atleta: ${atleta.nome}</p>
            <p class="notas">Notas Obtidas: ${atleta.notas.join(", ")}</p>
            <p>Média Válida: ${media.toFixed(5)}</p>
        `;

        resultado.appendChild(card);
    });
}


// =========================
// ADICIONAR NOVO ATLETA
// =========================

function adicionarAtleta() {
    let nome = document.getElementById("nome").value;
    let notasInput = document.getElementById("notas").value;

    if (!nome || !notasInput) {
        alert("Preencha todos os campos!");
        return;
    }

    let notas = notasInput.split(",").map(n => parseFloat(n.trim()));

    if (notas.length !== 5 || notas.some(n => isNaN(n))) {
        alert("Digite exatamente 5 notas válidas!");
        return;
    }

    atletas.push({ nome, notas });

    exibirAtletas();

    document.getElementById("nome").value = "";
    document.getElementById("notas").value = "";
}


// Exibir lista inicial ao carregar
window.onload = exibirAtletas;
