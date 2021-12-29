let sliderwrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');
let clonesWidth;
let sliderWidth;

let clones = [];
let disableScroll = false;

let scrollPos; 

let items = [...document.querySelectorAll('.slider-item')];

console.log(items);

let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, idx)=>{
    console.log("Soy idx" + idx);
    image.style.backgroundImage = `url(../imagenes/imagen${idx + 1}.jpg)`;
});

items.forEach(item =>{
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);
});

function getClonesWidth(){
    let width = 0;
    clones.forEach(clone =>{
        width += clone.offsetWidth;
    });
    return width;
}

function getScrollPos(){
    return window.scrollY;
}

function setScrollPos(pos){
    window.scrollTo({top: pos});
}

function scrollUpdate(){
    if(window.innerWidth > 760){
        console.log("Estoy dentro de scrollUpdate");
        sliderwrap.style.overflow = 'hidden';
        scrollPos = getScrollPos();
        if(clonesWidth + scrollPos >= sliderWidth){
            window.scrollTo({top: 1});
        }else if(scrollPos <= 0){
            window.scrollTo({top: sliderWidth - clonesWidth - 1});
        }
        slider.style.transform = `translateX(${-window.scrollY}px)`;
    
        requestAnimationFrame(scrollUpdate);
    }else{
        sliderwrap.style.overflow = "scroll";
    }
}

window.addEventListener('resize', onLoad);

function onLoad(){
    caluclateDimensions();
    document.body.style.height = `${sliderWidth}px`;
    window.scrollTo({top: 1});
    scrollUpdate();
}

function caluclateDimensions(){
    sliderWidth = slider.getBoundingClientRect().width;
    clonesWidth = getClonesWidth();
}

onLoad();