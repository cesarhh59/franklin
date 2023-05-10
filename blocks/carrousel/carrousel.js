import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

var carousel;
var carouselContainer;
var carouselItems;
var itemWidth;
var currentIndex;
var containerWidth;
var maxOffset;
const images = [];

export default function decorate(block) {
  /* renderiza */
  const maindiv = document.createElement('div');
  maindiv.className = 'carousel';
  const section = document.createElement('div');
  section.className = 'carousel-container';
  [...block.children].forEach((row) => {

    let hidesection = document.createElement('div');
    hidesection.innerHTML = row.innerHTML;
    [...hidesection.children].forEach((div) => {

      let img = document.createElement('img');
      img.setAttribute('src', div.querySelector('img').src)
      img.className = 'carousel-item';
      section.prepend(img);
    });
  });
  maindiv.append(section);
  //  Crear botones
  const btnPrev = document.createElement('button')
  btnPrev.className = 'carousel-prev';
  btnPrev.textContent = '<-';
  const btnNext = document.createElement('button')
  btnNext.className = 'carousel-next';
  btnNext.textContent = '->';

  btnPrev.addEventListener('click', prevItem);
  btnNext.addEventListener('click', nextItem);

  maindiv.append(btnPrev);
  maindiv.append(btnNext);
  // Logica carrousel
  block.textContent = '';
  block.append(maindiv);



  carousel = document.querySelector('.carousel');
  carouselContainer = carousel.querySelector('.carousel-container');
  carouselItems = carousel.querySelectorAll('.carousel-item');
  currentIndex = 0;
  itemWidth = carouselItems[0].offsetWidth;
  containerWidth = carouselContainer.offsetWidth;
  maxOffset = (carouselItems.length - 1) * itemWidth;


  // Preload images
  for (let i = 0; i < carouselItems.length; i++) {
    images[i] = new Image();
    images[i].src = carouselItems[i].src;
  }
  showItem(currentIndex);

}




function showItem(index) {
  carouselItems[currentIndex].classList.remove('active');
  carouselItems[index].classList.add('active');
  currentIndex = index;
}


// Función para retroceder un elemento en el carrusel
function prevItem() {

  showItem(Math.max(currentIndex - 1, 0));
}

// Función para avanzar un elemento en el carrusel
function nextItem() {
  showItem(Math.min(currentIndex + 1, carouselItems.length - 1));
}

