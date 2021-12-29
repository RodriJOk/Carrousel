const fila = document.querySelector('.contenedor-carousel');
const slide = document.querySelector('.carousel');
const flechaIzquierda= document.getElementById('flecha-izquierda');
const flechaDerecha= document.getElementById('flecha-derecha');

let card = document.querySelectorAll('.card');
let ultimoElementoDeLasCards = card[card.length - 1];
let primerElementoDeLasCards = card[0];

let cantidadDesplazamientoEnCelusPequeño = 1;
let cantidadDesplazamientoEnCelusMediano = 1.5;
let cantidadDesplazamientoEnDesktop = 3;
let viewportWidth = window.innerWidth;

if(card.length < 4){
    console.log("No se puede desplazar");
    flechaIzquierda.style.display = "none";
    flechaDerecha.style.display = "none";    
}


flechaIzquierda.addEventListener("click", moverIzquierda);
flechaDerecha.addEventListener("click", moverDerecha);

function moverIzquierda() {
    let cantidadDesplazamiento = 0;
    if(viewportWidth > 800) {
        cantidadDesplazamiento = cantidadDesplazamientoEnDesktop;
    }else if(viewportWidth > 400 && viewportWidth < 799) {
        cantidadDesplazamiento = cantidadDesplazamientoEnCelusMediano;
    }else {
        cantidadDesplazamiento = cantidadDesplazamientoEnCelusPequeño;
    }
    for(let i = 0; i < cantidadDesplazamiento; i++) {
        slide.insertAdjacentElement('afterbegin', ultimoElementoDeLasCards);
        card = document.querySelectorAll('.card');
        primerElementoDeLasCards = card[0];
        ultimoElementoDeLasCards = card[card.length - 1];
    }
}

function moverDerecha() {
    let cantidadDesplazamiento = 0;
    if(viewportWidth > 800) {
        cantidadDesplazamiento = cantidadDesplazamientoEnDesktop;
    }else if(viewportWidth > 400 && viewportWidth < 799) {
        cantidadDesplazamiento = cantidadDesplazamientoEnCelusMediano;
    }else {
        cantidadDesplazamiento = cantidadDesplazamientoEnCelusPequeño;
    }
    for(let i = 0; i < cantidadDesplazamiento; i++) {
        slide.insertAdjacentElement('beforeend', primerElementoDeLasCards);
        card = document.querySelectorAll('.card');
        primerElementoDeLasCards = card[0];
        ultimoElementoDeLasCards = card[card.length - 1];
    }
}

//setInterval(moverDerecha, 20000);

//Codigo correspondiente al movimiento del carrousel

let isActive = false;
let startX; 
let scrollLeft;


const final = () => {
    isActive = false;
    slide.classList.remove('active');
}
const comienzo = (e) => {
    isActive = true;
    slide.classList.add('active');
    startX = e.pageX || e.touches[0].pageX - slide.offsetLeft;
    scrollLeft = slide.scrollLeft;	
}
const mover = (e) => {
    if(!isActive) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - slide.offsetLeft;
    const dist = (x - startX);
    slide.scrollLeft = scrollLeft - dist;
}

(() => {
    slide.addEventListener('mousedown', comienzo);
	slide.addEventListener('touchstart', comienzo);
    
	slide.addEventListener('mousemove', mover);
	slide.addEventListener('touchmove', mover);
    
	slide.addEventListener('mouseleave', final);
	slide.addEventListener('mouseup', final);
	slide.addEventListener('touchend', final);
})();