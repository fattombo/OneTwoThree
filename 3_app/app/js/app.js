document.addEventListener('DOMContentLoaded', function() {

  var appWrapper  = document.getElementById('app-wrapper');

  document.getElementById('btn-start').addEventListener('click', function(e) {
    e.preventDefault();
    getPage('learn.html', initLearn);
  });

  appWrapper.addEventListener('click', function(e) {
    e.preventDefault();
    var el = e.target;
    if(el.id === 'btn-toStart') {
        getPage('learn.html', initLearn);
    }
    if(el.id === 'btn-learn') {
        getPage('one.html');
    }
    if(el.id === 'btn-info') {
      getPage('info.html');
    }
    if(el.id === 'btn-add') {
      getPage('add.html');
    }
  });

  function getPage(url, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200){
        appWrapper.innerHTML = this.responseText;
        if (typeof callback !== 'undefined') {
          callback();
        }
      } else {
        appWrapper.innerHTML = '<h1>Loading...</h1>';
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }





  // json databese load
  function getJSON(callback, file) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");

    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
  }

  function initLearn() {
    getJSON(function(response) {
    // Parse JSON string into object
      var obj = JSON.parse(response);

      var catName = document.querySelector('.category__name');
      var catImg  = document.querySelector('.category__img');

      catName.textContent = Object.keys(obj)[0];
      catImg.style.backgroundImage = 'url(../images/' + obj.animals[0].file + ')';

    }, 'category.json');
  }


});
