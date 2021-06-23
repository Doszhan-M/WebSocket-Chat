window.addEventListener('load', () => {

    // Открыть канал websocket для общего чата
    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat_with/common/'
    );

    // Поведение при получении сообщении из сервера
    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        let newMessage = JSON.parse(data.message)
        document.querySelector('#chat-log').value += (newMessage.name + ':\n' + newMessage.message + '\n\n');
    };

    // Отправить сообщение на сервер
    document.querySelector('#chat-message-submit').onclick = function(e) {
        const messageInput = document.querySelector('#chat-message-input');
        const message = messageInput.value;
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        messageInput.value = '';
    };

    // Enter работает как отправить сообщение в чат
    document.querySelector('#chat-message-input').onkeyup = function(e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };
    
    // Поведение при закрытии websocket
    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

})