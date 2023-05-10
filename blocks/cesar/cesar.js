export default function decorate(block) {
  /* renderiza */
  const maindiv = document.createElement('div');
  [...block.children].forEach((row) => {
    const section = document.createElement('div');
    section.innerHTML = row.innerHTML;
    [...section.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'carousel-item ';
      else div.className = 'cards-card-body';
    });
    maindiv.append(section);
  });
  block.textContent = '';
  block.append(maindiv);

}