
let participantes = [
  {
    nome: "Rique Santos",
    email: "riquesantos@example.com",
    dataInscricao: new Date(2024, 3, 2, 23, 21),
    dataCheckIn: new Date(2024, 2, 5, 11, 55),
  },
  {
    nome: "Maria Silva",
    email: "mariasilva@example.com",
    dataInscricao: new Date(2024, 6, 3, 10, 15),
    dataCheckIn: new Date(2024, 2, 6, 9, 30),
  },
  {
    nome: "João Oliveira",
    email: "joao.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 6, 14, 45),
    dataCheckIn: null,
  },
  {
    nome: "Ana Rodrigues",
    email: "anarodrigues@example.com",
    dataInscricao: new Date(2024, 2, 5, 18, 30),
    dataCheckIn: null,
  },
  {
    nome: "Pedro Costa",
    email: "pedro.costa@example.com",
    dataInscricao: new Date(2024, 2, 6, 8, 20),
    dataCheckIn: new Date(2024, 2, 9, 10, 0),
  },
  {
    nome: "Carla Almeida",
    email: "carla.almeida@example.com",
    dataInscricao: new Date(2024, 2, 7, 12, 10),
    dataCheckIn: null,
  },
  {
    nome: "Rafaela Fernandes",
    email: "rafaela.fernandes@example.com",
    dataInscricao: new Date(2024, 2, 8, 16, 40),
    dataCheckIn: new Date(2024, 2, 11, 11, 45),
  },
  {
    nome: "Lucas Santos",
    email: "lucas.santos@example.com",
    dataInscricao: new Date(2024, 2, 9, 9, 0),
    dataCheckIn: new Date(2024, 2, 12, 14, 30),
  },
  {
    nome: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    dataInscricao: new Date(2024, 2, 10, 15, 20),
    dataCheckIn: null,
  },
  {
    nome: "Gustavo Sousa",
    email: "gustavo.sousa@example.com",
    dataInscricao: new Date(2024, 2, 11, 11, 30),
    dataCheckIn: new Date(2024, 2, 14, 16, 0),
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button 
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>${participante.nome}</strong>
      <br>
    <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()
  
  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  const participanteExiste = participantes.find((p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}