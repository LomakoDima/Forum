document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');
    const cookieSettings = document.getElementById('cookie-settings');
    const cookieModal = document.getElementById('cookie-modal');
    const saveCookieSettings = document.getElementById('save-cookie-settings');
    const closeCookieModal = document.getElementById('close-cookie-modal');

    const cookieChoice = getCookie('cookie-consent');
    if (!cookieChoice) {
      setTimeout(() => {
        cookieConsent.classList.add('show');
      }, 2000);
    }

    acceptCookies?.addEventListener('click', () => {
      setAllCookies(true);
      cookieConsent.classList.remove('show');
      setCookie('cookie-consent', 'accepted', 365);
    });

    rejectCookies?.addEventListener('click', () => {
      setAllCookies(false);
      cookieConsent.classList.remove('show');
      setCookie('cookie-consent', 'rejected', 365);
    });

    cookieSettings?.addEventListener('click', () => {
      cookieModal.classList.add('show');
      cookieConsent.classList.remove('show');
    });
  
    closeCookieModal?.addEventListener('click', () => {
      cookieModal.classList.remove('show');
    });
  
    saveCookieSettings?.addEventListener('click', () => {
      const analytics = document.getElementById('analytics-cookies').checked;
      const marketing = document.getElementById('marketing-cookies').checked;
      const preferences = document.getElementById('preference-cookies').checked;
  
      setCookie('analytics-cookies', analytics, 365);
      setCookie('marketing-cookies', marketing, 365);
      setCookie('preference-cookies', preferences, 365);
      setCookie('cookie-consent', 'customized', 365);
  
      cookieModal.classList.remove('show');
    });
  
    function setCookie(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }
  
    function getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  
    function setAllCookies(accepted) {
      setCookie('analytics-cookies', accepted, 365);
      setCookie('marketing-cookies', accepted, 365);
      setCookie('preference-cookies', accepted, 365);
    }
  });