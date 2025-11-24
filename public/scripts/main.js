const board = document.getElementById("board");   
const sendBttn = document.getElementById("send-bttn");
const pointInput = document.getElementById("points-input");
const loader = document.getElementById("loader");
const piValue = document.getElementById("pi-value");
        
const body = document.body;
const themeIcon = document.querySelector(".light-mode-icon");

themeIcon.addEventListener("click", () => { body.classList.toggle("light-mode"); });

    function rodarSimulacao() {

    const n = parseInt(pointInput.value);
    loader.classList.remove("hidden");

    piValue.innerText = "...";

    fetch("/points?n=" + n)
    .then(response => response.json())
    .then(data => {
                const ctx = board.getContext("2d");
                ctx.clearRect(0, 0, 400, 400); // Limpa a tela anterior
        
                const isLight = document.body.classList.contains("light-mode");
                const corDentro = isLight ? "blue" : "aqua";
                const corFora   = isLight ? "red" : "red";

                let insideCount = 0;

            data.forEach(point => {
                // 1. Coordenadas para o Desenho (Pixels 0-400)
                const x = (point[0] + 1) * 200;
                const y = (point[1] + 1) * 200;

                // 2. Coordenadas para a Matemática (Valores -1 a 1)
                const xPoint = point[0] * point[0];
                const yPoint = point[1] * point[1];

                if (xPoint + yPoint > 1) {
                    ctx.fillStyle = corFora;
                } else {
                    ctx.fillStyle = corDentro;
                    insideCount++;
                }

                ctx.fillRect(x, y, 2, 2);
            });
                const piEstimado = 4 * (insideCount / n);
                piValue.innerText = piEstimado.toFixed(4);
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao buscar dados da simulação.");
        })
        .finally(() => {
            loader.classList.add("hidden");
        });
    }
    
     function inputValidation () {
         if (pointInput.value <= 100000) {
                rodarSimulacao();  
            }  else {
                alert("Number of points can not be higher than 100.000!");
                pointInput.value = 100000;
            }    
        }

    
     pointInput.addEventListener('keydown', (event) => { 
         if (event.key === "Enter") { inputValidation(); }});

     sendBttn.addEventListener('click', () => { inputValidation(); });


 