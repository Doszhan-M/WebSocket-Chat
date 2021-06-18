console.log(1)
// Вывести список всех пользователей 

// Найти нод для вставки результата запроса
const resultNode = document.querySelector('.users');
console.log(resultNode)

// Функция показа полученного результата
async function displayResult(profileData) {
    let user;
    // await profileData().then(data => user = data);
    let card = document.createElement('div');
    card.innerHTML = `
    <div class="user_card">
    <div class="image">
        <img src="{% static 'img/256x256/256_2.png' %}" width="50" alt="avatar">
    </div>
    <div>
        <h3>Doszhan</h3>
    </div>
    </div><hr>
    `;

    resultNode.appendChild(card);
};

displayResult(555)