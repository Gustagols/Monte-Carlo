const pointInput = document.getElementById("points-input");
const board = document.getElementById("board");   
        
const themeIcon = document.querySelector(".light-mode-icon");
const body = document.body;

themeIcon.addEventListener("click", () => {
    body.classList.toggle("light-mode");
});



function rodarSimulacao() {
    const n = parseInt(pointInput.value);
    
    fetch("/points?n=" + n)
    .then(response => response.json())
    .then(data => {
                const ctx = board.getContext("2d");
                ctx.clearRect(0, 0, 400, 400); // Limpa a tela anterior
        
                const isLight = document.body.classList.contains("light-mode");
                const corDentro = isLight ? "blue" : "aqua";
                const corFora   = isLight ? "red" : "red";

            data.forEach(point => {
                // 1. Coordenadas para o Desenho (Pixels 0-400)
                const x = (point[0] + 1) * 200;
                const y = (point[1] + 1) * 200;

                // 2. Coordenadas para a Matemática (Valores -1 a 1)
                const xPoint = point[0] * point[0];
                const yPoint = point[1] * point[1];

                // 3. Decide a cor
                if (xPoint + yPoint > 1) {
                    ctx.fillStyle = corFora;
                } else {
                    ctx.fillStyle = corDentro;
                }

                // 4. Desenha
                ctx.fillRect(x, y, 2, 2);
            });
        });
    }
    
    pointInput.addEventListener('keydown', (event) => {
        
        if (event.key === "Enter") { 
            if (pointInput.value.length < 7) {
                rodarSimulacao(); 
            }  else {
                alert("Number of digits can not be higher than 6!");
                pointInput.value = pointInput.value.slice(0, 6);
            } 
        }
    });


 