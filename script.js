// const plus = document.querySelector('#plus')
// const clear = document.querySelector('#clear')
const input = document.querySelector('input')

const rightPanel = document.querySelector('.right-panel');
const numbers = document.querySelector('.left-panel');
const allRightPanelNodes = document.querySelectorAll('.right-panel button')

function disableRightPanelNOdes(Nodes) {
    Nodes.forEach(Node => {
        Node.toggleAttribute('disabled');
    });
}

rightPanel.addEventListener('click', function name(e) {
    if (input.value !== "") {
        disableRightPanelNOdes(allRightPanelNodes);

        switch (e.target.id) {
            case 'add':
                localStorage.setItem('a', input.value.toString());
                localStorage.setItem('operator', 'plus');
                input.value = '';
                break;
            case 'equals':
                disableRightPanelNOdes();
                const a = localStorage.getItem('a'); //
                const operator = localStorage.getItem('operator'); //
                const b = input.value;

                console.log(a, b, operator);


                switch (operator) {
                    case 'plus':
                        console.log(+a + +b);
                        input.value = (+a + +b).toString();
                        localStorage.clear();
                        break;
                    default:
                        break;
                }

                break;
            case 'clear':
                // console.log('wtf');
                localStorage.clear();
                input.value = '';
                break;
            default:
                break;
        }
    }

});

numbers.addEventListener('click', (e) => {
    const target = e.target;
    if (target.id == 'number') {
        input.value += target.innerText;
        console.log(target.innerText);
    }
})