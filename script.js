const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje__desencriptado");
const copia = document.querySelector(".boton__copiar");
copia.style.display = "none" //oculta el boton copiar al inicio del programa

function validarTexto(){
    let textoEscrito = document.querySelector(".text-area").value;
    let validador = textoEscrito.match(/^[a-z\s]*$/);
    if(!validador) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡El texto contiene caracteres no permitidos!",
        }).then(() => {
            location.reload(); // Recargar la página después de que el usuario cierre la alerta
        });
        return true;
    }
    return false;
}

function btnEncriptar(){
    if(!validarTexto()) {
        const textoEncriptado = encriptar(textArea.value);
        mensaje.value = textoEncriptado;
        mensaje.style.display = "block"; 
        textArea.value = "";
        copia.style.display = "block";
        document.getElementById("contenido__mensaje--informacion").style.display = "none"; 
    }
}

//Claves de la encriptacion/desencriptacion
// `La letra "e" es convertida para "enter"`
// `La letra "i" es convertida para "bet"`
// `La letra "a" es convertida para "ai"`
// `La letra "o" es convertida para "ober"`
// `La letra "u" es convertida para "ufat"``
// `La letra "n" es convertida para "dly"``
// `La letra "c" es convertida para "stx"``
// `La letra "m" es convertida para "rs"``

function encriptar(stringEncriptada){
    let matrizCodigo = [["e", "hx"], ["i", "bet"], ["a", "ai"], ["o", "ober"], ["u", "ufat"], ["c", "stx"], ["n", "dly"], ["m", "rs"]];
    stringEncriptada = stringEncriptada.toLowerCase();
    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada;
}

function btnDesencriptar(){
    const textoEncriptado = desencriptar(textArea.value)
    mensaje.value = textoEncriptado
    textArea.value = "";
    copia.style.display = "block";
    mensaje.style.display = "block";
}

function desencriptar(stringDesencriptada){
    let matrizCodigo = [["e", "hx"], ["i", "bet"], ["a", "ai"], ["o", "ober"], ["u", "ufat"], ["c", "stx"], ["n", "dly"], ["m", "rs"]];
    stringDesencriptada = stringDesencriptada.toLowerCase()
    document.getElementById("contenido__mensaje--informacion").style.display = "none";
    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringDesencriptada.includes(matrizCodigo[i][1])){
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1] , matrizCodigo[i][0])
        }
    }
    return stringDesencriptada;
}

function copiar(){
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value).then(() => {
        mensaje.value = "";
        copia.style.display = "none";
        mensaje.style.display = "none";
        document.getElementById("contenido__mensaje--informacion").style.display = "flex"; 
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}