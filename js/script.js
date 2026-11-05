const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const aMenu = document.querySelectorAll(".option")

if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = hamburgerBtn.classList.toggle('open');

        navMenu.classList.toggle('open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
}

aMenu.forEach(e => {
    e.addEventListener('click', ()=>{
        navMenu.classList.remove('open')
        hamburgerBtn.classList.remove('open')

         document.body.classList.remove('menu-open')
    })
})

