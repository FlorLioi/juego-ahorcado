let contenedorPalabra = document.querySelector('#contenedorPalabra');
let btnComienzo = document.querySelector('#btnComienzo');
let letrasUsadasElement = document.querySelector('#letrasUsadas');

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.heigth = 0;

let partesCuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let palabraSeleccionada;
let letrasUsadas;
let errores;
let aciertos;

let comenzarJuego = () => {
    letrasUsadas = [];
    errores = 0;
    aciertos = 0;
    contenedorPalabra.innerHTML = "";
    letrasUsadasElement.innerHTML = "";
    btnComienzo.style.display = "none";
    dibujar();
    seleccionarPalabra();
    pintarPalabra();
    document.addEventListener('keydown', letrasEvent);
}

let dibujar = () =>{
    ctx.canvas.width = 120;
    ctx.canvas.heigth = 160;
    ctx.scale(20,20);
    ctx.clearRect(0,0, canvas.width, canvas.heigth);
    ctx.fillStyle = "#e56121";
    ctx.fillRect(0,7,4,1);
    ctx.fillRect(1,0,1,8);
    ctx.fillRect(2,0,3,1);
    ctx.fillRect(4,1,1,1);
};

let seleccionarPalabra = () =>{
    let palabra = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    palabraSeleccionada = palabra.split("");
};

let pintarPalabra = () =>{
    palabraSeleccionada.forEach(letra =>{
        let letras = document.createElement("span");
        letras.innerHTML = letra.toUpperCase();
        letras.classList.add("letra");
        letras.classList.add("ocultar");
        contenedorPalabra.appendChild(letras);
    });
};

let letrasEvent = event =>{
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(nuevaLetra)){
        letraInput(nuevaLetra);
    };
}; 

let letraInput = letra => {
    if(palabraSeleccionada.includes(letra)){
        letraCorrecta(letra);
    }else{
        letraIncorrecta();
    };

    agregarLetra(letra);
    letrasUsadas.push(letra);
};

let letraCorrecta = letra => {
    let {children} = contenedorPalabra;
    for (let i =0; i<children.length; i++){
        if(children[i].innerHTML === letra){
            children[i].classList.toggle('ocultar');
            aciertos++;
        };
    };

    if(aciertos === palabraSeleccionada.length){
        finalizarJuego();
        Swal.fire({
            title: "GANASTE!",
            showConfirmButton:false
        });
    };
};

let letraIncorrecta = () =>{
    agregarParteCuerpo(partesCuerpo[errores]);
    errores++;
    if(errores === partesCuerpo.length){
        finalizarJuego();
        Swal.fire({
            title: "Ups! Intente de nuevo",
            showConfirmButton:false
        });
    };
};

let agregarParteCuerpo = partesCuerpo =>{
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(...partesCuerpo);
};

let agregarLetra = letra =>{
    let letraElement = document.createElement('span');
    letraElement.innerHTML = letra.toUpperCase();
    letrasUsadasElement.appendChild(letraElement);
};

let finalizarJuego = () =>{
    document.removeEventListener('keydown', letrasEvent);
    btnComienzo.style.display = "block";
};

btnComienzo.addEventListener('click', comenzarJuego);