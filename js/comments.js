'use strict';

window.comments = (function () {
  var QUANTITY__COMMENTS = 5;

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var socialComments = document.querySelector('.social__comments');
  var socialComment = document.querySelector('.social__comment');

  var createComments = function (commentData) {
    var commentsElement = socialComment.cloneNode(true);

    var commentAvatar = commentsElement.querySelector('.social__picture');
    commentAvatar.setAttribute('src', commentData.avatar);
    commentAvatar.setAttribute('alt', commentData.name);

    var commentText = commentsElement.querySelector('.social__text');
    commentText.textContent = commentData.message;

    return commentsElement;
  };

  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY__COMMENTS; i++) {
      var comment = comments[i];
      var commentElement = createComments(comment);
      fragment.appendChild(commentElement);
    }

    socialComments.innerHTML = '';
    socialComments.appendChild(fragment);
  };

  return {
    renderComments: renderComments
  };

})();
