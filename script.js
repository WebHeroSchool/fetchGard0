
let userName = window.location.search;
let user = 'Gard0';
let url = `https://api.github.com/users/`;

function searchName() {
  if (userName) {
    user = userName.lastIndexOf('=') !== -1 ?
      (userName.slice(1, userName.lastIndexOf('='))) :
      (userName.slice(1));
  }
}
searchName();

let preloader = document.getElementById('preloader');
setTimeout(function () {
  preloader.classList.add('invisible');
}, 4000);

const setDate = new Date();
let date = new Promise((resolve, reject) => {
  setTimeout(() => date ? resolve(setDate) : reject('Время не опредено'), 1000);
});
const getUrl = new Promise((resolve, reject) => {
  setTimeout(() => getUrl ? resolve(url) : reject('URL не найден'), 2000);
});
const getName = new Promise((resolve, reject) => {
  setTimeout(() => getName ? resolve(user) : reject('Пользователь не найден2'), 2000);
});

Promise.all([getUrl, getName])
  .then(([url, userName]) => fetch(`${url}${userName}`)) //
  .then(res => res.json())
  .then(json => {
    console.log(json);
    const div = document.createElement('div');
    document.body.append(div);
    const userName = document.createElement('a');
    if (json.name !== undefined) {
      userName.textContent = json.name;
      userName.href = json.html_url;
    } else {
      userName.textContent = 'Information not available probably .json'
    }
    div.append(userName);
    const userBio = document.createElement('h3');
    userBio.textContent = json.bio;
    div.append(userBio);
    const userImg = document.createElement('img');
    userImg.src = json.avatar_url;
    userImg.alt = 'user_avatar_image';
    div.append(userImg);
    document.body.append(setDate);
  }
  )
  .catch(err => console.log('Information not available'));