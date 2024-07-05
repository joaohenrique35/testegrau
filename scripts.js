// Inicializa as vagas para cada modalidade
let vagas = JSON.parse(localStorage.getItem('vagas')) || {
    'vagas1': 10,
    'vagas2': 10,
    'vagas3': 10
};

// Armazena os dados dos agendamentos
let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

// Atualiza os elementos HTML com os valores de vagas
function atualizarVagas() {
    for (let modalidade in vagas) {
        document.getElementById(modalidade).innerText = vagas[modalidade];

        // Desabilita o botão se não houver vagas
        if (vagas[modalidade] === 0) {
            const buttons = document.querySelectorAll(`button[onclick="mostrarFormulario('${modalidade}')"]`);
            buttons.forEach(button => button.disabled = true);
        }
    }
}

// Função para mostrar o formulário de agendamento
function mostrarFormulario(modalidade) {
    document.getElementById('modalidadeSelecionada').value = modalidade;
    document.getElementById('formulario-agendamento').style.display = 'block';
}

// Função para agendar
function agendar(modalidade, nome, celular, observacoes) {
    if (vagas[modalidade] > 0) {
        vagas[modalidade]--;
        document.getElementById(modalidade).innerText = vagas[modalidade];

        // Armazena os dados do agendamento
        const agendamento = { modalidade, nome, celular, observacoes };
        agendamentos.push(agendamento);

        // Atualiza localStorage
        localStorage.setItem('vagas', JSON.stringify(vagas));
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        // Atualiza a lista de agendamentos
        atualizarListaAgendamentos();

        alert(`Agendamento confirmado para ${nome} na modalidade ${modalidade}.`);
    }
}

// Função para atualizar a lista de agendamentos
function atualizarListaAgendamentos() {
    const lista = document.getElementById('lista-agendamentos');
    lista.innerHTML = '';

    agendamentos.forEach(agendamento => {
        const item = document.createElement('li');
        item.textContent = `Modalidade: ${agendamento.modalidade}, Nome: ${agendamento.nome}, Celular: ${agendamento.celular}, Observações: ${agendamento.observacoes}`;
        lista.appendChild(item);
    });
}

// Função para lidar com o envio do formulário
document.getElementById('agendamentoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const modalidade = document.getElementById('modalidadeSelecionada').value;
    const nome = document.getElementById('nome').value;
    const celular = document.getElementById('celular').value;
    const observacoes = document.getElementById('observacoes').value;

    agendar(modalidade, nome, celular, observacoes);

    // Oculta o formulário após o agendamento
    document.getElementById('formulario-agendamento').style.display = 'none';

    // Limpa o formulário
    document.getElementById('agendamentoForm').reset();
});

// Atualiza a interface com os dados armazenados
window.onload = function() {
    atualizarVagas();
    atualizarListaAgendamentos();
};
