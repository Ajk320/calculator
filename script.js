let displayValue = '';

let buttons = document.querySelectorAll("button");

let display = document.getElementById('display');

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        if (button.id !== 'equal-button' && button.id !== 'clear-button') {
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
            console.log('clear button press');
            clearDisplay();
        }
    });
});

function evaluateExpression(expression) {
    const tokens = tokenizeInput(expression);

    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
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

            default:
                throw new Error('Invalid operator');

        }
    }
    return result;
}
function tokenizeInput(input) {
    const regex = /(\d+(\.\d+)?|\+|\-|\*|\/|\(|\))/g;
    return input.match(regex) || [];
}
function clearDisplay() {
    displayValue = '';
    display.innerText = '';
}



