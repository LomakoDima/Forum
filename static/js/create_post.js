document.addEventListener('DOMContentLoaded', function() {
    const createPostBtn = document.getElementById('create-post-btn');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.querySelector('.close-modal');

    if (createPostBtn) {
        createPostBtn.addEventListener('click', function() {
            fetch('/create_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Для создания поста необходимо войти в систему');
                    document.querySelector('.login-form').style.display = 'block';
                } else {
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

    window.addEventListener('click', function(event) {
        if (event.target == postModal) {
            postModal.style.display = 'none';
        }
    });

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

    const postForm = document.querySelector('.post-form');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            postModal.style.display = 'none';
        });
    }
});