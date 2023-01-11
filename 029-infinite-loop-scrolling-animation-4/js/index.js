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
        
        gsap.set(el.parentNode, {perspective: 1000});
        gsap.set(el, {transformOrigin: `0% 100%`})
        gsap.to(el, {
            ease: 'none',
            startAt: {scale: 1, rotationY: 0, rotationX: 0, filter: 'brightness(1)'},
            scale: 0,
            rotationY: 70,
            rotationX: 10,
            filter: 'brightness(3)',
            scrollTrigger: {
                trigger: el,
                start: "center center",
                end: "bottom top+=1%",
                scrub: true,
                fastScrollEnd: true,
                onLeave: () => {
                    gsap.set(el, {scale: 1, rotationY: 0, rotationX: 0, filter: 'brightness(1)'})
                },
            }
        });

    });

    // last three items
    [...document.querySelectorAll('.grid__item:nth-last-child(-n+3)')].forEach(el => {
        
        gsap.set(el.parentNode, {perspective: 1000});
        gsap.set(el, {transformOrigin: `100% 0%`, scale: 0})
        gsap.to(el, {
            ease: 'none',
            startAt: {scale: 0, rotationY: 70, rotationX: 10, filter: 'brightness(3)'},
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            filter: 'brightness(1)',
            scrollTrigger: {
                trigger: el,
                start: "top bottom+=1%",
                end: "bottom top",
                scrub: true,
                fastScrollEnd: true,
                onLeaveBack: () => {
                    gsap.set(el, {scale: 1, rotationY: 0, rotationX: 0, filter: 'brightness(1)'})
                }
            }
        });

    });

    // in between
    let ft;
    let st;
    [...document.querySelectorAll('.grid__item:nth-child(4), .grid__item:nth-child(5), .grid__item:nth-child(6)')].forEach(el => {
        
        gsap.set(el.parentNode, {perspective: 1000});

        ft = gsap.timeline()
        .to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top bottom+=1%',
                end: 'center center',
                scrub: true,
                onEnter: () => gsap.set(el, {transformOrigin: `100% 0%`}),
                onEnterBack: () => gsap.set(el, {transformOrigin: `100% 0%`}),
                onLeave: () => gsap.set(el, {transformOrigin: `0% 100%`}),
                onLeaveBack: () => gsap.set(el, {transformOrigin: `0% 100%`}),
            },
            onStart: () => {
                if (st) st.kill()
            },
            startAt: {scale: 0, rotationY: -70, rotationX: 10, filter: 'brightness(3)'},
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            filter: 'brightness(1)',
            ease: 'none'
        });

        st = gsap.timeline()
        .to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'center center',
                end: 'bottom top-=1%',
                scrub: true,
                onEnter: () => gsap.set(el, {transformOrigin: `0% 100%`}),
                onEnterBack: () => gsap.set(el, {transformOrigin: `0% 100%`}),
                onLeave: () => gsap.set(el, {transformOrigin: `100% 0%`}),
                onLeaveBack: () => gsap.set(el, {transformOrigin: `100% 0%`}),
            },
            onStart: () => {
                if (ft) ft.kill()
            },
            startAt: {scale: 1, rotationY: 0, rotationX: 0, filter: 'brightness(1)'},
            scale: 0,
            rotationY: 70,
            rotationX: 10,
            filter: 'brightness(3)',
            ease: 'none'
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