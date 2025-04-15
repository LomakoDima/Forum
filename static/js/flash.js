document.addEventListener('DOMContentLoaded', () => {
    const flashMessages = document.querySelectorAll('.flash-msg');
    
    flashMessages.forEach(message => {
      setTimeout(() => {
        message.classList.add('hide');
        setTimeout(() => message.remove(), 500);
      }, 5000);
    });
  });


document.querySelectorAll('.flash-msg').forEach(flash => {
    const duration = parseInt(flash.dataset.duration) || 5000;
    flash.style.setProperty('--duration', `${duration}ms`);
    
    const close = () => {
      flash.style.animation = 'fadeOut 0.4s ease forwards';
      setTimeout(() => flash.remove(), 400);
    };
    
    const timer = setTimeout(close, duration);
    
    flash.querySelector('.flash-close').addEventListener('click', () => {
      clearTimeout(timer);
      close();
    });
    
    flash.addEventListener('mouseenter', () => {
      flash.style.animationPlayState = 'paused';
    });
    
    flash.addEventListener('mouseleave', () => {
      flash.style.animationPlayState = 'running';
    });
  });
  