
let url = `https://api.github.com/users/Gard0`;

fetch(url)
  .then(res => res.json())
  .then(json => {
    const div = document.createElement('div');
    document.body.append(div);

    const userName = document.createElement('a');
    if (json.name !== null) {
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