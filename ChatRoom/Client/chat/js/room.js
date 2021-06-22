/*Алгоритм входа в комнату:
1. Сделать запрос на проверку комнаты со своим именем, если такая комната уже существует, то  
    название комнаты будет та же, иначе создаем новую комнату из адреса
2. Открыть websocket с названием комнаты и сразу загрузить историю чата
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
        .then((data) => { return data; })
        .catch(() => { console.log('------') 
    });
}

// Функция получения своего имени
const getMyName = async () => {
    return await fetch(`${host}profile_data/`)
        .then((response) => { return response.json(); })
        .then((data) => { return data; })
        .catch(() => { console.log('error profile_data') });
}

// Функция создания комнаты чата в бд
const createRoom = (roomName) => {
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

// Функция проверки комнаты
async function checkRoom(getRoom) {
    let myName;
    await getMyName().then(data => {myName = data.name})
    
    searchRoom1 = `${myName + '_' + roomName}` // Название комнаты
    searchRoom2 = `${roomName + '_' + myName}` // Название комнаты

    let roomsArray = [];
    await getRoom(searchRoom1).then(data => {
        roomsArray.push(data.room)
    })
    await getRoom(searchRoom2).then(data => {
        roomsArray.push(data.room)
    })
    roomsArray = roomsArray.filter(item => item !== undefined)
    console.log('roomsArray.length', roomsArray.length)

    if (roomName == myName) {// Если пользователь зашел к себе, то проверить наличие комнаты
        let myRoom
        await getRoom(myName).then(data => myRoom = data)
            console.log(myRoom.room == undefined)
            if (myRoom.room == undefined) { // если комнаты нет, то перенаправить
                window.location.href = `${host}all_rooms/`;
            }
    } else { // Если в базе нет подходящей комнаты, то создать
        if (roomsArray.length == 0) {
            console.log('Создать комнату')
            createRoom(searchRoom1)
            roomName = searchRoom1}
        if (roomsArray.length > 0) { // если есть такая комната, то зайти в нее
            console.log('roomsArray[0]', roomsArray[0])
            roomName = roomsArray[0]
        }
    }
}


// Пункт 2____________________________________________________________________________________________

// Функция создания сообщения в бд
async function createMessage(message, room) {
    let author;
    await getMyName().then(data => author = data.name)

    body = JSON.stringify({
        author: author,
        message: message,
        room: 1,
        room_blank: room
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
    await fetch('http://127.0.0.1:8000/message_create/', options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(() => { console.log('не удалось создать сообщение') });
}

function startWebsocket() {
    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat_with/'
        + roomName
        + '/'
    );
    console.log('chatSocket', chatSocket)

    // Поведение при открытии соединения
    chatSocket.onopen = function (e) {
        // Получить все сообщения данной комнаты из бд и показать их в шаблоне
        const getMessages = (roomName) => {
            let messages;
            fetch(`${host}message_get/?room=${roomName}`)
                .then((response) => { return response.json(); })
                .then((data) => {
                    messages = data;
                    messages.forEach(element => {
                        let newMessageContent = element
                        // Создать новый div и добавить туда класс
                        let div = document.createElement('div');
                        div.classList.add('chat_log')
                        // Собрать html сообщения и вставить его в div
                        message = `
            <div class="name">
                <p>${newMessageContent.author}</p>
            </div>
            <div class="new_message">
                <p>${newMessageContent.message}</p>
            </div>
            `
                        div.innerHTML = message
                        // Вставить готовую сборку в поле чата
                        const chat = document.querySelector('.chat')
                        chat.appendChild(div)
                    });
                })
                .catch(() => { console.log('сообщении нет') })
        }
        getMessages(roomName)
    }

    // Поведение при входящем сообщении
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
        // Создать копию сообщения в бд
    };


    // Поведение при закрытии соединения
    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };

    document.querySelector('.message').focus();
    document.querySelector('.message').onkeyup = function (e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('.jbtn').click();
        }
    };

    // отправить сообщение на сервер

    document.querySelector('.jbtn').onclick = function (e) {
        const messageInput = document.querySelector('.message');
        const message = messageInput.value;
        chatSocket.send(JSON.stringify({
            'message': message
        }));

        createMessage(messageInput.value, roomName)

        messageInput.value = '';
    };
}

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

async function start() {
    await checkRoom(getRoom) // Выполнить
    await displayResult()
    await startWebsocket()
}

start()