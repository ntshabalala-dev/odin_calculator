const input = document.querySelector('input');
input.focus()
const rightPanel = document.querySelector('.right-panel');
const leftPanel = document.querySelector('.left-panel');
const topPanel = document.querySelector('.top-panel');
const allRightPanelNodes = document.querySelectorAll('.right-panel button')
let clearInputOnNumberPress = false;
let appendNumbers = false;
let isCalculationDone = false;


function toggleRightPanelElements(Nodes) {
    Nodes.forEach(node => {
        node.toggleAttribute('disabled');
    });
}

topPanel.addEventListener('click', (e) => {
    const target = e.target;
    let inputValue = input.value;
    //console.log(inputValue);

    switch (target.id) {
        case 'clear':
            if (inputValue !== "") {
                //toggleRightPanelElements(allRightPanelNodes);
                input.value = '';
                input.focus()
                localStorage.clear();
                appendNumbers = false;
            }
            break
        case "backspace":
            if (inputValue !== "") {
                //toggleRightPanelElements(allRightPanelNodes);
                // const digits = inputValue;
                input.value = inputValue.slice(0, inputValue.length - 1);
            }
            break;
        default:
            break;
    }
})

function setOperandAndOperator(operand, operator) {
    if (!localStorage.getItem('a')) {
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


    } else {
        const number = input.value.toString();
        setOperandAndOperator(number, operator)
        if (input.value !== "") {
            //input.value = '';
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

            break;
        case 'equals':
            if (input.value == '' || !localStorage.getItem('a')) {
                return;
            }
            appendNumbers = false;
            clearInputOnNumberPress = true;
            isCalculationDone = true;

            let decimal = document.querySelector('.fourth-row #number');
            decimal.disabled = false;

            const a = localStorage.getItem('a'); //
            const operator = localStorage.getItem('operator'); //
            const b = input.value;
            let result = null

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

            console.log(result);


            input.value = result;
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
