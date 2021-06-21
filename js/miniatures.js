function putPicturesOnWebsite (pictures) {
  const IMAGE_TEMPLATE = document.querySelector('#picture');
  const picturesBlock = document.querySelector('.pictures');
  const picturesOnWebsite = [];
  for (let counter = 0; counter < pictures.length; counter++) {
    picturesOnWebsite[counter] = IMAGE_TEMPLATE.content.cloneNode(true);
    picturesOnWebsite[counter].querySelector('.picture__img').src = pictures[counter].url;
    picturesOnWebsite[counter].querySelector('.picture__comments').textContent = pictures[counter].comments.length;
    picturesOnWebsite[counter].querySelector('.picture__likes').textContent = pictures[counter].likes;

    picturesBlock.appendChild(picturesOnWebsite[counter]);
  }
}

export {putPicturesOnWebsite};
