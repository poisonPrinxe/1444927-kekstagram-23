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

    picturesOnWebsite[counter].querySelector('.picture').addEventListener('click', () => {

      const bigPicture = document.querySelector('.big-picture');
      bigPicture.querySelector('img').src = pictures[counter].url;
      bigPicture.querySelector('.likes-count').textContent = pictures[counter].likes;
      bigPicture.querySelector('.comments-count').textContent = pictures[counter].comments.length;
      bigPicture.querySelector('.social__caption').textContent = pictures[counter].description;
      const commentTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
      const comments = [];
      bigPicture.querySelector('.social__comments').innerHTML = '';
      const commentGroupsAmount = Math.ceil(pictures[counter].comments.length / 5);
      const commentGroups = [];

      for (let counterCommentGroups = 0; counterCommentGroups < commentGroupsAmount; counterCommentGroups++) {
        commentGroups[counterCommentGroups] = pictures[counter].comments.slice(counterCommentGroups * 5, (counterCommentGroups + 1) * 5);
      }
      let commentGroupCurrent = 0;

      function loadComments () {
        for (let counterSecond = 0; counterSecond < commentGroups[commentGroupCurrent].length; counterSecond++) {
          comments[counterSecond] = commentTemplate.cloneNode(true);
          comments[counterSecond].querySelector('img').src = commentGroups[commentGroupCurrent][counterSecond].avatar;
          comments[counterSecond].querySelector('img').alt = commentGroups[commentGroupCurrent][counterSecond].name;
          comments[counterSecond].querySelector('.social__text').textContent = commentGroups[commentGroupCurrent][counterSecond].message;
          bigPicture.querySelector('.social__comments').appendChild(comments[counterSecond]);
        }
        if (commentGroupCurrent + 1 === commentGroups.length) {
          bigPicture.querySelector('.comments-loader').classList.add('hidden');
        }
      }

      loadComments();
      commentGroupCurrent++;

      bigPicture.querySelector('.comments-loader').addEventListener('click', () => {
        loadComments();
        commentGroupCurrent++;
      });

      document.body.classList.add('modal-open');

      bigPicture.querySelector('.cancel').addEventListener('click', () => {
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
        bigPicture.querySelector('.comments-loader').classList.remove('hidden');
      });

      window.addEventListener('keydown', (event) => {
        if (!bigPicture.classList.contains('hidden')) {
          if (event.defaultPrevented) {
            return;
          }
          switch (event.key) {
            case 'Escape':
              bigPicture.classList.add('hidden');
              document.body.classList.remove('modal-open');
              bigPicture.querySelector('.comments-loader').classList.remove('hidden');
              break;
          }
          event.preventDefault();
        }
      });

      bigPicture.classList.remove('hidden');

    });

    fragment.appendChild(picturesOnWebsite[counter]);

  }

  picturesBlock.appendChild(fragment);

}

export {putPicturesOnWebsite};
