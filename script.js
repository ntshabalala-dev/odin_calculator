// const plus = document.querySelector('#plus')
// const clear = document.querySelector('#clear')
// const input = document.querySelector('input')

const buttons = document.querySelector('.buttons');
let count = 0;
buttons.addEventListener('click', function name(e) {

    switch (e.target.id) {
        case 'plus':
            localStorage.setItem('a', input.value.toString());
            localStorage.setItem('operator', 'plus');
            input.value = '';
            break;
        case 'equals':
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
});