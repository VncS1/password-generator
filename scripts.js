const lengthCheck = document.querySelector('.lengthCheck')
const upperCheck = document.querySelector('.upperCheck')
const lowerCheck = document.querySelector('.lowerCheck')
const numbersCheck = document.querySelector('.numbersCheck')
const symbolsCheck = document.querySelector('.symbolsCheck')

const generateButton = document.querySelector('.generate-pass')

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let symbols = ['@', '!', '?', '#', '$', '&', '%', '|', '{', '}', '[', ']', '_']


//Pegar um numero aleatorio entre 2 valores
const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


//Vendo quais itens estão checados
const getChecks = () => {
    let checks = [0, 0, 0, 0]

    if (lowerCheck.checked) {
        checks[0] = 1
    }

    if (numbersCheck.checked) {
        checks[1] = 1
    }

    if (symbolsCheck.checked) {
        checks[2] = 1
    }

    if (upperCheck.checked) {
        checks[3] = 1
    }

    console.log(checks)

    return checks
}

const generatePassword = () => {
    let password = []
    const checks = getChecks()

    for (let i = 0; i < lengthCheck.value; i++) {
        let randomLetterNumber = getRandomNumber(0, 26) //Letra aleatoria
        let randomNumber = getRandomNumber(0, 9) //Numero aleatorio
        let randomSymbol = getRandomNumber(0, 12) //Para pegar um simbolo aleatorio
        let randomNumberType = getRandomNumber(0, 47) //Colocar a probabilidade do tipo de dado

        let testNumber = false


        if (checks[0] == 1 && (randomNumberType == 0 || randomNumberType == 2 || randomNumberType == 6)) {

            password.push(letters[randomLetterNumber])

            testNumber = true

        } else if (checks[1] == 1 && (randomNumberType == 1 || randomNumberType == 3)) {
            password.push(numbers[randomNumber])
            testNumber = true

        } else if (checks[2] == 1 && (randomNumberType == 4)) {
            password.push(symbols[randomSymbol])
            testNumber = true

        } else if (checks[3] == 1 && (randomNumberType == 5)) {
            password.push(letters[randomLetterNumber].toUpperCase())
            testNumber = true
        }

        if(!testNumber){
            i--;
        }
    }

    if(password.length == lengthCheck.value){
        return password.toString().replace(/,/g,'')
    }
}

const passwordResult = document.querySelector('.result')


//Evento que irá acontecer ao clicar no botão
generateButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatePassword()
    passwordResult.value = password
})


//Função para o botão de copiar texto funcionar
const copyButton = document.querySelector('.copy')

copyButton.addEventListener("click", (e) => {
    e.preventDefault()
    //Texto que irá ser copiado
    const copyText = document.querySelector('.result')
    copyText.select()
    copyText.setSelectionRange(0, 9999)
    document.execCommand("copy")

    alert("Password copied successfully!")
})
