const icons = document.querySelectorAll('.icon');
const paperclipLabel = document.querySelector('.paperclip-label');
const paperclipIcon = document.querySelector('.icon');
[paperclipIcon, paperclipLabel].forEach((element) =>
  element.addEventListener('click', () => {
    icons.forEach((icon) => {
      if (icon.classList.contains('active')) {
        icon.classList.remove('active');
      }
    });
    userIcon.src = userIcon.classList.contains('active')
      ? '/static/assets/user-active.svg'
      : '/static/assets/user.svg';
    paperclipIcon.classList.add('active');
    paperclipIcon.src = paperclipIcon.classList.contains('active')
      ? '/static/assets/paperclip-active.svg'
      : '/static/assets/paperclip.svg';
  })
);

const userIcon = document.querySelector('.user-icon');
const userLabel = document.querySelector('.user-label');
[userIcon, userLabel].forEach((element) =>
  element.addEventListener('click', () => {
    icons.forEach((icon) => {
      if (icon.classList.contains('active')) {
        icon.classList.remove('active');
      }
    });
    paperclipIcon.src = paperclipIcon.classList.contains('active')
      ? '/static/assets/paperclip-active.svg'
      : '/static/assets/paperclip.svg';
    userIcon.classList.add('active');
    userIcon.src = userIcon.classList.contains('active')
      ? '/static/assets/user-active.svg'
      : '/static/assets/user.svg';
  })
);

const progressBars = document.querySelectorAll('.progress-bar');

// Update the progress (0-100)
function updateProgress(progress) {
  progressBars.forEach((bar) => (bar.style.width = progress + '%'));
}
console.log(progressBars);
// Example usage: update progress to 50%
updateProgress(5);

const slider = document.querySelector('.exam-cards');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('wheel', (e) => {
  e.preventDefault();
  slider.scrollLeft += e.deltaY;
});

function scrollSmoothly(scrollTarget, duration) {
  const start = slider.scrollLeft;
  const change = scrollTarget - start;
  let startTime = null;

  function animateScroll(currentTime) {
    if (!startTime) startTime = currentTime;
    let elapsedTime = currentTime - startTime;
    let amountScrolled = easeInOutQuad(elapsedTime, start, change, duration);
    slider.scrollLeft = amountScrolled;
    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animateScroll);
}

// Obtém todas as instâncias dos elementos do tempo restante
const tempoRestanteElements = document.querySelectorAll('.card-subtitle');
const tempoRestanteTeste = document.querySelectorAll('.time-left');

// Função para atualizar o tempo restante em cada elemento
function atualizarTempoRestante(listTime) {
  console.log(listTime);
  listTime.forEach((element) => {
    const tempoRestante = element.textContent;

    // Divide o tempo restante em horas, minutos e segundos
    let [horas, minutos, segundos] = tempoRestante.split(':');

    // Converte as strings em números
    horas = parseInt(horas);
    minutos = parseInt(minutos);
    segundos = parseInt(segundos);

    // Diminui 1 segundo do tempo restante
    segundos--;

    // Verifica se é necessário ajustar as horas e minutos
    if (segundos < 0) {
      segundos = 59;
      minutos--;

      if (minutos < 0) {
        minutos = 59;
        horas--;

        if (horas < 0) {
          // Tempo restante expirado
          horas = 0;
          minutos = 0;
          segundos = 0;
        }
      }
    }

    // Formata os valores com zeros à esquerda
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const segundosFormatados = segundos.toString().padStart(2, '0');

    // Atualiza o valor exibido no elemento
    element.textContent = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
  });
}

// Chama a função atualizarTempoRestante a cada segundo
setInterval(() => atualizarTempoRestante(tempoRestanteElements), 1000);
