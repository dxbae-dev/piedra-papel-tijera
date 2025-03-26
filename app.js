// Variables para almacenar el puntaje y el total de juegos
let userScore = localStorage.getItem("userScore")
  ? parseInt(localStorage.getItem("userScore"))
  : 0;
let computerScore = localStorage.getItem("computerScore")
  ? parseInt(localStorage.getItem("computerScore"))
  : 0;
let totalPlays = localStorage.getItem("totalPlays")
  ? parseInt(localStorage.getItem("totalPlays"))
  : 0;

// Cargar puntaje al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Actualizamos el puntaje inmediatamente cuando se carga la página
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("computer-score").textContent = computerScore;
  document.querySelector(".play").textContent = totalPlays;

  // Calculamos y mostramos el porcentaje de victorias
  let winPercentage =
    totalPlays === 0 ? 0 : ((userScore / totalPlays) * 100).toFixed(0);
  document.getElementById("porcent").textContent = `${winPercentage}%`;
});

// Función para actualizar el puntaje y guardarlo en el almacenamiento local
function updateScore() {
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("computer-score").textContent = computerScore;
  totalPlays++;
  document.querySelector(".play").textContent = totalPlays;

  // Calculamos el porcentaje de victorias
  let winPercentage = ((userScore / totalPlays) * 100).toFixed(0);
  document.getElementById("porcent").textContent = `${winPercentage}%`;

  // Guardamos los puntajes y el total de juegos en localStorage
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
  localStorage.setItem("totalPlays", totalPlays);
}

// Función para generar una elección aleatoria de la computadora
function computerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  return randomChoice;
}

// Función para mostrar el toast con el mensaje adecuado
function showToast(result) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const toastIcon = document.getElementById("toast-icon");

  // Mostrar mensaje y icono según el resultado
  if (result === "ganado") {
    toastMessage.textContent = "¡Has ganado!";
    toast.classList.add("win");
    toastIcon.className = "ri-thumb-up-line"; // Icono de pulgar arriba
  } else if (result === "perdido") {
    toastMessage.textContent = "¡Has perdido!";
    toast.classList.add("lose");
    toastIcon.className = "ri-thumb-down-line"; // Icono de pulgar abajo
  } else {
    toastMessage.textContent = "¡Empate!";
    toast.classList.add("draw");
    toastIcon.className = "ri-equalizer-fill"; // Icono de empate
  }

  // Mostrar el toast
  toast.classList.add("show");

  // Ocultar el toast después de 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.remove("win", "lose", "draw"); // Limpiar las clases de estado
  }, 1400);
}

// Función para jugar una ronda
function playGame(userChoice) {
  const computerSelection = computerChoice();
  const userSelection = document.getElementById(userChoice);

  // Mostramos la opción elegida por el usuario
  const userImage = userSelection.querySelector("img");
  const computerImage = document.querySelector(".computer-game img");

  // Limpiamos la imagen de la computadora antes de mostrar la nueva
  computerImage.src = "img/hand-closed.png"; // Mano cerrada al inicio
  computerImage.style.transform = "scale(1)"; // Restablecer la escala de la imagen de la computadora

  // Mostramos la selección de la computadora inmediatamente
  setTimeout(() => {
    computerImage.src = `img/${computerSelection}.png`; // Mostramos la elección de la computadora

    // Ocultamos todas las opciones mientras ocurre la pelea, excepto la seleccionada
    document.querySelectorAll(".option").forEach((option) => {
      if (option !== userSelection) {
        option.style.display = "none";
      }
    });

    // Añadir la animación de pelea
    const gameElement = document.querySelector(".game");
    gameElement.classList.add("shake");

    // Remover la clase de animación después de un tiempo
    setTimeout(() => {
      gameElement.classList.remove("shake");
    }, parseFloat(getComputedStyle(gameElement).animationDuration) * 1000);

    setTimeout(() => {
      // Resultado de la partida
      let result = "";
      if (userChoice === computerSelection) {
        result = "empate";
        document.querySelector(".background").style.backgroundColor =
          "var(--neutral-color)"; // Gris para empate
      } else if (
        (userChoice === "rock" && computerSelection === "scissors") ||
        (userChoice === "scissors" && computerSelection === "paper") ||
        (userChoice === "paper" && computerSelection === "rock")
      ) {
        result = "ganado";
        userScore++;
        document.querySelector(".background").style.backgroundColor = "#4CAF50"; // Verde para victoria
      } else {
        result = "perdido";
        computerScore++;
        document.querySelector(".background").style.backgroundColor = "#F44336"; // Rojo para derrota
      }

      // Actualizamos el puntaje
      updateScore();

      // Mostrar el resultado de la ronda
      showToast(result); // Mostrar el toast con el resultado

      // Volver a mostrar todas las opciones después del resultado
      setTimeout(() => {
        document.querySelectorAll(".option").forEach((option) => {
          option.style.display = "flex";
        });

        // Volver a la imagen neutral de la computadora después de la animación
        computerImage.src = "img/hand-closed.png";
      }, 1500); // Tiempo para mostrar el resultado y restaurar las opciones
    }, 1000); // Espera después de mostrar la selección de la computadora para la animación
  }, 300); // Espera antes de mostrar la selección de la computadora
}

// Agregar eventos a los botones de opciones
document
  .getElementById("rock")
  .addEventListener("click", () => playGame("rock"));
document
  .getElementById("paper")
  .addEventListener("click", () => playGame("paper"));
document
  .getElementById("scissors")
  .addEventListener("click", () => playGame("scissors"));
