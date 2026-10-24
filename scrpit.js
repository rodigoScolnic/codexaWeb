const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.toggle('open');

    navMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    hamburgerBtn.setAttribute('aria-expanded', isOpen);
});