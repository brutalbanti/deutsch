document.addEventListener('DOMContentLoaded', function () {
    const formConsultation = document.getElementById('consultation');
    const popUpConsultation = document.querySelector('.popup-consultation');
    const closeConsultationPopup = document.querySelectorAll('.popup-feedback__btn, .popup-feedback__close');
    const popUpSuccess = document.querySelector('.popup-feedback');
    const popupFeedback = document.querySelector('.popup-feedback');
    const formConsultationSignUp = document.getElementById('consultation-signup');
    const formConsultationFooter = document.getElementById('consultation-footer');
    const formEmailFooter = document.getElementById('form-footer-email');

    var openButtons = document.querySelectorAll('.header-btn, .header-section__btn, .methodology__btn, .courses-item__btn');
    var popupId = ''
    const chatId = "-1002081767263";
    const token = "7156040675:AAG271W9so-0pcnlE3ffZVMU8aJzRHrWtyU";

    openButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            popupId = this.getAttribute('data-popup');
        });
    });

    function openPopup(name) {
        switch (name) {
            case "consultation":
                popupFeedback.classList.add('active');
                document.body.style.overflow = 'hidden';
                popUpConsultation.classList.remove('active')
                break;
        }
    }
    closeConsultationPopup.forEach(btn => {
        btn.addEventListener('click', function () {
            popUpSuccess.classList.remove('active');
            document.body.style.overflow = 'visible';
        })
    })
    formConsultation.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formConsultation);

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Имя: ${formData.get('name')}\nТелефон: ${formData.get('phone')}\nКнопка: ${popupId}`
                })
            });
            formConsultation.reset();
            if (response.ok) {
                openPopup('consultation')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    formConsultationSignUp.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formConsultationSignUp);

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Телефон: ${formData.get('phone')}\nКнопка: Записаться. Фиксированный попап`
                })
            });
            formConsultationSignUp.reset();
            if (response.ok) {
                openPopup('consultation')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    formConsultationFooter.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formConsultationFooter);

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Телефон: ${formData.get('phone')}\nКнопка: Записаться. Футер.`
                })
            });
            formConsultationFooter.reset();
            if (response.ok) {
                openPopup('consultation')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    formEmailFooter.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formEmailFooter);

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Почта: ${formData.get('email')}\nКнопка: Записаться. Акции и Специальные Предложения. Футер`
                })
            });
            formEmailFooter.reset();
            if (response.ok) {
                openPopup('consultation')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
})