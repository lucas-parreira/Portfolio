const nomeElemento = document.getElementById("nome-maquina");
const nomeTexto = "LUCAS PARREIRA PAIVA";
let indice = 0;

function escreverNome() {
  if (indice < nomeTexto.length) {
    nomeElemento.textContent += nomeTexto.charAt(indice);
    indice++;
    setTimeout(escreverNome, 150);
  } else {
    nomeElemento.classList.add("blink");
  }
}
escreverNome();

const botaoTema = document.getElementById("toggle-tema");
botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  botaoTema.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Modo Claro"
    : "🌙 Modo Escuro";
});

const barraScroll = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progresso = (scrollTop / scrollHeight) * 100;
  barraScroll.style.width = progresso + "%";
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    let alvo = document.querySelector(this.getAttribute("href"));
    alvo.scrollIntoView({ behavior: "smooth" });
  });
});

const seta = document.getElementById("seta-baixo");
seta.addEventListener("click", () => {
  document.querySelector("#sobre").scrollIntoView({ behavior: "smooth" });
});

const itensTimeline = document.querySelectorAll(".timeline-item");
function animarTimeline() {
  let alturaTela = window.innerHeight;
  itensTimeline.forEach((item) => {
    let posicaoItem = item.getBoundingClientRect().top;
    if (posicaoItem < alturaTela - 100) item.classList.add("show");
  });
}
window.addEventListener("scroll", animarTimeline);
animarTimeline();

const caixasHabilidades = document.querySelectorAll(".caixa-habilidade");
caixasHabilidades.forEach((caixa) => {
  caixa.addEventListener("click", () => {
    const lista = caixa.querySelector(".lista-habilidade");
    lista.classList.toggle("ativo");
    if (lista.classList.contains("ativo")) {
      lista.style.maxHeight = lista.scrollHeight + "300px";
      lista.style.opacity = 1;
      lista.style.padding = "15px 25px";
    } else {
      lista.style.maxHeight = "0";
      lista.style.opacity = 0;
      lista.style.padding = "0 25px";
    }
  });
});

const modal = document.getElementById("modal");
const fecharModal = document.querySelector(".modal .fechar");
if (modal && fecharModal) {
  const formContato = document.getElementById("form-contato");
  formContato.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    setTimeout(() => modal.classList.remove("fechar-animacao"), 10);
    formContato.reset(); 
  });
  fecharModal.addEventListener("click", () => {
    modal.classList.add("fechar-animacao");
    setTimeout(() => (modal.style.display = "none"), 300);
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("fechar-animacao");
      setTimeout(() => (modal.style.display = "none"), 300);
    }
  });
}

const iconesContato = document.querySelectorAll(".item-contato i");
function ajustarCoresDarkMode() {
  iconesContato.forEach((icone) => {
    icone.style.color = document.body.classList.contains("dark-mode")
      ? "#ffffff"
      : "black";
  });
}
botaoTema.addEventListener("click", ajustarCoresDarkMode);
window.addEventListener("load", ajustarCoresDarkMode);

const telefoneInput = document.getElementById("telefone");
telefoneInput.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  if (valor.length > 11) valor = valor.slice(0, 11);
  if (valor.length > 10) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (valor.length > 6) {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else {
    valor = valor.replace(/^(\d*)/, "($1");
  }
  e.target.value = valor;
});