// export const host = 'http://127.0.0.1:8000/'
export const host = 'http://195.149.87.162:7000/'
console.log('host', window.location.host)

// Получить токен и объявить переменные________________________________________________________________
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export  var csrftoken = getCookie('csrftoken'); 