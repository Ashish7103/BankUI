'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector("#section--1");
const nav=document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

  btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////

//Button  Scrolling



btnScrollTo.addEventListener('click',function(e){
  const s1coords=section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(s1coords.left);
  console.log(s1coords.top);
  // console.log(window.pageXOffset());
  
  console.log(s1coords.top+window.pageYOffset);
  
  // give cordinate of learn more button relative to current viewport
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll X/Y',window.pageXOffset,window.pageYOffset);

  console.log('height/width viewport',
  document.documentElement.clientHeight,document.documentElement.clientWidth);

  // scrolling

  // window.scrollTo(
  //   s1coords.left+window.pageXOffset,s1coords.top+window.pageYOffset
  // )

  // window.scrollTo({
  //   left:s1coords.left+window.pageXOffset,
  //   top:s1coords.top+window.pageYOffset,
  //   behaviour:'smooth',
  // })


  //  not support in older browser
  section1.scrollIntoView({behaviour:'smooth'})
  
  
  
})

//Navigation 
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     // console.log('LINK');
//     // console.log(e.target);
//     // const id=e.target.getAttribute('href');
//     const id=this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// })

//  event delegation 
//  use to good performation of events
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links")
.addEventListener('click',function(e){
  e.preventDefault();
  console.log('ashish');
  console.log(e.target);

  //Maching strategy
  if(e.target.classList.contains('nav__link')){
console.log('ashish declare');
const id=e.target.getAttribute('href');
    
    // console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});


  }
  
  

})

//Tabbed component 


tabsContainer.addEventListener('click',function(e){
  // const clicked=e.target.parentElement;
  const clicked=e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard class
  if(!clicked)
return;

//  remove active class
tabs.forEach(t=>t.classList.remove('operations__tab--active'));
tabsContent.forEach(t=>t.classList.remove('operations__content--active'))

// active tab

clicked.classList.add('operations__tab--active')

// activation content area
console.log(clicked.dataset.tab);
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

//menu fade animation

const handleHover=function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el !==link) {
        el.style.opacity=this;
      }
    })
    logo.style.opacity=this;

    // console.log(link);
    // console.log(siblings);
  }
}

//note here addeventlister always take an function as an argument
// nav.addEventListener('mouseover',function(e){
//   handleHover(e,0.5)
  
// })
// nav.addEventListener('mouseout',function(e){
//   handleHover(e,1)
 
// })

//modified using bind and this method(bind create a copy of function and return a function)
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1))

// // sticky effect
// // give dynamic coordinate w.r.t to top of page at the instant
// const initialCords=section1.getBoundingClientRect();
// console.log(initialCords);

// window.addEventListener('scroll',function(e){
//   if(window.scrollY>initialCords.top){
//     nav.classList.add('sticky')}
//     else{
//       nav.classList.remove('sticky')
//     }

    
  
//   console.log(window.scrollY);
  
// })

// sticky navigation bar
const header=document.querySelector('.header');

//  dynamic calculation of height of nav bar for responsiveness
const navHeight=nav.getBoundingClientRect();
const stickyNav=function(entries,hea){
  const [entry]=entries;
  if(!entry.isIntersecting)
  nav.classList.add('sticky')
  else
  nav.classList.remove('sticky')
}

const headerObserber=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  // do not take rem or percentage value
  rootMargin:`-${navHeight.height}px`,
})
headerObserber.observe(header);


// Reveal section

const allSection=document.querySelectorAll('.section');

const revealSection=function(entries,observer){
  const [entry]=entries;
  // console.log(entry);
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden')

sectionObserver.unobserve(entry.target)
  

}
const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,

})

allSection.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})


//LAzy image loading
const imgTarget=document.querySelectorAll('img[data-src]');
const loading=function(entries,observer){
  const [entry]=entries;
  // console.log(entry);


  // Guard class
  if(!entry.isIntersecting) return;

  // replace image tag to date attribute(data-src)
  entry.target.src=entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })
  imgObserver.unobserve(entry.target);
  
}

const imgObserver=new IntersectionObserver(loading,{
  root:null,
  threshold:0,
})
imgTarget.forEach(img=>imgObserver.observe(img));

// slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();










/*
// /////////////////////////////////////
// to select all element of document
// to select head of document
// to select body of document
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header=document.querySelector(".header")
const allSection=document.querySelectorAll(".section")
console.log(allSection);

document.getElementById("section--1")

//  store value as HTMLCollection 
//  if any change in dom file it immideitely change in collection
const allButtons=document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//  creating and inserting element
const message=document.createElement('div');
message.classList.add('cookie-message');

// message.textContent='we use cookies to improved functionallity and analytics';

// to add a html code inside a newly generated tag 
message.innerHTML='we use cookies to improved functionallity and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//  use to add in html file in first and last child of
//  parent element respectivelly
// prepend first shibbling
//append last shibbling
//  bothare noth use same time in webpage like a man do not prest at two place at same time

header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));// to use append and prepent together


//  to add any tag before and after tag

// header.before(message);
// header.after(message);


//  deleating element
document.querySelector('.btn--close-cookie')
.addEventListener('click',function(){
  // message.remove();
  message.parentElement.removeChild(message);
})

// STYLE
//  change only in inline css

message.style.backgroundColor='#444';
message.style.width='120%'
console.log(message);
console.log(message.style.backgroundColor);
console.log(message.style.height);//cannot read a property write in external css only read property write in internal css

//  to read style write in external css
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// to change in height parse method is use 
//  style dimension 

console.log(message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+4+'px' );


//  cutome element in css means root elemt  
document.documentElement.style.setProperty('--color-primary','cyan');

// Attributes
const logo=document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt='Minimalist logo'

// not standard attribbute
console.log(logo.designer);

//  to access a non standattd value attribute

// getattribute and setattribute
console.log(logo.getAttribute('designer'));// to access value of an non standard or standard attribute

logo.setAttribute('comapany','Blanklist');// to add new attribule
console.log(logo);

console.log(logo.src);
console.log(logo.getAttribute('src'));// give reference to current file

const link=document.querySelector('.nav__link');
console.log(link.href);
console.log(link.getAttribute('href'));

//  data attribute
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c','d','e')
logo.classList.remove('c')
logo.classList.toggle('d');
logo.classList.contains('d');// return true false
console.log(logo.classList.contains('e'));

console.log(logo);


// do not use 
logo.className='Ashish'

*/
/*


const h1=document.querySelector('h1');

const alertH1=function(e){
  alert('addEventListner: Great! You are reading the heading:D')

  // h1.removeEventListener('mouseenter',alertH1);

};

h1.addEventListener('mouseenter',alertH1);

setTimeout(() => {
  h1.removeEventListener('mouseenter',alertH1);
  
}, 3000);

// h1.onmouseenter=function(e){
//   alert('addEventListner: Great! You are reading the heading:D')
// }
*/
/////////////////////////////////
/*
// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});


*/
/*
////////////////////////////////
// DOM TRANSVERSING
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('.header'));
console.log(h1.closest('h1'));

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/

//sticky Navigation: intersection observer API
// const obsCallback=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry);
    
//   })
// }
// const obsOption={
//   root:null,
//   threshold:[0,0.2]
// }
// const  observer= new IntersectionObserver(obsCallback,obsOption);

// observer.observe(section1);
/*
document.addEventListener('DOMContentLoaded',function(e){
  console.log('Html parsed and dom tree built!',e);

  
})
window.addEventListener('load',function(e){
  console.log('page fully loaded',e);
  
})
window.addEventListener('beforeunload',function(e){
e.preventDefault();
console.log(e);
e.returnValue=' ';

  
})

*/















