function putPicturesOnWebsite (pictures) {
  const IMAGE_TEMPLATE = document.querySelector('#picture');
  const picturesOnWebsite = []
  for (let counter = 0; counter < pictures.length; counter++) {
    picturesOnWebsite[counter] = IMAGE_TEMPLATE.cloneNode(true);
    console.log(picturesOnWebsite[counter].querySelector('.picture__img'));
    console.log(picturesOnWebsite[counter].querySelector('.picture__comments'));
    console.log(picturesOnWebsite[counter].querySelector('.picture__likes'));

    console.log(picturesOnWebsite[counter]);
  }
}

export {putPicturesOnWebsite};
