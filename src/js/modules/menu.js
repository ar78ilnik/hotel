export const menu = () => {
    const buttonMenu = document.querySelector('.button_menu'),
        menu = document.querySelector('.menu');

    buttonMenu.addEventListener('click', () => {
        let expanded = buttonMenu.getAttribute('aria-expanded') === 'true' || false;
        buttonMenu.setAttribute('aria-expanded', !expanded);
        buttonMenu.classList.toggle('button_menu--open');
        menu.classList.toggle('menu_open');
    });
}
