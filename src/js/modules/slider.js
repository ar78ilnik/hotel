const slider = () => {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider__item'),
        prev = document.querySelector('.slider__prev'),
        next = document.querySelector('.slider__next'),
        sliderDots = document.querySelector('.slider__dots'),
        sliderDot = document.querySelectorAll('.slider__dot');

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        sliderDot.forEach((item) => item.classList.remove('slider__dot_active'));

        slides[slideIndex - 1].style.display = 'block';
        sliderDot[slideIndex - 1].classList.add('slider__dot_active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusSlides(1);
    });

    sliderDots.addEventListener('click', function (evt) {
        for (let i = 0; i < sliderDot.length + 1; i++) {
            if (evt.target.classList.contains('dot') && evt.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    showSlides(slideIndex);
}

export default slider;
