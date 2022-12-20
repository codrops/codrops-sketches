const body = document.body;

const selectInput = document.querySelector('#colorpicker');

const picker = document.querySelector('.picker');

const lines = {
    vertical: picker.querySelectorAll('.picker__item:nth-child(-n+16) i'),
    horizontal: picker.querySelectorAll('.picker__item:nth-child(16n+17) i')
};

const cells = picker.querySelectorAll('.picker__item-inner');

let tl;

const init = () => {

    gsap.set(lines.horizontal, {
        scaleX: 0,
        transformOrigin: '0% 50%'
    });
    gsap.set(lines.vertical, {
        scaleY: 0,
        transformOrigin: '50% 0%'
    });
    gsap.set(cells, {
        scale: 0
    });

    tl = gsap.timeline({
        paused: true,
        onStart: () => picker.classList.remove('hidden'),
        onReverseComplete: () => picker.classList.add('hidden'),
        defaults: {
            duration: 1.5,
            ease: 'power2.inOut'
        }
    })
    .addLabel('start', 'start')
    .to(cells, {
        duration: 2.8,
        ease: 'power4',
        scale: 1,
        stagger: { each: 0.08, grid: 'auto', from: 'random' }
    }, 'start')
    .addLabel('lines', 'start+=0.2')
    .to(lines.horizontal, {
        scaleX: 1,
        stagger: { each: 0.02, grid: 'auto', from: 'random' }
    }, 'lines')
    .to(lines.vertical, {
        scaleY: 1,
        stagger: { each: 0.02, grid: 'auto', from: 'random' }
    }, 'lines');

};

const openPicker = () => {

    body.classList.add('picker-visible');
    tl.timeScale(1).play();

};

const selectColor = cell => {
    
    selectInput.value = window.getComputedStyle(cell).backgroundImage;
    body.style.backgroundImage = selectInput.value;
    closePicker();

};

const closePicker = () => {

    body.classList.remove('picker-visible');
    tl.timeScale(3).reverse();

};

selectInput.addEventListener('click', openPicker);

cells.forEach(cell => {

    cell.addEventListener('click', () => {
        
        selectColor(cell);

    });

});

// Esc key
document.onkeydown = evt =>  {
    
    evt = evt || window.event;
    var isEscape = false;

    if ('key' in evt) {
        isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
    } else {
        isEscape = (evt.keyCode === 27);
    }
    
    if ( isEscape && body.classList.contains('picker-visible') ) {
        closePicker();
    }

};

init();