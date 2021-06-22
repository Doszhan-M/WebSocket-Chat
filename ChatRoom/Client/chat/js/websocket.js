// Настроить websocket
const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat_with/common/'
);

// Отправить сообщение в чат
chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    let newMessage = JSON.parse(data.message)
    document.querySelector('#chat-log').value += (newMessage.name + ':\n' + newMessage.message + '\n\n');
};

// Закрыть соединение
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

// Enter работает как отправить сообщение в чат
// document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

// Отправить сообщение на сервер
document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};