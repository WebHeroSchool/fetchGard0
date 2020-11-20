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

fetch(url + user)
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