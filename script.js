let displayValue = '';

let buttons = document.querySelectorAll("button");

let display = document.getElementById('display');

let signChangeButton = document.getElementById('signChangeButton');

signChangeButton.addEventListener('click', function () {
    if (displayValue !== '') {
        console.log('working');
        let currentNumber = parseFloat(displayValue);
        displayValue = (currentNumber * -1).toString();
        display.innerText = displayValue;
    }
});

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        if (button.id !== 'equal-button' && button.id !== 'clear-button' && button.id !== 'signChangeButton') {
            let buttonText = this.textContent;
            displayValue += buttonText;
            display.innerText = displayValue;
        }
        else if (button.id === 'equal-button') {
            try {
                displayValue = evaluateExpression(displayValue);
                display.innerText = displayValue;
            }
            catch (error) {
                displayValue = '';
                display.innerText = 'Not a valid operation';
            }
        }
        else if (button.id === 'clear-button') {
            clearDisplay();
        }
    });
});

function evaluateExpression(expression) {
    const tokens = tokenizeInput(expression);
    console.log(tokens);
    //case of negative first number
    let result = '';
    let firstValueofI = 0;
    if (tokens[0] === '-') {
        result = 0 - parseFloat(tokens[1]);
        firstValueofI = 2;
    }
    else {
        console.log('positive first number');
        result = parseFloat(tokens[0]);
        firstValueofI = 1;
    }

    for (let i = firstValueofI; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);



        switch (operator) {
            case '+':
                result += nextNumber;
                break;

            case '-':
                result -= nextNumber;
                break;

            case '*':
                result *= nextNumber;
                break;

            case '/':
                if (nextNumber === 0) {
                    throw new Error('Division by zero')
                }
                result /= nextNumber;
                break;

            case '%':
                result = result * nextNumber / 100;
                break;

            default:
                throw new Error('Invalid operator');

        }
    }
    return result;
}
function tokenizeInput(input) {
    const regex = /(\d+(\.\d+)?|\+|\-|\*|\/|\%|\(|\))/g;
    return input.match(regex) || [];
}
function clearDisplay() {
    displayValue = '';
    display.innerText = 0;
}



