function putPicturesOnWebsite (pictures) {

  const imageTemplate = document.querySelector('#picture');
  const picturesBlock = document.querySelector('.pictures');
  const picturesOnWebsite = [];
  const fragment = document.createDocumentFragment();

  for (let counter = 0; counter < pictures.length; counter++) {

    const pictureBase = pictures[counter];
    let currentPicture = picturesOnWebsite[counter];

    currentPicture = imageTemplate.content.cloneNode(true);
    currentPicture.querySelector('.picture').id = counter;
    currentPicture.querySelector('.picture__img').src = pictureBase.url;
    currentPicture.querySelector('.picture__img').alt = pictureBase.description;
    currentPicture.querySelector('.picture__comments').textContent = pictureBase.comments.length;
    currentPicture.querySelector('.picture__likes').textContent = pictureBase.likes;

    currentPicture.querySelector('.picture').addEventListener('click', () => {

      const bigPicture = document.querySelector('.big-picture');
      const commentsLoader = bigPicture.querySelector('.comments-loader');
      bigPicture.querySelector('img').src = pictureBase.url;
      bigPicture.querySelector('.likes-count').textContent = pictureBase.likes;
      bigPicture.querySelector('.comments-count').textContent = pictureBase.comments.length;
      bigPicture.querySelector('.social__caption').textContent = pictureBase.description;
      const commentTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
      const comments = [];
      bigPicture.querySelector('.social__comments').innerHTML = '';
      const commentGroupsAmount = Math.ceil(pictureBase.comments.length / 5);
      const commentGroups = [];

      for (let counterCommentGroups = 0; counterCommentGroups < commentGroupsAmount; counterCommentGroups++) {
        commentGroups[counterCommentGroups] = pictureBase.comments.slice(counterCommentGroups * 5, (counterCommentGroups + 1) * 5);
      }
      let commentGroupCurrent = 0;
      let commentsNow = 0;

      function loadComments () {
        for (let counterSecond = 0; counterSecond < commentGroups[commentGroupCurrent].length; counterSecond++) {
          comments[counterSecond] = commentTemplate.cloneNode(true);
          comments[counterSecond].querySelector('img').src = commentGroups[commentGroupCurrent][counterSecond].avatar;
          comments[counterSecond].querySelector('img').alt = commentGroups[commentGroupCurrent][counterSecond].name;
          comments[counterSecond].querySelector('.social__text').textContent = commentGroups[commentGroupCurrent][counterSecond].message;
          bigPicture.querySelector('.social__comments').appendChild(comments[counterSecond]);
        }
        if (commentGroupCurrent + 1 === commentGroups.length) {
          commentsLoader.classList.add('hidden');
        }
        commentsNow += commentGroups[commentGroupCurrent].length;
        bigPicture.querySelector('.current-comments-count').textContent = commentsNow;
        commentGroupCurrent++;
      }

      loadComments();
      commentsLoader.addEventListener('click', loadComments);

      document.body.classList.add('modal-open');

      function closeBigPicture () {
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
        bigPicture.querySelector('.comments-loader').classList.remove('hidden');
        bigPicture.querySelector('.comments-loader').removeEventListener('click', loadComments);
      }

      bigPicture.querySelector('.cancel').addEventListener('click', closeBigPicture);

      window.addEventListener('keydown', (event) => {
        if (!bigPicture.classList.contains('hidden')) {
          if (event.defaultPrevented) {
            return;
          }
          switch (event.key) {
            case 'Escape':
              closeBigPicture();
              break;
          }
          event.preventDefault();
        }
      });

      bigPicture.classList.remove('hidden');

    });

    fragment.appendChild(currentPicture);

  }

  picturesBlock.appendChild(fragment);

}

export {putPicturesOnWebsite};
