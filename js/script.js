document.addEventListener('DOMContentLoaded', function () {
    var burgerMenu = document.getElementById('burger-menu');
    var closeMenu = document.getElementById('close-nav');
    var navMenu = document.querySelector('.header__nav');
    const headerLinks = document.querySelectorAll('.header__item a');
    const footerLinks = document.querySelectorAll('.footer-information__link');
    const openConsultationBtn = document.querySelectorAll('.header-btn, .methodology__btn, .header-section__btn, .courses-item__btn');
    const popupConsultation = document.querySelector('.popup-consultation');
    const closeConsultationBtn = document.querySelectorAll('.popup-consultation__close');
    const targetElement = document.querySelector('#method');
    const closeConsultationFixedBtn = document.querySelector('.consultation-fixed__close');
    const popupConsultationFixed = document.querySelector('.popup-consultation-fixed');
    const footerRoot = document.querySelector('.footer-root');
    const currentLocale = window.location.pathname.split('/')[1];

    // Находим ссылки выбора языка на странице
    const langLinks = document.querySelectorAll('.header-lang__link');

    // Устанавливаем класс "active" для ссылки, соответствующей текущей локали
    langLinks.forEach(link => {
        if (link.id.toLowerCase() === currentLocale) {
            link.classList.add('active');
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showPopup();
            }
        });
    });

    observer.observe(targetElement);
    closeConsultationFixedBtn.addEventListener('click', function () {
        popupConsultationFixed.classList.remove('active');
        footerRoot.classList.remove('popup')
        observer.disconnect();
    })
    function showPopup() {
        popupConsultationFixed.classList.add('active');
        footerRoot.classList.add('popup')
    }

    const scrollToElement = function (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    headerLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                event.preventDefault();
                scrollToElement(href);
                navMenu.classList.toggle('active');
                document.body.style.overflow = 'visible';

            }
        });
    });


    footerLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToElement(targetId);
        });
    });
    burgerMenu.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        document.body.style.overflow = 'hidden';
    });
    closeMenu.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        document.body.style.overflow = 'visible';
    });

    openConsultationBtn.forEach(btn => {
        btn.addEventListener('click', function () {
            popupConsultation.classList.add('active');
            document.body.style.overflow = 'hidden';
        })
    })
    closeConsultationBtn.forEach(btn => {
        btn.addEventListener('click', function () {
            popupConsultation.classList.remove('active');
            document.body.style.overflow = 'visible';
        })
    })

    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        speed: 600,
        spaceBetween: 42,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 320px
            1245: {
                slidesPerView: 2,
            },
        }
    });


    const quizInputs = document.querySelectorAll('.popup-quiz__input');
    const openQuizBtn = document.querySelector('.proficiency-btn');
    const closeQuizBtn = document.querySelector('.popup-quiz__close');
    const closeResultBtn = document.querySelector('.popup-result__btn');
    const closeResultBtnSecond = document.querySelector('.popup-result__close');
    const popupQuiz = document.querySelector('.popup-quiz');
    const popupResult = document.querySelector('.popup__result');
    const popupResultLevel = popupResult.querySelector('.popup-result__level');

    const answers = {};
    const correctAnswers = {
        1: 'B',
        2: 'C',
        3: 'C',
        4: 'B',
        5: 'A',
        6: 'B',
        7: 'A',
        8: 'C',
        9: 'C',
        10: 'A'
    };
    let currentQuestionIndex = 0;
    openQuizBtn.addEventListener('click', function () {
        popupQuiz.classList.add('active');
        document.body.style.overflow = 'hidden';
    })
    closeQuizBtn.addEventListener('click', function () {
        popupQuiz.classList.remove('active');
        document.body.style.overflow = 'visible';
    })
    closeResultBtn.addEventListener('click', function () {
        popupResult.classList.remove('active');
        document.body.style.overflow = 'visible';
    })
    closeResultBtnSecond.addEventListener('click', function () {
        popupResult.classList.remove('active');
        document.body.style.overflow = 'visible';
    })
    function showQuestion(index) {
        const quizQuestions = document.querySelectorAll('.quiz__question');
        quizQuestions.forEach((question, i) => {
            if (i === index) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });

        // Обновите код управления кнопками
        if (index + 1 === 10) {
            document.querySelector('.popup-quiz__button-next').classList.add('hidden');
            document.querySelector('.popup-quiz__button-finish').classList.add('active'); // измените с hidden на active
        } else {
            document.querySelector('.popup-quiz__button-next').classList.remove('hidden');
            document.querySelector('.popup-quiz__button-finish').classList.remove('active');
        }
    }



    function updateCounter() {
        const questionCounter = document.getElementById('count-question');
        questionCounter.textContent = currentQuestionIndex + 1; // Оновлюємо значення каунтера
    }

    function checkAllQuestionsAnswered() {
        for (let i = 1; i <= 9; i++) {
            if (!answers[`${i}`]) {
                return false;
            }
        }
        return true;
    }

    function checkAnswers() {
        const currentQuestionInputs = document.querySelectorAll(`input[name="${currentQuestionIndex + 1}"]:checked`);
        if (currentQuestionInputs.length === 0) {
            document.querySelector('.popup-quiz__error').classList.add('active');
            return false;
        }

        const answer = currentQuestionInputs[0].value;
        answers[`${currentQuestionIndex + 1}`] = answer;

        console.log('Вибрані відповіді:', answers);
        document.querySelector('.popup-quiz__error').classList.remove('active');
        if (currentQuestionIndex + 1 === 9) {
            const allQuestionsAnswered = checkAllQuestionsAnswered();
            if (allQuestionsAnswered) {
                document.querySelector('.popup-quiz__button-finish').classList.add('active');
                document.querySelector('.popup-quiz__button-next').classList.add('hidden');
            } else {
                document.querySelector('.popup-quiz__button-finish').classList.remove('active');
                document.querySelector('.popup-quiz__button-next').classList.remove('hidden');
            }
        }
        return true;
    }


    document.querySelector('.popup-quiz__button-next').addEventListener('click', function () {
        if (checkAnswers()) {
            currentQuestionIndex++;
            updateCounter(); // Оновлення значення каунтера
            showQuestion(currentQuestionIndex);
        }
    });
    document.querySelector('.popup-quiz__button-prev').addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateCounter();
            showQuestion(currentQuestionIndex);
            checkAnswers(); // Добавьте вызов checkAnswers()
            if (currentQuestionIndex < 10) {
                document.querySelector('.popup-quiz__button-next').classList.remove('hidden');
                document.querySelector('.popup-quiz__button-finish').classList.remove('active');
            } else {
                document.querySelector('.popup-quiz__button-next').classList.add('hidden');
            }
        }
    });

    function evaluateResults() {
        let correctAnswersCount = 0;
        for (const questionNumber in answers) {
            const correctAnswer = correctAnswers[questionNumber];
            if (answers[questionNumber] === correctAnswer) {
                correctAnswersCount++;
            }
        }

        let resultLevel = "";
        if (correctAnswersCount >= 9) {
            resultLevel = "B1";
        } else if (correctAnswersCount >= 4) {
            resultLevel = "A2";
        } else if (correctAnswersCount >= 1) {
            resultLevel = "A1";
        } else {
            resultLevel = "A1";
        }
        popupResultLevel.textContent = resultLevel;
        popupQuiz.classList.remove('active')
        popupResult.classList.add('active');
        console.log(`Correct Answers Count: ${correctAnswersCount}`);
        console.log(`Result Level: ${resultLevel}`);
    }

    document.querySelector('.popup-quiz__button-finish').addEventListener('click', function () {
        if (checkAnswers()) {
            evaluateResults();
        }
    });

    showQuestion(currentQuestionIndex); // Показувати перше питання
    updateCounter(); // Оновлення значення каунтера


});
