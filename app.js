
let listaDeNumerosSorteados = [];
let limiteNum = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 0;
let audioErrou = new Audio('errou-som.mp3');
let audioAcertou = new Audio('acertou-som.mp3');

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

let btnVerificar = document.getElementById('btnChute');
let btnReiniciar = document.getElementById('reiniciar');

btnVerificar.addEventListener('click', verificarChute);
btnReiniciar.addEventListener('click', reiniciarJogo);

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;
    palavraTentativas = tentativas > 1 ? ' tentativas.' : ' tentativa.';
    if (chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!!');
        exibirTexto('p', 'Você descobriu o número secreto, com ' + tentativas + palavraTentativas);
        audioAcertou.play();
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else if(chute > numeroSecreto){
        exibirTexto('p', 'O número ' + chute + ' é maior que o número secreto.');
        audioErrou.play();
        limparCampo();
    }else if(chute < numeroSecreto){
        exibirTexto('p', 'O número ' + chute + ' é menor que o número secreto');
        audioErrou.play();
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * limiteNum + 1);
    let qtdElementosEscolhidos = listaDeNumerosSorteados.length;

    if (qtdElementosEscolhidos == limiteNum){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumAleatorio;
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    tentativas = 0;
}