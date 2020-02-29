'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');

var TEXT_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var getRandomNumber = function (a, b) {
  return Math.floor(Math.random() * (b - a) + a);
};

var getUrlImage = function (numPhoto) {
  var urlImage = 'photos/' + numPhoto + '.jpg';
  return urlImage;
};

var getDescriptionImage = function () {
  var descriptionImage = 'Описание фотографии';
  return descriptionImage;
};

var getRandomLikes = function () {
  var likes = getRandomNumber(MIN_LIKES, MAX_LIKES);
  return likes;
};

var getAvatar = function () {
  var numAvatar = getRandomNumber(1, 6);
  var urlAvatar = 'img/avatar-' + numAvatar + '.svg';
  return urlAvatar;
};

var getUserName = function (names) {
  var nameIndex = getRandomNumber(0, names.length);
  return names[nameIndex];
};

var getMessage = function (phrases) {
  var phraseIndex = getRandomNumber(0, phrases.length);
  return phrases[phraseIndex];
};

var getComment = function () {
  var comment = {
    avatar: getAvatar(),
    message: getMessage(TEXT_COMMENTS),
    name: getUserName(NAMES)
  };

  return comment;
};

var getComments = function () {
  var comments = [];

  for (var i = 0; i < 2; i++) {
    comments.push(getComment());
  }
  return comments;
};

var getPhoto = function (numPhoto) {
  var photo = {
    url: getUrlImage(numPhoto),
    description: getDescriptionImage(),
    likes: getRandomLikes(),
    comments: getComments()
  };

  return photo;
};

var getPhotos = function () {
  var photos = [];

  for (var i = 1; i <= 25; i++) {
    photos.push(getPhoto(i));
  }

  return photos;
};

var createPhotoElement = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  var picture = photoElement.querySelector('.picture__img');
  picture.setAttribute('src', photo.url);

  var pictureComments = photoElement.querySelector('.picture__comments');
  pictureComments.textContent = photo.comments.length;

  var pictureLikes = photoElement.querySelector('.picture__likes');
  pictureLikes.textContent = photo.likes;

  return photoElement;
};

var renderPhotos = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    var imageElement = createPhotoElement(photo);
    fragment.appendChild(imageElement);
  }

  pictures.appendChild(fragment);
};

var photos = getPhotos();
renderPhotos(photos);

// module3-task3
var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

var body = document.querySelector('body');
// body.classList.add('modal-open');

var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

var bigImage = document.querySelector('.big-picture__img img');
var countLikes = document.querySelector('.likes-count');
var countComments = document.querySelector('.comments-count');
var socialCaption = document.querySelector('.social__caption');
var socialComments = document.querySelector('.social__comments');

var socialComment = document.querySelector('.social__comment');

var comments = photos[0].comments;

var createComments = function (commentData) {
  var commentsElement = socialComment.cloneNode(true);

  var commentAvatar = commentsElement.querySelector('.social__picture');
  commentAvatar.setAttribute('src', commentData.avatar);
  commentAvatar.setAttribute('alt', commentData.name);

  var commentText = commentsElement.querySelector('.social__text');
  commentText.textContent = commentData.message;

  return commentsElement;
};

var renderComments = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    var commentElement = createComments(comment);
    fragment.appendChild(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);

  // socialComments.replaceChild(fragment, socialComment);
};

var getFirstElement = function () {
  bigImage.setAttribute('src', photos[0].url);
  countLikes.textContent = photos[0].likes;
  countComments.textContent = photos[0].comments.length;
  socialCaption.textContent = photos[0].description;
  renderComments(comments);
};

getFirstElement();
