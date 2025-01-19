const input = document.querySelector('input');
input.focus()
const rightPanel = document.querySelector('.right-panel');
const leftPanel = document.querySelector('.left-panel');
const allRightPanelNodes = document.querySelectorAll('.right-panel button')
let clearInputOnNumberPress = false;


function toggleRightPanelElements(Nodes) {
    Nodes.forEach(node => {
        node.toggleAttribute('disabled');
    });
}

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
    if (operator == 'subtract' && input.value == "") {
        input.value = '-'
        clearInputOnNumberPress = false
    } else {
        const number = input.value.toString();
        setOperandAndOperator(number, operator)
        if (input.value !== "") {
            input.value = '';
        }
    }
});

leftPanel.addEventListener('click', (e) => {
    const target = e.target;

    switch (target.id) {
        case 'number':
            // -6 & clearInputOnNumberPress = true

            if (clearInputOnNumberPress) {
                input.value = '';
                clearInputOnNumberPress = false
            }
            const v = input.value + target.innerText;
            input.value = v;
            break;
        case 'equals':
            clearInputOnNumberPress = true
            // toggleRightPanelElements(allRightPanelNodes);
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
        case 'clear':
            if (input.value !== "") {
                //toggleRightPanelElements(allRightPanelNodes);
                input.value = '';
                input.focus()
                localStorage.clear();
            }
            break
        default:
            break;
    }
})


window.addEventListener('unload', function () {
    // Clear local storage when the page is closed or refreshed
    localStorage.clear();
});
