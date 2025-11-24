import { getValidNumber } from "./input-validation.js";
import { getThemeColors } from "./light-mode.js";

const board = document.getElementById("board");
const pointInput = document.getElementById("points-input");
const sendBttn = document.getElementById("send-bttn");
const loader = document.getElementById("loader");
const piValue = document.getElementById("pi-value");

function runSimulation() {

    let rawN = parseInt(pointInput.value);
    const n = getValidNumber(rawN, pointInput); // getValidNumber recebe dois parâmetros na construção, um valor e um elemento
 
    if (n <= 0) return; // se o input for 0 ou menor que 0, não executa a função.

    loader.classList.remove("hidden"); // aciona a animação de loading
    piValue.innerText = "..."; // enquanto a simulação estiver processando, o valor de pi está sendo calculado ...

    fetch("/points?n=" + n)
        .then(response => response.json())
        .then(data => {
            const ctx = board.getContext("2d");
            ctx.clearRect(0, 0, 400, 400); // Limpa a tela anterior

            let insideCount = 0;
            const colors = getThemeColors();

            data.forEach(point => {
                // 1. Coordenadas para o Desenho (Pixels 0-400)
                const x = (point[0] + 1) * 200;
                const y = (point[1] + 1) * 200;
                // 2. Coordenadas para a Matemática (Valores -1 a 1)
                const xPoint = point[0] * point[0];
                const yPoint = point[1] * point[1];
                // 3. Decide cor
                if (xPoint + yPoint > 1) {
                    ctx.fillStyle = colors.outside;
                } else {
                    ctx.fillStyle = colors.inside;
                    insideCount++;
                }
                // 4. Cria o gráfico
                ctx.fillRect(x, y, 2, 2);
            });
                // 5. Calcula o valor de pi
                const piEstimado = 4 * (insideCount / n);
                piValue.innerText = piEstimado.toFixed(4); // <-- printa na tela
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao buscar dados da simulação."); // <-- em caso de erro de busca
        })
        .finally(() => {
            loader.classList.add("hidden"); // a animação de loading volta a ficar apagada assim que a simulação é executada
        });
}

// 6. Event listener - Input
pointInput.addEventListener('keydown', (event) => { 
    if (event.key === "Enter") { 
        runSimulation(); 
    }
});

// 7. Event listener - Button
sendBttn.addEventListener('click', () => { 
    runSimulation(); 
});

