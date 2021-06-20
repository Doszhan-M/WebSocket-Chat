/*Алгоритм входа в комнату:
1. Сделать запрос на проверку комнаты со своим именем, если такая комната уже существует, то  
    название комнаты будет та же, иначе создаем новую комнату из адреса
2. Открыть websocket с названием комнаты
3. Получить и вывести данные собеседника*/


// Получить токен и объявить хост________________________________________________________________

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

var csrftoken = getCookie('csrftoken');

const host = 'http://127.0.0.1:8000/'


// Пункт 1____________________________________________________________________________________________

// Название и владелец комнаты из адреса
let roomName = JSON.parse(document.getElementById('room-name').textContent);
const owner = JSON.parse(document.getElementById('room-name').textContent);

// Функция проверки комнаты
const getRoom = async (name) => {
    return await fetch(`${host}room_get/?room=${name}`)
        .then((response) => { return response.json(); })
        .then((data) => { return data;})
        .catch(() => { console.log('такой комнаты нет') });
}

// Функция получения своего имени
const getMyName = async () => {
    return await fetch(`${host}profile_data/`)
    .then((response) => { return response.json(); })
    .then((data) => { return data; })
    .catch(() => { console.log('error profile_data') });
}

// Функция создания комнаты чата в бд
const createRoom = () => {
    body = JSON.stringify({
        room: roomName,
        owner: 1
    });
    const options = {
        method: 'POST',
        // Добавим тело запроса
        body: body,
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken
        }
    }
    // Делаем post запрос
    fetch('http://127.0.0.1:8000/create_room/', options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(() => { console.log('такая комната уже существует') });
}
// getRoom()

// Проверка
async function checkRoom (getRoom) {
    let myName;
    await getMyName().then(data => myName = data.name)
    console.log(myName, 'myName')

    let room;
    await getRoom(myName).then(data => room = data)
    if (room != undefined) 
        {
        if (room.room == myName) {
            console.log('Такая комната есть в бд')
            roomName = `${myName}`
            }
    } else {
        console.log('Создать новую комнату')
        createRoom()
    }
}

// Выполнить
checkRoom(getRoom)


// Пункт 2____________________________________________________________________________________________

setTimeout(() => {
const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat_with/'
    + roomName
    + '/'
);
console.log('chatSocket', chatSocket)

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    // Распарсить полученное сообщение
    let newMessageContent = JSON.parse(data.message)
    // Создать новый div и добавить туда класс
    let div = document.createElement('div');
    div.classList.add('chat_log')
    // Собрать html сообщения и вставить его в div
    message = `
    <div class="name">
        <p>${newMessageContent.name}</p>
    </div>
    <div class="new_message">
        <p>${newMessageContent.message}</p>
    </div>
    `
    div.innerHTML = message
    // Вставить готовую сборку в поле чата
    const chat = document.querySelector('.chat')
    chat.appendChild(div)
    // document.querySelector('#new_message').textContent += (data.message);
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('.message').focus();
document.querySelector('.message').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('.jbtn').click();
    }
};

document.querySelector('.jbtn').onclick = function (e) {
    const messageInputDom = document.querySelector('.message');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};
}, 1000)


// Пункт 3____________________________________________________________________________________________

// Функция запроса профиля собеседника
const profileData = async () => {
    const currentLocation = window.location.pathname;
    const companion = currentLocation.split('/')[2]
    return await fetch(`${host}get_user/?companion=${companion}`)
        .then((response) => { return response.json(); })
        .then((data) => { return data; })
        .catch(() => { console.log('error') });
}

// Отправить в шаблон данные собеседника
async function displayResult() {
    let user;
    await profileData().then(data => user = data);
    const userNode = document.querySelector('.chat_user')
    let card = `
    <p><h3>Чат с пользователем:</h3></p>
    <p><img src="/static/img/256x256/256_1.png" alt="ava" width="200"></p>
    <p><h3>${user.name}</h3></p>
    <p><h4>${user.age} года</h4></p>
    <p>${user.location}</p>
    <p>${user.description}</p>
    `
    document.getElementById("name").textContent = user.name
    document.getElementById("age").textContent = `${user.age} лет`
    document.getElementById("location").textContent = user.location
    document.getElementById("description").textContent = user.description

}
// Выполнить
displayResult()


// Пункт ____________________________________________________________________________________________

// Функция создания сообщения в бд
const createMessage = () => {
    body = JSON.stringify({
        author: 'lambda',
        message: 'adawdwadada',
        room: 1, 
        room_blank: '1111111111'
    });
    const options = {
        method: 'POST',
        // Добавим тело запроса
        body: body,
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken
        }
    }
    // Делаем post запрос
    fetch('http://127.0.0.1:8000/message_create/', options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(() => { console.log('не удалось создать сообщение') });
}

createMessage()
