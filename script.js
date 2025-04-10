document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    const form = document.querySelector(".form");
    const overlay = document.createElement("div");
    const closeButtons = document.querySelectorAll(".close-btn"); // Получаем крестик из HTML
    const registerLink = document.getElementById("register-link"); // "Зарегистрируйтесь" в форме входа
    const signinLink = document.querySelector(".signin a"); // "Войдите" в форме регистрации
    const loginForm = document.querySelector(".login-form"); // Форма входа
    const registerForm = document.querySelector(".register-form"); // Форма регистрации

    if (!loginForm || !registerForm) {
        console.error("Ошибка: формы входа или регистрации не найдены!");
        return;
    }

    // Создаем затемненный фон
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "none";
    overlay.style.zIndex = "999";
    document.body.appendChild(overlay);

    // Изначально скрываем форму
    form.style.display = "none";
    loginForm.style.display = "none";
    registerForm.style.display = "none";

    function openForm(formToOpen) {
        registerForm.style.display = "none";
        loginForm.style.display = "none";
        formToOpen.style.display = "flex";
        overlay.style.display = "block";

        // Блокируем прокрутку страницы
        document.body.style.overflow = "hidden";

        formToOpen.style.position = "fixed";
        formToOpen.style.top = "50%";
        formToOpen.style.left = "50%";
        formToOpen.style.transform = "translate(-50%, -50%)";
        formToOpen.style.zIndex = "1000";
        formToOpen.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        formToOpen.style.background = "#fff";
    }

    function closeForm() {
        loginForm.style.display = "none";
        registerForm.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Включаем прокрутку обратно
    }

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        openForm(loginForm);
    });

    signinLink.addEventListener("click", function (event) {
        event.preventDefault();
        openForm(loginForm);
    });

    registerLink.addEventListener("click", function (event) {
        event.preventDefault();
        openForm(registerForm);
    });

    overlay.addEventListener("click", closeForm);
    closeButtons.forEach(button => {
        button.addEventListener("click", closeForm);
    });
});
