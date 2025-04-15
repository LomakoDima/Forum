document.addEventListener('DOMContentLoaded', function() {

    const createPostBtn = document.getElementById('create-post-btn');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.querySelector('.close-modal');

    createPostBtn.addEventListener('click', function() {
        postModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    
    closeModal.addEventListener('click', function() {
        postModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    
    window.addEventListener('click', function(event) {
        if (event.target === postModal) {
            postModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const postForm = document.querySelector('.post-form');
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        postModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    const chatButton = document.querySelector('.chat-button');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    chatButton.addEventListener('click', () => {
        chatWindow.classList.add('active');
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.textContent = message;
            chatMessages.appendChild(userMessage);

            chatInput.value = '';

            setTimeout(() => {
                const supportMessage = document.createElement('div');
                supportMessage.className = 'message support';
                supportMessage.textContent = 'Спасибо за ваше сообщение! Наш оператор скоро с вами свяжется.';
                chatMessages.appendChild(supportMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
});