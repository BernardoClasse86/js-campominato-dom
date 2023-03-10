console.log('Campo minato')

// Chiedo all'utente di inserire un numero da 1 a 10
    // controllo con un cliclo do while che il numero sia valido e che entri nel range dei numeri richiesti


// do {

//     generatingCell = parseInt(prompt('Insert a number for the number of rows and columns that you want to play with, for example 9 will generate 9 rows and 9 columns for a total of 81 cells! Than Press Play! NOTE: The number must be 7, 9 or 10!'))

// }while (isNaN(generatingCell) || generatingCell > 10 || generatingCell < 1)
// console.log(generatingCell)


// recupero il div con classe "grid" dall'HTML
const gridElement = document.querySelector('.grid')
// console.log(gridElement)

// recupero la select dall HTML
const selectElement = document.getElementById('difficulty')
// console.log(selectElement)

// recupero il button con id "generateGrid" dall'HTML
const btnElement = document.getElementById('generateGrid')
// console.log(btnElement)

// recupero l'elemento counter dall HTML
const counterElement = document.getElementById('counter')
// console.log(counterElement)


let cellElement

//aggiungo al button la funzione che al click lo faccia sparire e generi al suo posto la griglia
btnElement.addEventListener ('click', function(){
    
    let generatingCell
    
    // assegno alla variabile difficultySelect il valore del select recuperato dall'HTML
        // creo una condizione che imposti la difficolta'
    let difficultySelect = selectElement.value

    // SE la difficolta 'e facile si genereranno 100 celle
    if (difficultySelect === 'easy') {

        generatingCell = 10

        // invoco la funzione cosi da moltiplicare, in base alla   
        totalCell = cellGenerator(generatingCell)
    }

    else if (difficultySelect === 'medium') {

        generatingCell = 9

        // invoco la funzione che moltiplica il numero inserito dall'utente per se stesso
        totalCell = cellGenerator(generatingCell)
    }

    else if (difficultySelect === 'hard') {

        generatingCell = 7

        // invoco la funzione che moltiplica il numero inserito dall'utente per se stesso
        totalCell = cellGenerator(generatingCell)
    }


    // creo un ciclo che ad ogni click ricrei la griglia
    while (gridElement.firstChild) {
        gridElement.removeChild(gridElement.firstChild);
    }

    // creo un array vuoto nel quale inserisco dei numeri casuali fino ad un totale di 16
    let bombArray = []

    // creo un ciclo che mi crei 16 numeri random diversi tra loro
    while (bombArray.length < 16) {

        let randomNumber = Math.floor(Math.random() * totalCell) + 1

        // se un numero random e diverso lo aggiunge all'array fino ad arrivare a 16
        if (!bombArray.includes(randomNumber)) {

        bombArray.push(randomNumber)

        // console.log(bombArray)
    }
    }

    // creo un ciclo che a sua volta crei un elemento 'div' per ogni iterazione che effettura in base al risultato di totalCell
    for (let i = 0; i < totalCell; i++) {

        // incremento di uno l'indice per far si che non parta da 0
        let cellNumbers = i + 1
        // console.log(cellNumbers)

        // creo un elemento 'div'
        cellElement = document.createElement('div')

        // appendo il div creato all'elemento gridElement
        gridElement.append(cellElement)

        // aggiungo ad ogni elemento 'div' il suo corrispettivo numero seguendo l'indice
        // cellElement.innerHTML = cellNumbers

        // aggiungo all'elemento 'div' la classe "cell" gia presente nel foglio di stile
        cellElement.classList.add('cell')

        // calcolo la dimensione delle mie celle in base al numero inserito dall'utente
        cellElement.style.width = "calc(100% / " + generatingCell + ")"
    }

    // recupero gli elementi appena creati che hanno la classe "cell"
    const createdCells = document.querySelectorAll('.cell')
    // console.log(createdCells)

    // creo una variabile che conti il n di punti
    let counter = 0

    // creo un ciclo nel quale poi creero una funzione che ad ogni click assegni un background alla cella
        // se pero la cella include una bomba il giocatore perde
    for (let i = 0; i < createdCells.length; i++){

        const cells = createdCells[i]
        // console.log(cells)

        // creo la funzione che al click mi mostri il background green
        cells.addEventListener ('click', function(){

            // se pero la cella include una bomba il giocatore perde
            if (bombArray.includes(i + 1)) {
                
                for (let j = 0; j < createdCells.length; j++) {
                    if (bombArray.includes(j + 1)) {
                        createdCells[j].classList.add('cell-bomb')
                    }
                }
                
                alert(`YOU HITTED A BOMB! Your score is ${counter} points!`)
                
                setTimeout(() => {
                    counterElement.innerHTML = 0
                    location.reload()
                }, 1000)
            }
            else {
                // aggiungo + 1 al counter ogni volta che clicco su una cella
                counter += 1
    
                // stampo nell'HTML il valore di counter
                counterElement.innerHTML = counter
                
                cells.classList.add('cell-no-bomb')

                let cellsWithoutBomb = totalCell - bombArray.length

                if (counter === cellsWithoutBomb ) {
                    alert(`YOU ARE SO GOOD :)! Your score is ${counter} points!`)

                    counterElement.innerHTML = 0

                    btnElement.click()
                }
            }

            cells.removeEventListener("click", arguments.callee);
        })
    }
})

/********
FUNZIONI
********/

// creo funzione per moltiplicare il numero inserito dall'utente

function cellGenerator(cellToGenerate){

    const fullGrid = cellToGenerate**2

    return fullGrid
}