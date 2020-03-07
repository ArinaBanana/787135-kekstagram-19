'use strict';

window.renderComments = (function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');

  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  var socialComments = document.querySelector('.social__comments');

  var socialComment = document.querySelector('.social__comment');

  var comments = window.renderPhotos.photos[0].comments;

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

  return {
    renderComments: renderComments,
    comments: comments
  };

})();
