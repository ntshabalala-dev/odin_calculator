const input = document.querySelector('input');
input.focus()
const rightPanel = document.querySelector('.right-panel');
const leftPanel = document.querySelector('.left-panel');
const topPanel = document.querySelector('.top-panel');
const allRightPanelNodes = document.querySelectorAll('.right-panel button')
let clearInputOnNumberPress = false;
let appendNumbers = false;
let isCalculationDone = false;
let disableRightPanelBUttons = false;

topPanel.addEventListener('click', (e) => {
    const target = e.target;
    let inputValue = input.value;
    const operatorElement = document.getElementById(localStorage.getItem('operator'));
    document.querySelector('.fourth-row #number').disabled = false;

    switch (target.id) {
        case 'clear':
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
                        localStorage.clear();

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

    if (operator == 'subtract' && (
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
        // If any of the operator signs are clicked b4 equals, simulate equals
        if (operatorStorage && num !== "" && num !== localStorage.getItem('a')) {
            // Highlight new operator
            if (operatorElement && operatorElement.classList.contains('selected')) {
                operatorElement.classList.toggle('selected');
                document.getElementById(operator).classList.toggle('selected');
            }

            // Simulate the equals button
            input.value = equals(num);

            // Set new operator and continue with calculation
            localStorage.setItem('a', input.value);
            localStorage.setItem('operator', operator);

            // disable operators
        } else {
            if (num == "" || (!Number.isInteger(+num) && !isFloat(num))) {
                return;
            }

            if (operatorElement && operatorElement.classList.contains('selected')) {
                operatorElement.classList.toggle('selected');
                localStorage.removeItem('operator')
            }

            document.getElementById(operator).classList.toggle('selected');
            setOperandAndOperator(num, operator);
            //disableRightPanelBUttons = true;
        }

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
            } else {
                input.value += target.innerText;
                isCalculationDone = false
            }

            if (target.innerText == '.') {
                target.disabled = true;
            }

            // const operator = localStorage.getItem('operator');
            // console.log(operator);


            break;
        case 'equals':
            input.value = equals(input.value);
            input.focus();
            localStorage.clear();
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
    appendNumbers = false;
    clearInputOnNumberPress = true;
    isCalculationDone = true;

    document.querySelector('.fourth-row #number').disabled = false;

    const a = localStorage.getItem('a');
    const operator = localStorage.getItem('operator');
    const b = number;

    let result = null
    const operatorElement2 = document.getElementById(operator);

    if (operatorElement2.classList.contains('selected')) {
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

    // If operators disabled, enable

    console.log(result);
    return result;
}