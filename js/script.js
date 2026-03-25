/* Seleção de elementos do DOM para busca da cidade e exibição dos dados climáticos */
const inputCidade = document.getElementById("cidade");
const botaoBuscar = document.querySelector(".buscar");

const cidadeNome = document.querySelector(".city");
const temperatura = document.querySelector(".temp");
const descricao = document.querySelector(".description");
const sensacao = document.querySelector(".feels-like");

const umidade = document.querySelector(".details .detail-box:nth-child(1) p");
const vento = document.querySelector(".details .detail-box:nth-child(2) p");

const icone = document.querySelector(".weather-main img");

/* Buscar por coordenadas a cidade usando a api */
async function buscarCoordenadas(cidade) {
  const resposta = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`
  );

  const dados = await resposta.json();

  if (!dados.results) {
    throw new Error("Cidade não encontrada");
  }

  return dados.results[0];
}

/* Buscar clima usando a api*/
async function buscarClima(cidade) {
  try {
    const local = await buscarCoordenadas(cidade);

    const resposta = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${local.latitude}&longitude=${local.longitude}&current_weather=true`
    );

    const dados = await resposta.json();

    atualizarTela(dados, local);

  } catch (erro) {
    alert("Erro: " + erro.message);
  }
}

function atualizarTela(dados, local) {
  cidadeNome.textContent = local.name;

  const clima = dados.current_weather;

  temperatura.textContent = Math.round(clima.temperature) + "°C";
  descricao.textContent = "Clima atual";
  sensacao.textContent = "Vento: " + clima.windspeed + " km/h";

  umidade.textContent = "--"; 
  vento.textContent = clima.windspeed + " km/h";

  icone.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
}

/* Botão */
botaoBuscar.addEventListener("click", () => {
  const cidade = inputCidade.value.trim();

  if (cidade === "") {
    alert("Digite uma cidade!");
    return;
  }

  buscarClima(cidade);
});

/* Enter, caso o usuario der enter ele poderar já procuara a cidade e não precisaris clicar direto no botão*/
inputCidade.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botaoBuscar.click();
  }
});

/* Inicial - a primeira cidade que irá aparecer quando entrar no cite é Recife, a que está no html*/
window.addEventListener("load", () => {
  buscarClima("Recife");
});