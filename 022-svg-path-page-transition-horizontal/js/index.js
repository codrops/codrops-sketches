// frame element
const frame = document.querySelector('.frame');

// overlay (SVG path element)
const overlayPath = document.querySelector('.overlay__path');

// paths
// edit here: https://yqnn.github.io/svg-path-editor/
const paths = {
    step1: {
        unfilled: 'M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z',
        inBetween: 'M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z',
        /*
        M 0 0 h 34 c 73 7 73 94 0 100 H 0 V 0 Z
        M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z
        M 0 0 h 34 c 112 44 -32 49 0 100 H 0 V 0 Z
        */
        filled: 'M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z',
    },
    step2: {
        filled: 'M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z',
        //inBetween: 'M 100 0 H 50 c 20 33 20 67 0 100 h 50 V 0 Z',
        inBetween: 'M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z',
        unfilled: 'M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z',
    }
};

// landing page/content element 
const landingEl = document.querySelector('.view--2');

// transition trigger button
const switchCtrl = document.querySelector('button.button--open');

// back button
const backCtrl = landingEl.querySelector('.button--close');

let isAnimating = false;

let page = 1;

const pageSwitchTimeline = gsap.timeline({
            paused: true,
            onComplete: () => isAnimating = false
        })
        .set(overlayPath, {
            attr: { d: paths.step1.unfilled }
        })
        .to(overlayPath, { 
            duration: 0.8,
            ease: 'power3.in',
            attr: { d: paths.step1.inBetween }
        }, 0)
        .to(overlayPath, { 
            duration: 0.2,
            ease: 'power1',
            attr: { d: paths.step1.filled },
            onComplete: () => switchPages()
        })

        .set(overlayPath, { 
            attr: { d: paths.step2.filled }
        })

        .to(overlayPath, { 
            duration: 0.15,
            ease: 'sine.in',
            attr: { d: paths.step2.inBetween }
        })
        .to(overlayPath, { 
            duration: 1,
            ease: 'power4',
            attr: { d: paths.step2.unfilled }
        });

const switchPages = () => {
    if ( page === 2 ) {
        frame.classList.add('frame--view-open');
        landingEl.classList.add('view--open');
    }
    else {
        frame.classList.remove('frame--view-open');
        landingEl.classList.remove('view--open');
    }
}

// reveals the second content view
const reveal = ()  => {
    
    if ( isAnimating ) return;
    isAnimating = true;

    page = 2;
    
    pageSwitchTimeline.play(0);
}

// back to first content view
const unreveal = ()  => {
    
    if ( isAnimating ) return;
    isAnimating = true;

    page = 1;
    
    pageSwitchTimeline.play(0);
}

// click on menu button
switchCtrl.addEventListener('click', reveal);
// click on close menu button
backCtrl.addEventListener('click', unreveal);