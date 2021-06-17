// let csrfcookie = function() {  // for django csrf protection
//   let cookieValue = null,
//       name = "csrftoken";
//   if (document.cookie && document.cookie !== "") {
//       let cookies = document.cookie.split(";");
//       for (let i = 0; i < cookies.length; i++) {
//           let cookie = cookies[i].trim();
//           if (cookie.substring(0, name.length + 1) == (name + "=")) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   return cookieValue;
// };

// var csrftoken = csrfcookie();
/*____________________________________________________________________________________________*/

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

var csrftoken = getCookie('csrftoken');

host = 'http://127.0.0.1:8000/'
/*____________________________________________________________________________________________*/

// Ищем нод для вставки результата запроса
const resultNode = document.querySelector('.profile');

// Функция запроса за данными пользователя
const profileData = async () => {
  return await fetch(`${host}profile_data/`)
    .then((response) => { return response.json(); })
    .then((data) => { return data; })
    .catch(() => { console.log('error') });
}

// Функция показа полученного результата
async function displayResult(profileData) {
  let user;
  await profileData().then(data => user = data);
  let card = `
    <form class="js-form" method="PUT">
        <p><b>Ваше имя:</b><br>
        <input name="name" type="text" value="${user.name}" size="40">
        </p>
        <p><b>Возраст:</b><br>
        <input name="age" type="text" value="${user.age}" size="40">
        </p>
        <p><b>Локация:</b><br>
        <input name="location" type="text" value="${user.location}" size="40">
        </p>
        <p><b>О себе:</b><br>
        <textarea name="description">${user.description}</textarea>
        </p>
        <p><button type="button" class="j-btn">Изменить</button></p>
     </form>
  `;
  resultNode.innerHTML = card;
};

displayResult(profileData)
/*_______________________________________________________________________*/

// Функция изменения профиля, таймер нужен для ожидания построения дерева профиля
setTimeout(() => {
  const btn = document.querySelector('.j-btn');

  btn.addEventListener('click', () => {
    // Настраиваем запрос

    const form = document.querySelector('.js-form');
    body = JSON.stringify({
      // name: "Иван",
      name: form.name.value,
      description: form.description.value,
      location: form.location.value,
      age: form.age.value
    });

    const options = {
      // метод PUT
      method: 'PUT',
      // Добавим тело запроса
      body: body,
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken
      }
    }
    // Делаем запрос за данными
    fetch('http://127.0.0.1:8000/profile_update/', options)
      .then(response => response.json())
      .then(json => console.log(json))

    // Вывод сообщения
    const elem = document.querySelector('.title');
    let alert1 = document.createElement('div');
    alert1.classList.add('toast', 'toast_show')
    alert1.innerHTML = `<h3>Успешно сохранено</h3>`;
    elem.after(alert1)
    
    setTimeout(() => {
      alert1.classList.remove('toast_show');
      console.log(alert1.classList)
      console.log('delete')
    }, 3000)

  })
}, 300)

