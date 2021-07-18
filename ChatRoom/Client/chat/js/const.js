// export const host = 'http://127.0.0.1:8000/'
export const host = 'http://195.149.87.162:7000/'
export const host1 = 'http://' + window.location.host + '/'
console.log('host1', host1)
console.log(typeof(host1))

// Получить токен и объявить переменные________________________________________________________________
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

export  var csrftoken = getCookie('csrftoken'); 