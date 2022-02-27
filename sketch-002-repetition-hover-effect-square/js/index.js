/**
 * Class representing an image that has the repetitive hover effect 
 */
class ImageHover {
    // DOM elements
    DOM = {
        // main element (.image)
        el: null,
        // .image__element
        innerElems: null,
    }
    // Main element background image path
    bgImage;
    // Options that can be passed in data attributes. These are the defaults:
    // Duration
    duration = 0.5;
    // Easing function
    ease = 'power2.inOut';
    // Stagger value between inner image elements
    stagger = 0;
    // Scale interval between inner image elements
    scaleInterval = 0.1;
    // Rotation interval between inner image elements
    rotationInterval = 0;
    // Total number of inner image elements
    innerTotal = 4;
    // Main element transform origin
    transformOrigin = '50% 50%';
    // GSAP hover timeline
    hoverTimeline;

    /**
     * Constructor.
     * @param {Element} DOM_el - the .image element
     */
    constructor(DOM_el) {
        // Main element
        this.DOM = {el: DOM_el};

        // Options that can be passed in data attributes
        this.duration = this.DOM.el.dataset.repetitionDuration || this.duration;
        this.ease = this.DOM.el.dataset.repetitionEase || this.ease;
        this.stagger = this.DOM.el.dataset.repetitionStagger || this.stagger;
        this.scaleInterval = this.DOM.el.dataset.repetitionScaleInterval || this.scaleInterval;
        this.rotationInterval = this.DOM.el.dataset.repetitionRotationInterval || this.rotationInterval;
        this.innerTotal = this.DOM.el.dataset.repetitionCount || this.innerTotal;
        this.transformOrigin = this.DOM.el.dataset.repetitionOrigin || this.transformOrigin;
        
        // Get the main element's background image url 
        this.bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(this.DOM.el.style.backgroundImage)[1]
        
        // Remove the background image from the main element
        // The dynamically created inner elements will have that background image
        gsap.set(this.DOM.el, {backgroundImage: 'none'});

        // Add the .image__element inner elements (data-repetition-elems times)
        // Condition: minimum of 2 inner elments
        this.innerTotal = this.innerTotal <= 1 ? 2 : this.innerTotal;
        
        let innerHTML = '';
        for (let i = 0, len = this.innerTotal; i <= len - 1; ++i) {
            innerHTML += `<div class="image__element" style="background-image:url(${this.bgImage})"></div>`;
        }

        // Append to the main element
        this.DOM.el.innerHTML = innerHTML;

        // Get inner .image__element
        this.DOM.innerElems = this.DOM.el.querySelectorAll('.image__element');

        // Set transform origin
        gsap.set(this.DOM.el, {transformOrigin: this.transformOrigin});
        
        // Hover timeline
        this.createHoverTimeline();

        // Init the hover events
        this.initEvents();
    }

    /**
     * Create the gsap timeline for the hover in/out animation
     */
    createHoverTimeline() {
        // Get the scale value based on the scale interval passed in data-repetition-scale-interval
        // e.g. if the scale interval is 0.1 then the inner elements will have the following scale values:
        // first element: 1; second: 0.9, third: 0.8 ...
        // If the value goes below 0 (too many inner elements) then the scale value defaults to 0
        const getScaleValue = i => {
            let scaleValue = 1 - this.scaleInterval * i;
            return scaleValue >= 0 ? scaleValue : 0;
        };

        const getRotationValue = i => i ? i*this.rotationInterval : 0;
        
        // Create the gsap timeline
        this.hoverTimeline = gsap.timeline({paused: true})
        .to(this.DOM.innerElems, {
            scale: i => getScaleValue(i),
            rotation: i => getRotationValue(i),
            duration: this.duration,
            ease: this.ease,
            stagger: this.stagger
        });
    }

    /**
     * Initializes the events on the image elemment
     */
    initEvents() {
        this.onMouseEnterFn = () => this.mouseEnter();
        this.onMouseLeaveFn = () => this.mouseLeave();
        this.DOM.el.addEventListener('mouseenter', this.onMouseEnterFn);
        this.DOM.el.addEventListener('mouseleave', this.onMouseLeaveFn);
    }

    /**
     * mouse enter
     */
    mouseEnter() {
        // Play the hover timeline
        this.hoverTimeline.play();
    }

    /**
     * mouse leave
     */
    mouseLeave() {
        // Reverse the hover timeline 
        this.hoverTimeline.reverse();
    }
}

// The image element
const theImage = document.querySelector('.image');
new ImageHover(theImage);

