export const cards = () => {
    let imgMain = document.querySelector('.cards__img-main'),
        imgsCard = document.querySelectorAll('.card__imgs');
    imgMain.addEventListener('click', function () {
        imgsCard.forEach(item => {
            console.log(item);
        });
    });

}
