/*

    Consegna
    Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
    Attenzione: nella stessa cella può essere posizionata al massimo una bomba,
    perciò nell'array delle bombe non potranno esserci due numeri uguali.
    In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati
    - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
    Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    La partita termina quando il giocatore clicca su una bomba
    o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
    Al termine della partita il software deve comunicare il punteggio, 
    cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.


*/


const myContainer = document.querySelector('.my-container');
const startButton = document.querySelector('button');
const mySelect = document.querySelector('select');
const win = document.getElementById('win-lose');
const endGame = document.getElementById('end-game');
const risultato = document.getElementById('win-lose');
const scoreText = document.getElementById('score');


startButton.addEventListener ('click', function(){
    let counter = 1;
    myContainer.innerHTML = "";
    endGame.classList.remove('block', 'lose', 'win')
    scoreText.innerHTML += ""
    const bombs = [];
    const difficult = parseInt(mySelect.value);

    while (bombs.length < 16){
        // Genero numero casuale
        const n = generateRandomNumber(1, difficult);
        let foundNumber = bombs.includes(n);
        if (!foundNumber) {
            bombs.push(n);
        }
    }
    console.log('bombe', bombs, bombs.length)
    for (let i = 0; i < difficult; i++) {        
        const square = document.createElement('div');
        square.classList.add('cell', 'cell-' + difficult);
        square.innerHTML = i + 1;
        myContainer.append(square); 
        //  Evento click sulla cella        
        square.addEventListener('click', function(){
            
            let clicked = square.classList.contains('active');
            square.classList.add('active');            
            let flag = false;      
            // Ciclo di controllo se è una bomba
            for (let i = 0; i < bombs.length; i++) {
                if (square.innerHTML == bombs[i]){    
                    flag = true;
                    square.classList.add('lose')
                }                
            }
            if (!clicked){
                if (counter >= difficult - bombs.length){
                    risultato.innerHTML = "Hai vinto, sei un grande";
                    scoreText.innerHTML ="Punteggio : " + counter;
                    endGame.classList.add('block', 'win');                    
                } else if (!flag){
                    counter++
                } else if (flag){
                    counter -= 1
                    risultato.innerHTML = "Hai perso";
                    scoreText.innerHTML ="Punteggio : " + counter;
                    endGame.classList.add('block', 'lose');                
                }
            }
        })
    }
})

/* 
    FUNZIONI
*/
function generateRandomNumber(min, max) {
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randNum;
}