# WebSocket-Chat
<img src="https://st.depositphotos.com/1008768/4671/i/950/depositphotos_46719647-stock-photo-live-chat.jpg" alt="drawing" width="400"/>

## Описание:
Данное приложение разработано для демонстрации возможностей чатов на основе WebSocket с использованием JavaScript и Django Channels. Оно предназначено для демонстрации работы приватных чатов, общего чата и комнат с сохранением истории сообщений. Приложение может быть интегрировано в любой проект на Django, предоставляя функционал для общения пользователей.

На главной странице отображается список всех зарегистрированных пользователей. В общий чат могут отправлять сообщения все пользователи, включая тех, кто не авторизован.

Для удобства тестирования реализовано автоматическое заполнение данных профиля при регистрации, которые можно изменить в любое время в личном кабинете. Также добавлена имитация активного общения: бот периодически выбирает случайного пользователя и отправляет от его имени рандомное сообщение в общий чат.

Для начала приватного чата с конкретным пользователем необходимо выбрать его в списке на главной странице. Чтобы протестировать функциональность чата, рекомендуется зарегистрироваться через два разных браузера и выбрать друг друга в списке пользователей. История переписки сохраняется и загружается при повторном открытии приватного чата.

На вкладке «Комнаты» представлены общедоступные комнаты, созданные пользователями. Их отличие от приватных чатов заключается в возможности присоединения нескольких участников одновременно. История сообщений в таких комнатах также сохраняется и загружается при повторном входе.


## Установка

#### 1. Установить redis
```
sudo apt-get update
sudo apt-get install redis
redis-server
```

#### 2. Установить необходимые пакеты:
```
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
```

#### 3. Запустить сервер:
```
python manage.py runserver
```
