export const menu = () => {
    const buttonMenu = document.querySelector('.button_menu'),
        mainMenu = document.querySelector('.main_menu');

    buttonMenu.addEventListener('click', () => {
        let expanded = buttonMenu.getAttribute('aria-expanded') === 'true' || false;
        buttonMenu.setAttribute('aria-expanded', !expanded);
        buttonMenu.classList.toggle('button_menu--open');
        mainMenu.classList.toggle('main_menu--open');
    });
}