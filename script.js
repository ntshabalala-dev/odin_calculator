const input = document.querySelector('input')
const rightPanel = document.querySelector('.right-panel');
const leftPanel = document.querySelector('.left-panel');
const allRightPanelNodes = document.querySelectorAll('.right-panel button')
let clearInputOnNumberPress = false;

function toggleRightPanelElements(Nodes) {
    Nodes.forEach(Element => {
        Element.toggleAttribute('disabled');
    });
}

function setOperandAndOperator(operand, operator) {
    localStorage.setItem('a', operand);
    localStorage.setItem('operator', operator);
}

rightPanel.addEventListener('click', function name(e) {
    if (input.value !== "") {
        toggleRightPanelElements(allRightPanelNodes);
        const operator = e.target.id
        switch (operator) {
            case 'clear':
                localStorage.clear();
                input.value = '';
                break;
            default:
                setOperandAndOperator(input.value.toString(), operator)
                input.value = '';
                break;
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
            input.value += target.innerText;
            break;
        case 'equals':
            clearInputOnNumberPress = true
            toggleRightPanelElements(allRightPanelNodes);
            const a = localStorage.getItem('a'); //
            const operator = localStorage.getItem('operator'); //
            const b = input.value;

            //console.log(a, b, operator);

            switch (operator) {
                case 'add':
                    input.value = (+a + +b).toString();
                    break;
                case 'subtract':
                    input.value = (+a - +b).toString();
                    break;
                case 'multiply':
                    input.value = (+a * +b).toString();
                    break;
                case 'divide':
                    input.value = (+a / +b).toString();

                    break;
                default:
                    break;
            }
            input.focus();
            localStorage.clear();

            break
        case 'clear':
            input.value = '';
            localStorage.clear();
            break
        default:
            break;
    }
})