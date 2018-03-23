'use strict';

(function () {
var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');
  var photoContainer = document.querySelector('.form__photo-container');
  var imagesChooser = photoContainer.querySelector('#images');
  var uploadBtn = photoContainer.querySelector('.upload');

  var fileTest = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });
    return matches;
  };

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    if (fileTest(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  imagesChooser.addEventListener('change', function () {
    var file = imagesChooser.files[0];
    if (fileTest(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = document.createElement('img');
        photo.classList.add('form__photo');
        photo.src = reader.result;
        photo.setAttribute('draggable', 'true');
        photoContainer.insertBefore(photo, uploadBtn);
      });
      reader.readAsDataURL(file);
    }
  });
})();
