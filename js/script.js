const form = document.getElementById("formCadastro");
const tabela = document.getElementById("tabelaRegistros").querySelector("tbody");
const contador = document.getElementById("contador");

let registros = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    const nacionalidade = document.getElementById("nacionalidade").value;
    const sexo = document.getElementById("sexo").value;    

    let tempoAposentar = 0;
    if (sexo === "Feminino") {
        tempoAposentar = 60 - idade;
    } else {
        tempoAposentar = 65 - idade;
    }
    tempoAposentar = tempoAposentar + " anos";

    const registro = { nome, idade, nacionalidade, sexo, tempoAposentar };
    registros.push(registro);

    atualizarTabela();
    form.reset();
});

function atualizarTabela() {
    tabela.innerHTML = "";
    registros.forEach((registro, index) => {
        const row = tabela.insertRow();

        row.insertCell(0).textContent = registro.nome;
        row.insertCell(1).textContent = registro.idade;
        row.insertCell(2).textContent = registro.nacionalidade;
        row.insertCell(3).textContent = registro.sexo;
        row.insertCell(4).textContent = registro.tempoAposentar;

        const cellAcoes = row.insertCell(5);
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "acao-btn";
        btnEditar.onclick = () => editarRegistro(index);

        cellAcoes.appendChild(btnEditar);
    });

    contador.textContent = `Total de registros: ${registros.length}`;
}

function editarRegistro(index) {
    const registro = registros[index];

    document.getElementById("nome").value = registro.nome;
    document.getElementById("idade").value = registro.idade;
    document.getElementById("nacionalidade").value = registro.nacionalidade;
    document.getElementById("sexo").value = registro.sexo;

    registros.splice(index, 1);
    atualizarTabela();
}
