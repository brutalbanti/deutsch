document.addEventListener('DOMContentLoaded', function () {
    var burgerMenu = document.getElementById('burger-menu');
    var closeMenu = document.getElementById('close-nav');
    var navMenu = document.querySelector('.header__nav');
    
    burgerMenu.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        document.body.style.overflow = 'hidden';
    });
    closeMenu.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        document.body.style.overflow = 'visible';
    });
})

