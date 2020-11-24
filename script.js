let user = 'Gard0';
const url = `https://api.github.com/users/${user}`;
let preloader = document.querySelector('container');
let setDate = new Date();

setTimeout(function () {
  preloaderEl.classList.add('unvisible');
}, 3000);

const date = new Promise((resolve, reject) => {
  setTimeout(() => date ? resolve(setDate) : reject('Время не опредено'), 2000);
});

const getUrl = new Promise((resolve, reject) => {
  setTimeout(() => getUrl ? resolve(url) : reject('Пользователь не найден'), 4000);
});


Promise.all([date, getUrl])
  .then(([setDate, url]) => fetch(url))
  .then(res => res.json())
  .then(json => {
    const div = document.createElement('div');
    document.body.append(div);
    const userName = document.createElement('a');
    if (json.name !== undefined) {
      userName.textContent = json.name;
      userName.href = json.html_url;
    } else {
      userName.textContent = 'Information not available'
    }
    div.append(userName);
    const userBio = document.createElement('h3');
    userBio.textContent = json.bio;
    div.append(userBio);
    const userImg = document.createElement('img');
    userImg.src = json.avatar_url;
    userImg.alt = 'user_avatar_image';
    div.append(userImg);
  }
  )
  .catch(err => console.log('Information not available'));