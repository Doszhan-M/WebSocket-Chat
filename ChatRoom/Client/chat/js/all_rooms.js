/*Алгоритм:
1. Сделать запрос на все комнаты и положить их в слайдер по отдельности
2. Организовать слайдер для показа комнат
3. Вывести кнопку создать комнату 
4. Вывести кнопку присоединиться для комнаты
5. Вывести кнопку удалить для комнаты, если она принадлежит пользователю*/

window.addEventListener('load', () => {   
    // Получить токен и объявить хост________________________________________________________________
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    var csrftoken = getCookie('csrftoken'); 
    const host = 'http://127.0.0.1:8000/'
  // Пункт 1_____________________________________________________________________________
  let resultNode = document.querySelector('.slaider')


  // Функция запроса за данными пользователя
  const profileData = async () => {
    return await fetch(`${host}profile_data/`)
      .then((response) => { return response.json(); })
      .then((data) => { return data; })
      .catch(() => { console.log('error') });
  }


  // Функция запроса всех комнат
  const allRooms = async () => {
    return await fetch(`${host}get_all_rooms/`)
      .then((response) => { return response.json(); })
      .then((data) => {

         return data; })
      .catch(() => { console.log('error') });
  }

  let myRoom // переменная для пункта 5

  // Функция показа полученного результата
  async function displayResult(allRooms, profileData) {
    let rooms;
    await allRooms().then(data => {
      rooms = data
      if (rooms.length <= 3) { // если комнат нет, то заполнить слайдер заглушками
        for(i = data.length; i < 3; i++) {
          let card = document.createElement('div');
          card.classList.add('card');
          resultNode.prepend(card);};
      }
    });
    // получить авторизованного пользователя
    let user;
    await profileData().then(data => user = data);
    // каждую комнату положить в свою карту
    rooms.forEach(room => {
      let card = document.createElement('div')
      card.classList.add('card')
      card.innerHTML = `
        <h2>Комната пользователя: </h2>
        <div class="owner">
            <img src="${room.my_field}" alt="ava" width="120">
            <h2>${room.room}</h2>
        </div>
        <div class="btns">
        <button class="bt enter" type="submit"><a href="${host}chat_with/${room.room}/">Войти</a></button>
        </div>
      ` 
      // если карта принадлежит юзеру, то вставить кнопку удаления     
      if (room.room == user.name){
        myRoom = user.name
        let delBtn = document.createElement('div')
        delBtn.innerHTML = '<button class="bt delete" type="button">Удалить</button>'
        // delBtn.innerHTML = '<input class="bt delete" type="submit" value="Удалить">'
        let child = card.lastElementChild
        child.append(delBtn)
      } 
      resultNode.prepend(card);

      if (myRoom) { // если есть комната юзера, тогда описать кнопку
        dell(myRoom);
      }
     })

  }
  
  // Пункт 2_____________________________________________________________________________
  async function slaider() {
        // Слайдеру требуется div из displayResult, поэтому нужно ждать ее выполнения
        await displayResult(allRooms, profileData);
        
        const btnLeft = document.querySelector('.btn_left')
        const btnRight = document.querySelector('.btn_right')
        
        // Find images
        const slaider = document.querySelector('.slaider')
        const images = document.querySelectorAll('.card')
        
        // Calculate image width for step
        const stepSize = images[0].clientWidth
        
        // Move picture
        let counter = 0; // счетчик
        
        btnRight.addEventListener('click', () => {
          // Если counter равен длине картинок, то обнуляем счетчик.
          if (counter >= images.length - 3) {counter = -1}
          counter++; 
          slaider.style.transform = 'translateX(' + `${-(stepSize) * counter - 10 * counter}px)`;
        })
        
        btnLeft.addEventListener('click', () => {
          if (counter <= 0) { counter = images.length -2}
          counter--;
          slaider.style.transform = 'translateX(' + `${-stepSize * counter - 10 * counter}px)`;
        })
  };

  slaider(); //пункты 1,2 

  // Пункт 3_____________________________________________________________________________
  const create = document.querySelector('.create')

    // Функция создания комнаты чата в бд
  function createRoom () {
    body = JSON.stringify({
        room: 'roomName',
        owner: 1,
        is_common: true
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
    fetch(`${host}create_common_room/`, options)
        .then(response => response.json())
        .then(json => {
          console.log(json)
          displayResult(allRooms, profileData)
        })
        .catch(() => { alert('Вы уже создали себе публичную комнату') });
  }
  create.addEventListener('click', () => {
    createRoom()
  })

  // Пункт 5_____________________________________________________________________________

  // Функция удаления своей комнаты
  function dell (myRoom) {
    dellBtn = document.querySelector('.delete');

    dellBtn.addEventListener('click', () => {

    const deleteRoom = async() => {
      const options = {
        method: 'DELETE',
        headers: {
            "X-CSRFToken": csrftoken
        }
      }
      await fetch(`${host}room_get/?room=${myRoom}`, options)
      .then(response => console.log(response.status))

      window.location.reload();
      
      // function findAncestor (el, cls) {
      //   while ((el = el.parentElement) && !el.classList.contains(cls));
      //   return el;
      // } 

      // const cardDiv = findAncestor(dellBtn, 'card')
      // console.log(cardDiv)
      // let parent = cardDiv.parentElement
      // console.log(parent)
      // parent.removeChild(cardDiv)
    }
      deleteRoom()
    });
  }
})
    

        
    
    
    
    