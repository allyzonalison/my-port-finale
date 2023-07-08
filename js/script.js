'use strict';

//EXTRAS
const myName = document.querySelector('.my-name');
const helloThere = document.querySelector('.hello-there');

myName.addEventListener('mouseover', function(e) {

    if(e.target.classList.contains('my-name')) {
        e.target.classList.add('my-name-active');
    }
});

myName.addEventListener('mouseleave', function(e) {
    if(e.target.classList.contains('my-name')) {
        e.target.classList.remove('my-name-active');
        e.target.style.transition = 'all .5s';
    }
});

helloThere.addEventListener('mouseover', function(e) {

    if(e.target.classList.contains('hello-there')) {
        e.target.classList.add('hello-there-active');
    }
});

helloThere.addEventListener('mouseleave', function(e) {
    if(e.target.classList.contains('hello-there')) {
        e.target.classList.remove('hello-there-active');
        e.target.style.transition = 'all .5s';
    }
});

//emailing me (direct)
const emailIcon = document.querySelector('.email-icon');
const githubIconn = document.querySelector('.github-iconi');
const auburn = document.querySelector('.auburn');

emailIcon.addEventListener('click', function() {
    window.location.href = 'mailto:airaclaveria21@gmail.com';
    emailIcon.style.cursor = 'pointer';
});

githubIconn.addEventListener('click', function() {
    window.location.href = 'https://github.com/allyzonalison';
});

auburn.addEventListener('click', function() {
    window.location.href = 'https://auburndigitalservices.com/';
});


//NAV LISTS
const menus = document.querySelectorAll('.li-menu');
const mainNavContainer = document.querySelector('.main-nav-list');

mainNavContainer.addEventListener('mouseover', function(e) {

    menus.forEach(menu => menu.classList.remove('menu-active'));

    if(e.target.classList.contains('main-nav-list')) return;
    else {
        e.target.classList.add('menu-active');
        e.target.style.transition = 'all .3s';
    };
});



//SMOOTH SCROLLING
menus.forEach(menu => {
    const num = menu.dataset.val;
    
    menu.addEventListener('click', function() {
        const goHere = document.querySelector(`#section${num}`);
        goHere.scrollIntoView({behavior: 'smooth'});
    });
});


//SLIDER COMPONENT
const sliderContainer = document.querySelector('.sliders-container');
const sliders = document.querySelectorAll('.slider-img');
const btnLeft = document.querySelector('.slider-icon-left');
const btnRight = document.querySelector('.slider-icon-right');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxSlide = sliders.length;

const createDots = function() {
    sliders.forEach((_, i) => {
        dotContainer.insertAdjacentHTML('beforeend', 
        `<button class="dots__dot" data-slide="${i}"></button>`);
    });
};

const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(slide) {
    sliders.forEach((element, index) => {
        element.style.transform = `translateX(${100 * (index - slide)}%)`;
    });
};


const nextSlide = function() {
    if(curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    console.log(curSlide);

    goToSlide(curSlide);
    activateDot(curSlide);
};

const prevSlide = function() {
    if(curSlide === 0){
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
};

const init = function() {
    goToSlide(0);
    createDots();
    activateDot(0);
}
init()

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('dots__dot')) {
        const {slide} = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
});


//MINI BOX HOVERING EFFECT
const miniProjectsContainer = document.querySelector('.mini-projects-box');
const miniBoxes = document.querySelectorAll('.mini-box');

miniBoxes.forEach(box => box.classList.remove('mini-box-active'));

miniProjectsContainer.addEventListener('mouseover', function(e) {
    const hovered = e.target.closest('.mini-box');
    
    if(!hovered) return;

    miniBoxes.forEach(box => {
        box.classList.remove('mini-box-active');
    });

    hovered.classList.add('mini-box-active');
    hovered.style.transition = 'all .5s';
    hovered.style.cursor = 'pointer';
});

miniBoxes.forEach(box => box.addEventListener('mouseleave', function() {
    this.classList.remove('mini-box-active');
}))


//GOING TO A NEW TAB WHEN CLICKING A PROJECT mini box
miniBoxes.forEach(box => {
    box.setAttribute('target', '_blank');
});

const links = [
    'https://github.com/allyzonalison/market-allyzon',
    'https://github.com/allyzonalison/SSS-website',
    'https://github.com/allyzonalison/all-CSS-from-Scratch',
    'https://github.com/allyzonalison/all-vanilla-js',
    'https://auburndigitalservices.com/portfolio/',
    'https://github.com/allyzonalison/my-port-finale'
    ];

miniBoxes.forEach((box, index) => {
        box.addEventListener('click', function(e) {
            const clicked = e.target.closest('.mini-box');
            window.open(links[index], clicked.getAttribute('target'));
            console.log(e.target);
        });
});

//REVEALING SECTIONS ANIMATION EFFECT

//for about-sec reveal effect
const aboutSec = document.querySelector('.section-about-me');
aboutSec.classList.remove('section-hidden');

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.20,
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
});

//CLICKING FOR THE NAVIGATION MENU - MOBILE RESPONSIVE
const menuOutline = document.querySelector('.menu-outline');
const closeOutline = document.querySelector('.close-outline');
const mainHeader = document.querySelector('.header');

mainHeader.classList.remove('nav-open');

menuOutline.addEventListener('click', function() {
    mainHeader.classList.add('nav-open');
})

closeOutline.addEventListener('click', function() {
    mainHeader.classList.remove('nav-open');
})

menus.forEach(menu => {
    menu.addEventListener('click', function() {
        mainHeader.classList.remove('nav-open');
    });
})

