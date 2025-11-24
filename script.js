// Dados iniciais
let atletas = [
    { nome: "Cesar Abascal", notas: [10,10,7.88,8.42,9.34] },
    { nome: "Fernando Puntel", notas: [10,10,7,8,9.33] },
    { nome: "Daiane Jelinsky", notas: [10,7,8,9.5,9.5] },
    { nome: "Bruno Castro", notas: [10,10,10,9,9.5] }
];

// Calcula média removendo maior e menor nota
function calcularMedia(notas) {
    let ordenadas = [...notas].sort((a,b) => a-b);
    let meio = ordenadas.slice(1,4);
    let soma = meio.reduce((acc, n) => acc + n, 0);
    return soma / meio.length;
}

// Atualiza a lista de atletas na tela
function atualizarAtletas() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Atletas cadastrados:</h3>";

    atletas.forEach((atleta, index) => {
        const media = calcularMedia(atleta.notas);
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p class="nome">Atleta: ${atleta.nome}</p>
            <p class="notas">Notas Obtidas: ${atleta.notas.join(", ")}</p>
            <p>Média Válida: ${media.toFixed(2)}</p>
            <button class="btn-excluir" onclick="excluirAtleta(${index})">Excluir</button>
        `;
        resultado.appendChild(card);
    });

    atualizarRanking();
}
// Ranking lateral atualizado
function atualizarRanking() {
    const rankingDiv = document.getElementById("ranking-list");
    rankingDiv.innerHTML = "";

    // Ordena por média
    const ranking = [...atletas].sort((a,b) => calcularMedia(b.notas) - calcularMedia(a.notas));

    ranking.forEach((atleta, index) => {
        const media = calcularMedia(atleta.notas);
        let prefixo = "";

        if(index === 0) prefixo = "🥇";
        else if(index === 1) prefixo = "🥈";
        else if(index === 2) prefixo = "🥉";
        else prefixo = `${index + 1}º.`; // do 4° lugar em diante

        const div = document.createElement("div");
        div.className = "card-ranking";
        div.innerHTML = `${prefixo} ${atleta.nome} - ${media.toFixed(2)}`;
        rankingDiv.appendChild(div);
    });
}


// Adicionar atleta
function adicionarAtleta() {
    const nome = document.getElementById("nome").value;
    const notasInput = document.getElementById("notas").value;

    if(!nome || !notasInput) {
        alert("Preencha todos os campos!");
        return;
    }

    const notas = notasInput.split(",").map(n => parseFloat(n.trim()));
    if(notas.length !== 5) {
        alert("Digite exatamente 5 notas!");
        return;
    }

    atletas.push({ nome, notas });

    document.getElementById("nome").value = "";
    document.getElementById("notas").value = "";

    atualizarAtletas();
}

// Excluir atleta
function excluirAtleta(index) {
    atletas.splice(index,1);
    atualizarAtletas();
}

// Inicializa lista
atualizarAtletas();
