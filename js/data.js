'use strict';

window.data = (function () {
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
  var LOAD_DATA_URL = 'https://js.dump.academy/kekstagram/data';


  var get = window.http.get;
  var renderPhotos = window.photos.renderPhotos;
  var renderBigPhoto = window.bigPhoto.renderBigPhoto;

  var getUrlImage = function (numPhoto) {
    var urlImage = 'photos/' + numPhoto + '.jpg';
    return urlImage;
  };

  var getDescriptionImage = function () {
    var descriptionImage = 'Описание фотографии';
    return descriptionImage;
  };

  var getRandomLikes = function () {
    var likes = window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES);
    return likes;
  };

  var getAvatar = function () {
    var numAvatar = window.utils.getRandomNumber(1, 6);
    var urlAvatar = 'img/avatar-' + numAvatar + '.svg';
    return urlAvatar;
  };

  var getUserName = function (names) {
    var nameIndex = window.utils.getRandomNumber(0, names.length);
    return names[nameIndex];
  };

  var getMessage = function (phrases) {
    var phraseIndex = window.utils.getRandomNumber(0, phrases.length);
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

  var successHandler = function (data) {
    var photos = data;
    renderPhotos(photos);
    renderBigPhoto(photos[0]);
  };

  var errorHandler = function () {
    console.log('Ошибка');
  };

  get(LOAD_DATA_URL, successHandler, errorHandler);
})();
