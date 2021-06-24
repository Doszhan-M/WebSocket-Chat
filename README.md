# WebSocket-Chat
<img src="https://st.depositphotos.com/1008768/4671/i/950/depositphotos_46719647-stock-photo-live-chat.jpg" alt="drawing" width="400"/>

## Инструкции по запуску сервера Django

#### 1. Установить в систему redis и запустить его
```
$ sudo apt-get update
$ sudo apt-get install redis
$ redis-server
```
если вы используете ос Windows, то предпочтительно пользоваться Redis средствами Docker!
```
docker run --name redis-server -d redis
```

#### 2. Создать виртуальное окружение внутри папки WebSocket-Chat и активировать его
```
python -m venv venv
.\venv\Scripts\activate
```
#### 2. Установть необходимые пакеты для работы приложения:
```
pip install -r requirements.txt
```
Дождитесь окончания установки всех зависимостей.

#### 2. Перейти в каталог ChatRoom, где находиться файл manage.py и запустить сервер:
```
python manage.py runserver
```


