class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }

    delete(){

    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        const numk = prev;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case ':':
                computation = prev / current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '*2':
                computation = prev * prev;
                break;
            case '*?':
                for(const i = 2; i <= current; i ++){
                    numk = numk * prev
                }
                computation = numk;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand ='';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const allClearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', buttom => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', buttom => {
    calculator.clear();
    calculator.updateDisplay();
})

//-------------------------------------------------------------------------------------

    let darkmode = localStorage.getItem("darkmode");
    const btnSwitch = document.querySelector(".theme-switcher");
    const text = document.querySelectorAll(".text");
    const background = document.querySelector(".background");


    const enabledarkmode = () =>{
        background.classList.add("background-black");
        btnSwitch.classList.add("theme-btn-white");
        for(var i = 0; i < text.length; i++){
            text[i].classList.add("text-white");
        }

        localStorage.setItem("darkmode", "enabled")
    }

    const disabledarkmode = () =>{
        background.classList.remove("background-black");
        btnSwitch.classList.remove("theme-btn-white");
        for(var i = 0; i < text.length; i++){
            text[i].classList.remove("text-white");
        }

        localStorage.setItem("darkmode", null)
    }

    if(darkmode === "enabled"){
        enabledarkmode()
    }

    btnSwitch.addEventListener("click", () =>{
        darkmode = localStorage.getItem("darkmode");
        if(darkmode !== "enabled"){
            enabledarkmode();
        }
        else{
            disabledarkmode();
        }
    });
