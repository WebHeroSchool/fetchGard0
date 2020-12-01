let userName = window.location.search;
let url = `https://api.github.com/users/`;
let user = 'Gard0';

function searchName() {
  if (userName) {
    user = userName.lastIndexOf('=') !== -1 ?
      (userName.slice(1, userName.lastIndexOf('='))) :
      (userName.slice(1));
  }
};
searchName(userName);


setTimeout(function () {
  let preloader = document.querySelector('.loader');
  preloader.classList.add('invisible');

  let date = new Date();
  let setDate = new Promise((resolve, reject) => { (date ? resolve(date) : reject('Время не опредено')); });
  let getUrl = new Promise((resolve, reject) => { (url ? resolve(url) : reject('URL не найден')); });
  let getName = new Promise((resolve, reject) => { (user ? resolve(user) : reject('Пользователь не найден')); });

  Promise.all([getUrl, getName, setDate])
    .then(([url, user]) => fetch(`${url}${user}`))
    .then(res => res.json())
    .then(json => {
      const div = document.createElement('div');
      document.body.append(div);
      const userName = document.createElement('a');
      if (json.name !== undefined) {
        userName.textContent = json.name;
        userName.href = json.html_url;
      } else {
        userName.textContent = "Information undefined."
      };
      div.append(userName);
      const userBio = document.createElement('h3');
      userBio.textContent = json.bio;
      div.append(userBio);
      const userImg = document.createElement('img');
      userImg.src = json.avatar_url;
      div.append(userImg);
      const userDate = document.createElement('h3');
      userDate.textContent = date;
      div.append(userDate);
    }
    )
    .catch();
}, 4000);