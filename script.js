let destapes = 0;
tarjeta1 = null;
tarjeta2 = null;
primerResultado = null;
segundoResultado = null;
movimientos = 0;
mostrarMovimientos = document.getElementById(`movimientos`);
aciertos = 0;
mostrarAciertos = document.getElementById(`aciertos`);
temporizador = false;
timer = 25;
timerInicial = 25;
mostrarTiempo = document.getElementById(`seg-restantes`);
tiempoId = null;
winAudio = new Audio(`./sounds/win.wav`);
loseAudio = new Audio(`./sounds/lose.wav`);
badAudio = new Audio(`./sounds/bad.wav`);
goodAudio = new Audio(`./sounds/good.wav`);
touchAudio = new Audio(`./sounds/touch.wav`);

// Mezclado del arreglo
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//funciones
function contarTiempo() {
  tiempoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Segundos restantes : ${timer}`;
    if (timer == 0) {
      clearInterval(tiempoId);
      bloquearTarjetas();
      loseAudio.play();
      mostrarAciertos.innerHTML = `Aciertos : ${aciertos} ☠`;
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let index = 0; index < numeros.length; index++) {
    let tarjetaBloqueada = document.getElementById(index);
    tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[index]}.svg" alt="">`;
    tarjetaBloqueada.disabled = true;
  }
}

//funcion principal
function flip(id) {
  if (temporizador === false) {
    contarTiempo();
    temporizador = true;
  }

  destapes++;
  if (destapes === 1) {
    // mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.svg" alt="">`;
    touchAudio.play();
    // deshabilitar primer boton
    tarjeta1.disabled = true;
  } else if (destapes === 2) {
    // mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.svg" alt="">`;
    touchAudio.play();
    // deshabilitar segundo boton
    tarjeta2.disabled = true;
    // incrementar contador de movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`;
    if (primerResultado === segundoResultado) {
      // reiniciamos contador de destapes
      destapes = 0;
      // aumentamos contador de aciertos
      aciertos++;
      goodAudio.play();
      mostrarAciertos.innerHTML = `Aciertos : ${aciertos}`;
      // emoticones cuando termina el juego
      if (aciertos === 8) {
        clearInterval(tiempoId);
        winAudio.play();
        mostrarAciertos.innerHTML = `Aciertos : ${aciertos} 🏆`;
        mostrarTiempo.innerHTML = `Tu tiempo fue ${timerInicial - timer}s 🎉`;
        mostrarMovimientos.innerHTML = `Movimientos : ${movimientos} 👍`;
      }
    } else {
      //mostrar valores momentaneamente y taparlos
      badAudio.play();
      setTimeout(() => {
        tarjeta1.innerHTML = ` `;
        tarjeta2.innerHTML = ` `;
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        destapes = 0;
      }, 500);
    }
  }
}
