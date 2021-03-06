var itemID = '';
function incrementDownloadCount() {
  $.ajax({
    type: 'GET',
    url: '/uploads/id/' + itemID + '/downloadCount',
    dataType: 'json',
  })
  .done(function() {
    return;
  })
  .fail(function() {
    return;
  });
};

function requestItemInfo(item) {
  $.ajax({
    type: 'GET',
    url: '/uploads/info/' + item,
    dataType: 'json',
  })
  .done(function(data){
    renderItem(data.item);
  })
  .fail(function() {
  window.location.href = "/error.html";
  });
}

var itemPageTemplate =
  '<div class="item-content">' +
      '<div id="img-wrapper">' +
          '<img id="preview-img">' +
      '</div>' +
      '<div class="item-info-wrapper">' +
          '<div class="item-content-header">' +
              '<h1 id="item-name"></h1>' +
              '<form method="GET" id="download-form">' +
                '<button class="download-button" type="submit" name="button">Download</button>' +
              '</form>' +
          '</div>' +
          '<h3 id="item-creator">By </h2>' +
          '<h3 id="item-upload-date"></h3>' +
          '<h3 id="item-download-count"></h3>' +
          '<h3 id="description-header">Description</h3>' +
          '<hr>' +
          '<p id="item-description"></p>' +
      '</div>' +
  '</div>';


function renderItem(item) {
  var element = $(itemPageTemplate);
  element.find('#preview-img').attr('src', item.imgLocation);
  element.find('#preview-img').attr('alt', item.name + '-preivew');
  element.find('#item-name').text(item.name);
  element.find('#download-form').attr('action', item.fileLocation);
  element.find('#item-creator').append('<p class="item-creator-name">' + item.creator + '</p>');
  element.find('#item-upload-date').text(item.uploadDate);
  element.find('#item-download-count').text('Total Downloads: ' + item.downloadCount);
  element.find('#item-description').text(item.description);
  $('title').text('MXS DB | ' + item.name);
  $('.container').append(element);
}

function watchForDownload() {
  $('.container').on('click', '.download-button', function(event) {
    incrementDownloadCount();
  });
}

// READY FUNCTION
$(function() {
  itemID  = window.location.pathname;
  itemID = itemID.substring(12);
  requestItemInfo(itemID);
  watchForDownload();

  $('logo-img').attr('src', 'localhost:8080/public/assets/images/MXSDB.svg');
});
