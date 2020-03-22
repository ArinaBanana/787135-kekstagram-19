'use strict';

window.comments = (function () {
  var LIMIT_COMMENTS = 5;

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var socialComments = document.querySelector('.social__comments');
  var socialComment = document.querySelector('.social__comment');

  var create = function (commentData) {
    var commentsElement = socialComment.cloneNode(true);

    var commentAvatar = commentsElement.querySelector('.social__picture');
    commentAvatar.setAttribute('src', commentData.avatar);
    commentAvatar.setAttribute('alt', commentData.name);

    var commentText = commentsElement.querySelector('.social__text');
    commentText.textContent = commentData.message;

    return commentsElement;
  };

  var renderCountComments = function (current, total) {
    socialCommentCount.innerHTML = current + ' из ' + '<span class="comments-count">' + total + '</span>' + ' комментариев';
  };

  var render = function (comments) {
    var countComments = comments.length;
    var countShown = 0;
    socialComments.innerHTML = '';

    if (countComments > LIMIT_COMMENTS) {
      commentsLoader.classList.remove('hidden');
    }

    var appendMore = function () {
      var countRender = LIMIT_COMMENTS;

      if (countShown + countRender > countComments) {
        countRender = countComments - countShown;
      }

      var fragment = document.createDocumentFragment();
      for (var i = countShown; i < countShown + countRender; i++) {
        var comment = comments[i];
        var commentElement = create(comment);
        fragment.appendChild(commentElement);
      }

      socialComments.appendChild(fragment);
      countShown += countRender;
      renderCountComments(countShown, countComments);

      if (countShown === countComments) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', loadMoreHandler);
      }
    };

    appendMore();

    var loadMoreHandler = function () {
      appendMore();
    };

    commentsLoader.addEventListener('click', loadMoreHandler);
  };

  return {
    render: render
  };

})();
