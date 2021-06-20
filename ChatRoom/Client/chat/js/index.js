// Вывести список всех пользователей 
const host = 'http://127.0.0.1:8000/'

// Найти нод для вставки результата запроса
const resultNode = document.querySelector('.users');

// Функция запроса за данными пользователя, возвращает массив объектов с данными пользователей
const profileData = async () => {
    return await fetch(`${host}all_users/`)
        .then((response) => { return response.json(); })
        .then((data) => { 
            console.log(typeof(data[1]));
            return data; })
        .catch(() => { console.log('error') });
}


// Функция показа полученного результата
async function displayResult(profileData) {
    let arr;
    await profileData().then(data => arr = data);

    arr.forEach(user => {
        console.log(user)    

        let card = document.createElement('div');
        card.innerHTML = `
        <div class="user_card">
        <div class="image">
            <img src="${user.avatar}" width="50" alt="avatar" id="ava">
        </div>
        <div>
            <a href="http://127.0.0.1:8000/chat_with/${user.name}/"><h3>${user.name}</h3></a>           
        </div>
        </div><hr>
        `;
        resultNode.appendChild(card);   
    });



    setTimeout(() => {
        const image = document.getElementById('ava');
    }, 100)
}

displayResult(profileData)