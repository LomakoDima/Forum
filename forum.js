document.addEventListener("DOMContentLoaded", function () {
  const createPostBtn = document.getElementById("create-post-btn");
  const postModal = document.getElementById("post-modal");
  const closeModal = document.querySelector(".close-modal");
  const postForm = document.querySelector(".post-form");
  const resultsContainer = document.getElementById("posts-container");

  // Open modal
  createPostBtn.addEventListener("click", function () {
    postModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });

  // Close modal
  closeModal.addEventListener("click", function () {
    postModal.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === postModal) {
      postModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Handle form submission
  postForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Собираем данные из формы
    const postTitle = postForm.querySelector(
      'input[placeholder="Введите название поста"]'
    ).value;
    const universityName = postForm.querySelector(
      'input[placeholder="Например: КБТУ"]'
    ).value;
    const country = postForm.querySelector(".country-select").value;
    const studyDirection = postForm.querySelector("select").value;
    const faculty = postForm.querySelector(
      'input[placeholder="Название факультета"]'
    ).value;
    const specialty = postForm.querySelector(
      'input[placeholder="Название специальности"]'
    ).value;
    const website = postForm.querySelector('input[type="url"]').value;
    // Исправленные селекторы для чекбоксов
    const hasDormitory = postForm.querySelector(
      '.checkbox-group label:nth-child(1) input[type="checkbox"]'
    ).checked;
    const isFreeEducation = postForm.querySelector(
      '.checkbox-group label:nth-child(2) input[type="checkbox"]'
    ).checked;
    const costInputs = postForm.querySelectorAll('input[placeholder="0"]');
    const tuitionCost = costInputs[0]?.value || "";
    const livingCost = costInputs[1]?.value || "";
    const experience = postForm.querySelector(
      'textarea[placeholder="Поделитесь своим опытом поступления..."]'
    ).value;
    const pros = postForm.querySelector(
      'textarea[placeholder="Опишите преимущества..."]'
    ).value;
    const cons = postForm.querySelector(
      'textarea[placeholder="Опишите недостатки..."]'
    ).value;

    // Проверяем, существует ли resultsContainer
    if (!resultsContainer) {
      console.error(
        'Контейнер для постов не найден. Убедитесь, что элемент с id="posts-container" существует в HTML.'
      );
      return;
    }

    // Создаём карточку поста
    const postCard = document.createElement("div");
    postCard.classList.add("university-card", "post");

    // Формируем HTML для карточки
    postCard.innerHTML = `
            <div class="post-header">
                <h3 class="post-title">${postTitle}</h3>
                <div class="post-meta">Опубликовано: ${new Date().toLocaleDateString()}</div>
            </div>
            <div class="post-content">
                <p><strong>Университет:</strong> ${universityName}</p>
                <p><strong>Страна:</strong> ${getCountryName(country)}</p>
                <p><strong>Направление:</strong> ${getDirectionName(
                  studyDirection
                )}</p>
                <p><strong>Факультет:</strong> ${faculty}</p>
                <p><strong>Специальность:</strong> ${specialty}</p>
                <p><strong>Сайт:</strong> <a href="${website}" target="_blank">${website}</a></p>
                <p><strong>Общежитие:</strong> ${
                  hasDormitory ? "Есть" : "Нет"
                }</p>
                <p><strong>Бесплатное обучение:</strong> ${
                  isFreeEducation ? "Да" : "Нет"
                }</p>
                ${
                  tuitionCost
                    ? `<p><strong>Стоимость обучения:</strong> $${tuitionCost}/год</p>`
                    : ""
                }
                ${
                  livingCost
                    ? `<p><strong>Стоимость проживания:</strong> $${livingCost}/месяц</p>`
                    : ""
                }
                ${
                  experience
                    ? `<p><strong>Опыт поступления:</strong> ${experience}</p>`
                    : ""
                }
                ${pros ? `<p><strong>Плюсы:</strong> ${pros}</p>` : ""}
                ${cons ? `<p><strong>Минусы:</strong> ${cons}</p>` : ""}
            </div>
            <div class="post-actions">
                <button class="action-btn like-btn"><i class="fas fa-thumbs-up"></i> 0</button>
                <button class="action-btn dislike-btn"><i class="fas fa-thumbs-down"></i> 0</button>
                <button class="action-btn comment-btn"><i class="fas fa-comment"></i> 0</button>
            </div>
            <div class="comments-section" style="display: none;">
                <div class="new-comment">
                    <input type="text" placeholder="Ваш комментарий...">
                    <button>Отправить</button>
                </div>
            </div>
        `;

    // Добавляем пост в контейнер
    resultsContainer.prepend(postCard);

    // Закрываем модальное окно и очищаем форму
    postModal.style.display = "none";
    document.body.style.overflow = "auto";
    postForm.reset();
  });

  // Функция для получения названия страны
  function getCountryName(code) {
    const countries = {
      KZ: "Казахстан",
      RU: "Россия",
      US: "США",
      UK: "Великобритания",
      DE: "Германия",
      FR: "Франция",
      IT: "Италия",
      ES: "Испания",
      CN: "Китай",
      JP: "Япония",
      KR: "Южная Корея",
      CA: "Канада",
      AU: "Австралия",
    };
    return countries[code] || code;
  }

  // Функция для получения названия направления
  function getDirectionName(value) {
    const directions = {
      tech: "Технические науки",
      economics: "Экономика и финансы",
      humanitarian: "Гуманитарные науки",
      medical: "Медицина",
    };
    return directions[value] || value;
  }
});
