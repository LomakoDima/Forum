document.addEventListener('DOMContentLoaded', function() {
    // Обработка кнопки создания поста
    const createPostBtn = document.getElementById('create-post-btn');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.querySelector('.close-modal');

    if (createPostBtn) {
        createPostBtn.addEventListener('click', function() {
            // Проверяем, авторизован ли пользователь
            fetch('/create_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    // Если пользователь не авторизован, показываем сообщение
                    alert('Для создания поста необходимо войти в систему');
                    // Открываем форму входа
                    document.querySelector('.login-form').style.display = 'block';
                } else {
                    // Если пользователь авторизован, открываем модальное окно создания поста
                    postModal.style.display = 'block';
                }
            });
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            postModal.style.display = 'none';
        });
    }

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target == postModal) {
            postModal.style.display = 'none';
        }
    });

    // Обработка форм входа и регистрации
    const loginButton = document.getElementById('login-button');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const registerLink = document.getElementById('register-link');
    const loginCloseBtns = document.querySelectorAll('.close-btn');

    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    loginCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
        });
    });

    // Обработка формы создания поста
    const postForm = document.querySelector('.post-form');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь будет логика отправки формы
            postModal.style.display = 'none';
        });
    }
});