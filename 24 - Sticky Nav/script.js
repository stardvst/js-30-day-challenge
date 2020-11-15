const nav = document.querySelector('nav');
const navTop = nav.offsetTop;

window.addEventListener('scroll', () => {
  if (window.scrollY >= navTop) {
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
});
