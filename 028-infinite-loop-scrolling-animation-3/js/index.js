gsap.registerPlugin(ScrollTrigger);

// repeat first three items by cloning them and appending them to the .grid
const repeatItems = (parentEl, total = 0) => {
    const items = [...parentEl.children];
    for (let i = 0; i <= total-1; ++i) {
        var cln = items[i].cloneNode(true);
        parentEl.appendChild(cln);
    }
};

const lenis = new Lenis({
    smooth: true,
    infinite: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

imagesLoaded( document.querySelectorAll('.grid__item'), { background: true }, () => {
    document.body.classList.remove('loading');

    repeatItems(document.querySelector('.grid'), 3);

    // first three items
    [...document.querySelectorAll('.grid__item:nth-child(-n+3)')].forEach(el => {
        
        gsap.set(el, {transformOrigin: '50% 100%'})
        gsap.to(el, {
            ease: 'none',
            startAt: {scaleY: 1, scaleX: .8},
            scaleY: 0,
            scaleX: 1,
            scrollTrigger: {
                trigger: el,
                start: 'center center',
                end: 'bottom top+=1%',
                scrub: true,
                fastScrollEnd: true,
                onLeave: () => {
                    gsap.set(el, {scaleY: 1, scaleX: .8})
                }
            }
        });

    });

    // last three items
    [...document.querySelectorAll('.grid__item:nth-last-child(-n+3)')].forEach(el => {
        
        gsap.set(el, {transformOrigin: '50% 0%', scaleY: 0})
        gsap.to(el, {
            ease: 'none',
            startAt: {scaleY: 0, scaleX: 1},
            scaleY: 1,
            scaleX: .8,
            scrollTrigger: {
                trigger: el,
                start: 'top bottom+=1%',
                end: 'bottom top',
                scrub: true,
                fastScrollEnd: true,
                onLeaveBack: () => {
                    gsap.set(el, {scaleY: 1, scaleX: .8})
                }
            }
        });

    });
    
    // in between
    let ft;
    let st;
    [...document.querySelectorAll('.grid__item:nth-child(4), .grid__item:nth-child(5), .grid__item:nth-child(6)')].forEach(el => {
        
        ft = gsap.timeline()
        .to(el, {
            ease: 'none',
            onStart: () => {
                if (st) st.kill()
            },
            startAt: {scaleY: 0, scaleX: 1},
            scaleY: 1,
            scaleX: .8,
            scrollTrigger: {
                trigger: el,
                start: 'top bottom+=1%',
                end: 'center center',
                scrub: true,
                onEnter: () => gsap.set(el, {transformOrigin: '50% 0%'}),
                onEnterBack: () => gsap.set(el, {transformOrigin: '50% 0%'}),
                onLeave: () => gsap.set(el, {transformOrigin: '50% 100%'}),
                onLeaveBack: () => gsap.set(el, {transformOrigin: '50% 100%'}),
            },
        });

        st = gsap.timeline()
        .to(el, {
            ease: 'none',
            onStart: () => {
                if (ft) ft.kill()
            },
            startAt: {scaleY: 1, scaleX: .8},
            scaleY: 0,
            scaleX: 1,
            scrollTrigger: {
                trigger: el,
                start: 'center center',
                end: 'bottom top-=1%',
                scrub: true,
                onEnter: () => gsap.set(el, {transformOrigin: '50% 100%'}),
                onEnterBack: () => gsap.set(el, {transformOrigin: '50% 100%'}),
                onLeave: () => gsap.set(el, {transformOrigin: '50% 0%'}),
                onLeaveBack: () => gsap.set(el, {transformOrigin: '50% 0%'}),
            }
        });
        
    });
    
    requestAnimationFrame(raf);

    const refresh = () => {
        ScrollTrigger.clearScrollMemory();
        window.history.scrollRestoration = 'manual';
        ScrollTrigger.refresh(true);
    }

    refresh();
    window.addEventListener('resize', refresh);
});