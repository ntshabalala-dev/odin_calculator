const input = document.querySelector('input');
input.focus();
const rightPanel = document.querySelector('.right-panel');
const leftPanel = document.querySelector('.left-panel');
const topPanel = document.querySelector('.top-panel');
const allRightPanelNodes = document.querySelectorAll('.right-panel button');
let clearInputOnNumberPress = false;
let appendNumbers = false;
let isCalculationDone = false;
let disableRightPanelBUttons = false;
let c = 0;
let isOpertatorEquals = false;

topPanel.addEventListener('click', (e) => {
    const target = e.target;
    let inputValue = input.value;
    const operatorElement = document.getElementById(localStorage.getItem('operator'));
    document.querySelector('.fourth-row #number').disabled = false;

    // if calculation is done ,the local storage is cleared/ we need the selected operator before clearing.
    if (isCalculationDone) {
        const selected = document.querySelector('.selected')
        if (selected) {
            selected.classList.toggle('selected');
        }
    }

    switch (target.id) {
        case 'clear':
            c = 0;
            console.log(c);

            if (operatorElement) {
                if (operatorElement.classList.contains('selected')) {
                    operatorElement.classList.toggle('selected');
                }
            }

            if (inputValue !== "") {
                input.value = '';
                appendNumbers = false;
            }

            input.focus()
            localStorage.clear();
            isOpertatorEquals = false;
            // If operators disabled, enable
            break
        case "backspace":
            if (inputValue !== "") {
                if (operatorElement && operatorElement.classList.contains('selected')) {
                    operatorElement.classList.toggle('selected');
                    localStorage.removeItem('operator')
                } else {
                    // If all digits have been cleared from the screen, clear local storage and enable the decimal bujtton
                    input.value = inputValue.slice(0, inputValue.length - 1);
                    if (input.value == '') {
                        input.focus()
                        isOpertatorEquals = false;
                        c = 0;
                        localStorage.clear()
                        document.querySelector('.fourth-row #number').disabled = false;
                        // If operators disabled, enable
                    }
                }
            }
            break;
        default:
            break;
    }
})

function setOperandAndOperator(operand, operator) {

    if (!localStorage.getItem('a')) {
        // Set operator and operand if operand a is not set
        localStorage.setItem('a', operand);
        localStorage.setItem('operator', operator);
    } else {
        const oldValue = localStorage.getItem('a')
        localStorage.clear()
        localStorage.setItem('a', oldValue);
        localStorage.setItem('operator', operator);
    }
}

rightPanel.addEventListener('click', function name(e) {
    const operator = e.target.id
    const operatorStorage = localStorage.getItem('operator');
    const num = input.value;
    const operatorElement = document.getElementById(operatorStorage);
    const issetOperandAndOperatorSet = operatorStorage && localStorage.getItem('a')

    console.log(c, '????');

    // If any of the operator signs are clicked b4 equals, simulate equals
    if (c >= 2 && issetOperandAndOperatorSet) {
        isOpertatorEquals = true;

        // Highlight new operator
        if (operator !== operatorStorage && operatorElement && operatorElement.classList.contains('selected')) {
            operatorElement.classList.toggle('selected');
            document.getElementById(operator).classList.toggle('selected');
        }

        if (operator !== operatorStorage) {
            c = 1;
            // Set new operator and continue with calculation
            input.value = equals(num);
            localStorage.setItem('operator', operator);
            localStorage.setItem('a', input.value);

        } else {
            // Simulate the equals button
            input.value = equals(num);
            localStorage.setItem('a', input.value);
        }
        return;
    }

    // make sure all operators are selectable / changeable
    //console.log(isOpertatorEquals)
    if (
        operator == 'subtract' &&
        (
            localStorage.getItem('operator') == 'subtract' ||
            (!localStorage.getItem('a') && input.value == '') ||
            localStorage.getItem('operator') ||
            (isCalculationDone && localStorage.getItem('a'))
        )
    ) {
        input.value = '-'
        clearInputOnNumberPress = false;
        appendNumbers = localStorage.getItem('operator') ? true : false;
        const operatorElement = document.getElementById(operator);
        if (operatorElement.classList.contains('selected')) {
            operatorElement.classList.toggle('selected');
        }
    } else {
        if (num == '-' || num == "" || (!Number.isInteger(+num) && !isFloat(num))) {
            input.focus();
            return;
        }
        c++;
        if (operatorElement && operatorElement.classList.contains('selected')) {
            operatorElement.classList.toggle('selected');
            localStorage.removeItem('operator')
        }

        document.getElementById(operator).classList.toggle('selected');
        setOperandAndOperator(num, operator);

        document.querySelector('.fourth-row #number').disabled = false;
    }
});

leftPanel.addEventListener('click', (e) => {
    const target = e.target;

    switch (target.id) {
        case 'number':

            if (clearInputOnNumberPress) {
                input.value = '';
                clearInputOnNumberPress = false
            }

            if (localStorage.getItem('a')) {
                if (!appendNumbers) {
                    input.value = '';
                }
                input.value += target.innerText
                appendNumbers = true
                c++;
                console.log(c);
            } else {
                input.value += target.innerText;
                isOpertatorEquals = false;
                isCalculationDone = false;
            }

            if (target.innerText == '.') {
                target.disabled = true;
            } else {
                //c++;
            }

            break;
        case 'equals':
            input.value = equals(input.value);
            input.focus();
            if (isCalculationDone) {
                const selected = document.querySelector('.selected');
                if (selected && selected.classList.contains('selected')) {
                    selected.classList.toggle('selected');
                }
            }
            localStorage.clear();
            isOpertatorEquals = false;
            c = 0;

            break
        default:
            break;
    }
})


window.addEventListener('unload', function () {
    // Clear local storage when the page is closed or refreshed
    localStorage.clear();
});

function isFloat(value) {
    const floatVal = parseFloat(value)
    return typeof floatVal === 'number' && !Number.isInteger(floatVal);
}

function equals(number) {
    if (number == '' || !localStorage.getItem('a')) {
        return '';
    }

    console.log('HELLO');
    appendNumbers = false;
    clearInputOnNumberPress = true;
    isCalculationDone = true;

    document.querySelector('.fourth-row #number').disabled = false;

    const a = localStorage.getItem('a');
    const operator = localStorage.getItem('operator');
    const b = number;
    const operatorElement2 = document.getElementById(operator);
    let result = null

    if (operatorElement2.classList.contains('selected') && !isOpertatorEquals) {
        operatorElement2.classList.toggle('selected');
    }

    switch (operator) {
        case 'add':
            result = (+a + +b).toString();
            break;
        case 'subtract':
            result = (+a - +b).toString();
            break;
        case 'multiply':
            result = (+a * +b).toString();
            break;
        case 'divide':
            result = (+a / +b).toString();
            break;
        default:
            break;
    }

    if (result == 'Infinity') {
        return 'Complex ∞'
    } else if (result == 'NaN') {
        return 'Error'
    }

    // If operators disabled, enable
    console.log(isFloat(result));
    return isFloat(result) ? Number.parseFloat(result).toFixed(1) : result;
    //return cake;
}