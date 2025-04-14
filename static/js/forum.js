document.addEventListener("DOMContentLoaded", function () {
  const createPostBtn = document.getElementById("create-post-btn");
  const postModal = document.getElementById("post-modal");
  const closeModal = document.querySelector(".close-modal");
  const postForm = document.querySelector(".post-form");
  const resultsContainer = document.getElementById("posts-container");

  // Open modal
  createPostBtn?.addEventListener("click", function () {
    postModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  // Close modal
  closeModal?.addEventListener("click", function () {
    postModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === postModal) {
      postModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Handle form submission
  postForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      postTitle: postForm.querySelector('input[placeholder="Введите название поста"]').value,
      universityName: postForm.querySelector('input[placeholder="Например: КБТУ"]').value,
      country: postForm.querySelector(".country-select").value,
      studyDirection: postForm.querySelector("select").value,
      faculty: postForm.querySelector('input[placeholder="Название факультета"]').value,
      specialty: postForm.querySelector('input[placeholder="Название специальности"]').value,
      website: postForm.querySelector('input[type="url"]').value,
      hasDormitory: postForm.querySelector('.checkbox-group label:nth-child(1) input[type="checkbox"]').checked,
      isFreeEducation: postForm.querySelector('.checkbox-group label:nth-child(2) input[type="checkbox"]').checked,
      tuitionCost: postForm.querySelectorAll('input[placeholder="0"]')[0]?.value || "",
      livingCost: postForm.querySelectorAll('input[placeholder="0"]')[1]?.value || "",
      experience: postForm.querySelector('textarea[placeholder="Поделитесь своим опытом поступления..."]').value,
      pros: postForm.querySelector('textarea[placeholder="Опишите преимущества..."]').value,
      cons: postForm.querySelector('textarea[placeholder="Опишите недостатки..."]').value,
    };

    createPost(formData);

    postModal.style.display = "none";
    document.body.style.overflow = "auto";
    postForm.reset();
  });

  function createPost(data) {
    const postCard = document.createElement("div");
    postCard.classList.add("university-card", "post");
    
    const postId = Date.now().toString(); // Unique ID for the post
    postCard.dataset.postId = postId;

    // Create preview content
    const previewContent = `
      <div class="post-header">
        <h3 class="post-title">${data.postTitle}</h3>
        <div class="post-meta">
          <span class="post-date">Опубликовано: ${new Date().toLocaleDateString()}</span>
          <span class="post-author">Автор: Аноним</span>
        </div>
      </div>
      <div class="post-preview">
        <p><strong>Университет:</strong> ${data.universityName}</p>
        <p><strong>Страна:</strong> ${getCountryName(data.country)}</p>
        <p><strong>Направление:</strong> ${getDirectionName(data.studyDirection)}</p>
        <button class="expand-btn">Читать полностью <i class="fas fa-chevron-down"></i></button>
      </div>
    `;

    // Create full content
    const fullContent = `
      <div class="post-content" style="display: none;">
        <div class="university-info">
          <h4>Информация об университете</h4>
          <p><strong>Университет:</strong> ${data.universityName}</p>
          <p><strong>Страна:</strong> ${getCountryName(data.country)}</p>
          <p><strong>Направление:</strong> ${getDirectionName(data.studyDirection)}</p>
          <p><strong>Факультет:</strong> ${data.faculty}</p>
          <p><strong>Специальность:</strong> ${data.specialty}</p>
          <p><strong>Сайт:</strong> <a href="${data.website}" target="_blank" rel="noopener noreferrer">${data.website}</a></p>
        </div>
        
        <div class="accommodation-info">
          <h4>Условия обучения</h4>
          <p><strong>Общежитие:</strong> ${data.hasDormitory ? "Есть" : "Нет"}</p>
          <p><strong>Бесплатное обучение:</strong> ${data.isFreeEducation ? "Да" : "Нет"}</p>
          ${data.tuitionCost ? `<p><strong>Стоимость обучения:</strong> $${data.tuitionCost}/год</p>` : ""}
          ${data.livingCost ? `<p><strong>Стоимость проживания:</strong> $${data.livingCost}/месяц</p>` : ""}
        </div>
        
        ${data.experience ? `
        <div class="experience-section">
          <h4>Опыт поступления</h4>
          <p>${data.experience}</p>
        </div>
        ` : ""}
        
        <div class="pros-cons">
          ${data.pros ? `
          <div class="pros">
            <h4>Плюсы</h4>
            <p>${data.pros}</p>
          </div>
          ` : ""}
          ${data.cons ? `
          <div class="cons">
            <h4>Минусы</h4>
            <p>${data.cons}</p>
          </div>
          ` : ""}
        </div>
        <button class="collapse-btn">Свернуть <i class="fas fa-chevron-up"></i></button>
      </div>
      
      <div class="post-actions">
        <button class="action-btn like-btn" data-count="0">
          <i class="fas fa-thumbs-up"></i>
          <span class="count">0</span>
        </button>
        <button class="action-btn dislike-btn" data-count="0">
          <i class="fas fa-thumbs-down"></i>
          <span class="count">0</span>
        </button>
        <button class="action-btn comment-btn">
          <i class="fas fa-comment"></i>
          <span class="count">0</span>
        </button>
      </div>
      
      <div class="comments-section" style="display: none;">
        <div class="comments-list"></div>
        <div class="new-comment">
          <input type="text" placeholder="Ваш комментарий..." class="comment-input">
          <button class="submit-comment">Отправить</button>
        </div>
      </div>
    `;

    postCard.innerHTML = previewContent + fullContent;

    // Add event listeners for expand/collapse
    const expandBtn = postCard.querySelector('.expand-btn');
    const collapseBtn = postCard.querySelector('.collapse-btn');
    const postContent = postCard.querySelector('.post-content');
    const postPreview = postCard.querySelector('.post-preview');

    expandBtn?.addEventListener('click', function() {
      postPreview.style.display = 'none';
      postContent.style.display = 'block';
      postContent.style.animation = 'fadeIn 0.3s ease-in-out';
    });

    collapseBtn?.addEventListener('click', function() {
      postContent.style.display = 'none';
      postPreview.style.display = 'block';
      postPreview.style.animation = 'fadeIn 0.3s ease-in-out';
    });

    // Add event listeners for post actions
    setupPostActions(postCard);

    // Add the post to the container
    resultsContainer?.prepend(postCard);
  }

  function setupPostActions(postCard) {
    const likeBtn = postCard.querySelector('.like-btn');
    const dislikeBtn = postCard.querySelector('.dislike-btn');
    const commentBtn = postCard.querySelector('.comment-btn');
    const commentsSection = postCard.querySelector('.comments-section');
    const commentInput = postCard.querySelector('.comment-input');
    const submitCommentBtn = postCard.querySelector('.submit-comment');

    // Like button
    likeBtn?.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.dataset.count = String(parseInt(this.dataset.count) - 1);
      } else {
        this.classList.add('active');
        if (dislikeBtn.classList.contains('active')) {
          dislikeBtn.classList.remove('active');
          dislikeBtn.dataset.count = String(parseInt(dislikeBtn.dataset.count) - 1);
        }
        this.dataset.count = String(parseInt(this.dataset.count) + 1);
      }
      this.querySelector('.count').textContent = this.dataset.count;
    });

    // Dislike button
    dislikeBtn?.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.dataset.count = String(parseInt(this.dataset.count) - 1);
      } else {
        this.classList.add('active');
        if (likeBtn.classList.contains('active')) {
          likeBtn.classList.remove('active');
          likeBtn.dataset.count = String(parseInt(likeBtn.dataset.count) - 1);
        }
        this.dataset.count = String(parseInt(this.dataset.count) + 1);
      }
      this.querySelector('.count').textContent = this.dataset.count;
    });

    // Comment button
    commentBtn?.addEventListener('click', function() {
      commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
    });

    // Submit comment
    submitCommentBtn?.addEventListener('click', function() {
      const commentText = commentInput.value.trim();
      if (commentText) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
          <div class="comment-header">
            <span class="comment-author">Аноним</span>
            <span class="comment-date">${new Date().toLocaleDateString()}</span>
          </div>
          <div class="comment-content">${commentText}</div>
        `;
        
        postCard.querySelector('.comments-list').appendChild(commentElement);
        commentInput.value = '';
        
        // Update comment count
        const count = postCard.querySelectorAll('.comment').length;
        commentBtn.querySelector('.count').textContent = count;
      }
    });

    // Submit comment on Enter
    commentInput?.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        submitCommentBtn.click();
      }
    });
  }

  function getCountryName(code) {
    const countries = {
      KZ: "Казахстан", RU: "Россия", US: "США", UK: "Великобритания",
      DE: "Германия", FR: "Франция", IT: "Италия", ES: "Испания",
      CN: "Китай", JP: "Япония", KR: "Южная Корея", CA: "Канада", AU: "Австралия"
    };
    return countries[code] || code;
  }

  function getDirectionName(value) {
    const directions = {
      tech: "Технические науки",
      economics: "Экономика и финансы",
      humanitarian: "Гуманитарные науки",
      medical: "Медицина"
    };
    return directions[value] || value;
  }
});