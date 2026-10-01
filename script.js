/*
=========================================
CryptoPass
Criptografia demonstrativa
=========================================
*/

const campoSenha = document.getElementById("senha");
const botao = document.getElementById("btnCriptografar");

const original = document.getElementById("original");
const criptografada = document.getElementById("criptografada");
const listaPassos = document.getElementById("listaPassos");

// Chave utilizada na criptografia
const CHAVE = 7;

// Evento do botão
botao.addEventListener("click", criptografarSenha);

function criptografarSenha(){

    const texto = campoSenha.value.trim();

    if(texto === ""){

        alert("Digite uma senha ou código.");

        return;

    }

    original.textContent = texto;

    listaPassos.innerHTML = "";

    adicionarPasso("Senha recebida: " + texto);

    //---------------------------------------------------
    // PASSO 1
    //---------------------------------------------------

    let ascii = [];

    for(let letra of texto){

        ascii.push(letra.charCodeAt(0));

    }

    adicionarPasso(
        "Conversão para códigos ASCII: " + ascii.join(" | ")
    );

    //---------------------------------------------------
    // PASSO 2
    //---------------------------------------------------

    let soma = ascii.map(numero => numero + CHAVE);

    adicionarPasso(
        "Somando a chave (" + CHAVE + ") em cada valor: " +
        soma.join(" | ")
    );

    //---------------------------------------------------
    // PASSO 3
    //---------------------------------------------------

    let caracteres = soma.map(numero => String.fromCharCode(numero));

    adicionarPasso(
        "Convertendo novamente para caracteres: " +
        caracteres.join("")
    );

    //---------------------------------------------------
    // PASSO 4
    //---------------------------------------------------

    let invertido = caracteres.reverse().join("");

    adicionarPasso(
        "Invertendo a sequência: " +
        invertido
    );

    //---------------------------------------------------
    // PASSO 5
    //---------------------------------------------------

    let base64 = btoa(invertido);

    adicionarPasso(
        "Codificando em Base64: " +
        base64
    );

    //---------------------------------------------------
    // PASSO 6
    //---------------------------------------------------

    let resultado = base64
        .replace(/A/g,"@")
        .replace(/E/g,"3")
        .replace(/I/g,"1")
        .replace(/O/g,"0")
        .replace(/U/g,"#");

    adicionarPasso(
        "Aplicando substituições especiais."
    );

    //---------------------------------------------------
    // RESULTADO
    //---------------------------------------------------

    criptografada.textContent = resultado;

    adicionarPasso(
        "Criptografia final concluída!"
    );

}

//--------------------------------------------

function adicionarPasso(texto){

    const li = document.createElement("li");

    li.textContent = texto;

    listaPassos.appendChild(li);

}
