const apiKey = "8d996ea77014beb6433b3b85e4d40edc";

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

/* Função principal */
async function buscarClima(cidade) {
  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    if (!resposta.ok) {
      throw new Error("Cidade não encontrada");
    }

    const dados = await resposta.json();

    atualizarTela(dados);

  } catch (erro) {
    alert("Erro: " + erro.message);
  }
}

/* 🖥️ Atualiza HTML */
function atualizarTela(dados) {
  cidadeNome.textContent = dados.name;
  temperatura.textContent = Math.round(dados.main.temp) + "°C";
  descricao.textContent = dados.weather[0].description;
  sensacao.textContent = "Sensação: " + Math.round(dados.main.feels_like) + "°C";

  umidade.textContent = dados.main.humidity + "%";
  vento.textContent = dados.wind.speed + " km/h";

  icone.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
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

/* Enter para buscar */
inputCidade.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botaoBuscar.click();
  }
});

/* Clima inicial */
window.addEventListener("load", () => {
  buscarClima("Recife");
});