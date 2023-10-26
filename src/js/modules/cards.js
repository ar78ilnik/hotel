const cards = (imgBig, imgLittle) => {

    function tabImages(imgBig, imgLittle) {
        let imgMain = document.querySelector(imgBig),
            imgsCard = document.querySelectorAll(imgLittle);
        imgMain.addEventListener('click', function () {
            imgsCard.forEach(item => {
                console.log(item);
            });
        });
    }

    tabImages('.cards__img-main', '.card__imgs');
};

export default cards;
