// сделать запрос за данными пользователя
const profileData = async () => {
    return await fetch('http://127.0.0.1:8000/profile_data/')
    .then((response) => { return response.json(); })
    .then((data) => { return data; })
    .catch(() => { console.log('error') });
}

let user;
profileData().then(data => user = data);

setTimeout(() => displayResult(user), 300)


// Функция обработки полученного результата
function displayResult(apiData) {
        console.log(apiData)
    };
    