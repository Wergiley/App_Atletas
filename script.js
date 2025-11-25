// ===============================
// CLASSE ATLETA
// ===============================
class Atleta {
    constructor(nome, idade, peso, altura, notas) {
        this.nome = nome;
        this.idade = idade;
        this.peso = peso;
        this.altura = altura;
        this.notas = notas;
    }

    // Categoria pela idade
    calculaCategoria() {
        if (this.idade >= 9 && this.idade <= 11) return "Infantil";
        if (this.idade == 12 || this.idade == 13) return "Juvenil";
        if (this.idade == 14 || this.idade == 15) return "Intermediário";
        if (this.idade >= 16 && this.idade <= 30) return "Adulto";
        return "Sem Categoria";
    }

    // IMC
    calculaIMC() {
        return this.peso / (this.altura * this.altura);
    }

    // Média válida (descartando maior e menor)
    calculaMediaValida() {
        let ordenadas = [...this.notas].sort((a, b) => a - b);
        let meio = ordenadas.slice(1, 4);
        let soma = meio.reduce((acc, n) => acc + n, 0);
        return soma / meio.length;
    }

    // Getters
    obtemNomeAtleta() { return this.nome; }
    obtemIdadeAtleta() { return this.idade; }
    obtemPesoAtleta() { return this.peso; }
    obtemNotasAtleta() { return this.notas; }
    obtemCategoria() { return this.calculaCategoria(); }
    obtemIMC() { return this.calculaIMC(); }
    obtemMediaValida() { return this.calculaMediaValida(); }
}

// ===============================
// DADOS INICIAIS
// ===============================
let atletas = [
    new Atleta("Cesar Abascal", 30, 80, 1.70, [10, 10, 7.88, 8.42, 9.34]),
    new Atleta("Fernando Puntel", 28, 82, 1.78, [10, 10, 7, 8, 9.33]),
    new Atleta("Daiane Jelinsky", 22, 60, 1.65, [10, 7, 8, 9.5, 9.5]),
    new Atleta("Bruno Castro", 26, 85, 1.80, [10, 10, 10, 9, 9.5])
];

// ===============================
// ATUALIZA CARDS
// ===============================
function atualizarAtletas() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Atletas cadastrados:</h3>";

    atletas.forEach((atleta, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <p class="nome">Atleta: ${atleta.obtemNomeAtleta()}</p>
            <p>Idade: ${atleta.idade}</p>
            <p>Peso: ${atleta.peso} kg</p>
            <p>Altura: ${atleta.altura} m</p>
            <p>Notas: ${atleta.notas.join(", ")}</p>
            <p>Categoria: <strong>${atleta.obtemCategoria()}</strong></p>
            <p>IMC: <strong>${atleta.obtemIMC().toFixed(2)}</strong></p>
            <p>Média Válida: <strong>${atleta.obtemMediaValida().toFixed(2)}</strong></p>

            <button class="btn-excluir" onclick="excluirAtleta(${index})">Excluir</button>
        `;

        resultado.appendChild(card);

    });

    atualizarRanking();
}

// ===============================
// RANKING LATERAL
// ===============================
function atualizarRanking() {
    const rankingDiv = document.getElementById("ranking-list");
    rankingDiv.innerHTML = "";

    const ranking = [...atletas].sort(
        (a, b) => b.obtemMediaValida() - a.obtemMediaValida()
    );

    ranking.forEach((atleta, index) => {
        let prefixo = "";

        if (index === 0) prefixo = "🥇";
        else if (index === 1) prefixo = "🥈";
        else if (index === 2) prefixo = "🥉";
        else prefixo = `${index + 1}º`;

        const div = document.createElement("div");
        div.className = "card-ranking";
        div.innerHTML = `<div class="rk-nome">${prefixo} ${atleta.nome}</div>
        <div class="rk-media">Média: ${atleta.obtemMediaValida().toFixed(2)}</div>`;


        rankingDiv.appendChild(div);
    });
}

// ===============================
// ADICIONAR ATLETA
// ===============================
function adicionarAtleta() {
    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const notasInput = document.getElementById("notas").value;

    if (!nome || !idade || !peso || !altura || !notasInput) {
        alert("Preencha todos os campos!");
        return;
    }

    const notas = notasInput.split(",").map(n => parseFloat(n.trim()));

    if (notas.length !== 5) {
        alert("Digite exatamente 5 notas!");
        return;
    }

    const novoAtleta = new Atleta(nome, idade, peso, altura, notas);
    atletas.push(novoAtleta);

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("notas").value = "";

    atualizarAtletas();
}

// ===============================
// EXCLUIR ATLETA
// ===============================
function excluirAtleta(index) {
    atletas.splice(index, 1);
    atualizarAtletas();
}

// Inicializa
atualizarAtletas();
