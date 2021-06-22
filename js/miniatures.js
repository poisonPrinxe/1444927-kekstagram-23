function putPicturesOnWebsite (pictures) {
  const imageTemplate = document.querySelector('#picture');
  const picturesBlock = document.querySelector('.pictures');
  const picturesOnWebsite = [];
  const fragment = document.createDocumentFragment();
  for (let counter = 0; counter < pictures.length; counter++) {
    picturesOnWebsite[counter] = imageTemplate.content.cloneNode(true);
    picturesOnWebsite[counter].querySelector('.picture__img').src = pictures[counter].url;
    picturesOnWebsite[counter].querySelector('.picture__img').alt = pictures[counter].description;
    picturesOnWebsite[counter].querySelector('.picture__comments').textContent = pictures[counter].comments.length;
    picturesOnWebsite[counter].querySelector('.picture__likes').textContent = pictures[counter].likes;

    fragment.appendChild(picturesOnWebsite[counter]);
  }
  picturesBlock.appendChild(fragment);
}

export {putPicturesOnWebsite};
