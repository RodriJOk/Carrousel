anchoContenedor = document.getElementById("container").clientWidth;
siguienteBoton = document.getElementById("next-button");
anteriorBoton = document.getElementById("previous-button");
slide = document.getElementById("slide");

margenIzquierdoCard = 10;
anchoTarjetayMargenDerecho = 120 + 10;
anchoTotal = slide.clientWidth;

const transformarSlide = (val) => {
  slide.style.transform = `translate(${val}px,0px)`;
};

const obtenerPosicionActual = () => {
  const stringValue = slide.style.transform;
  const transformValue = stringValue.substring(
    stringValue.indexOf("(") + 1,
    stringValue.lastIndexOf("p")
  );
  return transformValue ? parseInt(transformValue) : 0;
};

const obtenerSiguientePosicion = () => {
  const currentPosition = obtenerPosicionActual();
  const lastVisiblePixel = anchoContenedor + -1 * currentPosition;
  const lastFullyVisibleCard = Math.floor(
    (lastVisiblePixel - margenIzquierdoCard) / anchoTarjetayMargenDerecho
  );
  const distanceToNextCard =
    lastFullyVisibleCard * anchoTarjetayMargenDerecho + margenIzquierdoCard;
  if (distanceToNextCard + anchoContenedor > anchoTotal) {
    return anchoTotal - anchoContenedor + margenIzquierdoCard;
  }
  return distanceToNextCard - 10;
};

const obtenerPreviaPosicion = () => {
  const currentPosition = obtenerPosicionActual(); 
  const firstPartiallyVisibleCard = Math.floor(
    (-1 * currentPosition - margenIzquierdoCard) / anchoTarjetayMargenDerecho
  );
  const distanceToCardEndFromSlideStart = firstPartiallyVisibleCard * anchoTarjetayMargenDerecho + margenIzquierdoCard;
  const distanceNeeded = distanceToCardEndFromSlideStart - anchoContenedor;
  if (distanceNeeded > 0) {
    return -distanceNeeded;
  }
  return 0;
};

siguienteBoton.addEventListener("click", (event) => {
  transformarSlide(-obtenerSiguientePosicion());
});

anteriorBoton.addEventListener("click", (event) => {
  transformarSlide(obtenerPreviaPosicion());
});
