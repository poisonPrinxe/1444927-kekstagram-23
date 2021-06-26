function putPicturesOnWebsite (pictures) {
  const imageTemplate = document.querySelector('#picture');
  const picturesBlock = document.querySelector('.pictures');
  const picturesOnWebsite = [];
  const fragment = document.createDocumentFragment();
  for (let counter = 0; counter < pictures.length; counter++) {
    picturesOnWebsite[counter] = imageTemplate.content.cloneNode(true);
    picturesOnWebsite[counter].querySelector('.picture').id = counter;
    picturesOnWebsite[counter].querySelector('.picture__img').src = pictures[counter].url;
    picturesOnWebsite[counter].querySelector('.picture__img').alt = pictures[counter].description;
    picturesOnWebsite[counter].querySelector('.picture__comments').textContent = pictures[counter].comments.length;
    picturesOnWebsite[counter].querySelector('.picture__likes').textContent = pictures[counter].likes;
    picturesOnWebsite[counter].querySelector('.picture').addEventListener('click', function () {
      const bigPicture = document.querySelector('.big-picture');
      bigPicture.querySelector('img').src = pictures[counter].url;
      bigPicture.querySelector('.likes-count').textContent = pictures[counter].likes;
      bigPicture.querySelector('.comments-count').textContent = pictures[counter].comments.length;
      bigPicture.querySelector('.social__caption').textContent = pictures[counter].description;
      const commentTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
      const comments = [];
      bigPicture.querySelector('.social__comments').innerHTML = '';
      for (let counterSecond = 0; counterSecond < pictures[counter].comments.length; counterSecond++) {
        comments[counterSecond] = commentTemplate.cloneNode(true);
        comments[counterSecond].querySelector('img').src = pictures[counter].comments[counterSecond].avatar;
        comments[counterSecond].querySelector('img').alt = pictures[counter].comments[counterSecond].name;
        comments[counterSecond].querySelector('.social__text').textContent = pictures[counter].comments[counterSecond].message;
        bigPicture.querySelector('.social__comments').appendChild(comments[counterSecond]);
      }
      document.body.classList.add('modal-open');
      bigPicture.querySelector('.cancel').addEventListener('click', function () {
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
      });
      window.addEventListener('keydown', function (event) {
        if (event.defaultPrevented) {
          return;
        }
        switch (event.key) {
          case 'Escape':
            bigPicture.classList.add('hidden');
            document.body.classList.remove('modal-open');
            break;
        }
        event.preventDefault();
      }, true);
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    });

    fragment.appendChild(picturesOnWebsite[counter]);
  }
  picturesBlock.appendChild(fragment);
}

export {putPicturesOnWebsite};
