export const host = window.location.host + '/'
console.log('window.location.host', host)
// Получить токен и объявить переменные________________________________________________________________
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export  var csrftoken = getCookie('csrftoken'); 