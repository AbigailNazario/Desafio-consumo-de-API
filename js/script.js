/* Elementos */
const inputCidade = document.getElementById("cidade");
const botaoBuscar = document.querySelector(".buscar");

const cidadeNome = document.querySelector(".city");
const temperatura = document.querySelector(".temp");
const descricao = document.querySelector(".description");
const sensacao = document.querySelector(".feels-like");

const umidade = document.querySelector(".details .detail-box:nth-child(1) p");
const vento = document.querySelector(".details .detail-box:nth-child(2) p");

const icone = document.querySelector(".weather-main img");

/* Buscare */
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

/* Buscar clima */
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

/* Enter */
inputCidade.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botaoBuscar.click();
  }
});

/* Inicial */
window.addEventListener("load", () => {
  buscarClima("Recife");
});