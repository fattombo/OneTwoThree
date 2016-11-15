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
        getPage('workspace.html', initLesson);
    }
    if(el.id === 'btn-info') {
      getPage('info.html');
    }
    if(el.id === 'btn-add') {
      getPage('add.html');
    }
    if (el.id === 'btn-result') {
      getPage('result.html');
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





  // JSON DATA IMPORT
  function getJSON(callback, file) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");

    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
  }


  function initLearn() {
    getJSON(function(response) {
    // Parse JSON string into object
      var obj = JSON.parse(response);

      var catName     = document.querySelector('.category__name');
      var catImg      = document.querySelector('.category__img');
      var prevCatBtn  = document.querySelector('.prevBtn');
      var nextCatBtn  = document.querySelector('.nextBtn');

      catName.textContent = Object.keys(obj)[0];
      catImg.style.backgroundImage = 'url(../images/' + obj.animals[2].file + ')';

      if (prevCatBtn !== null) {
        prevCatBtn.addEventListener('click', function() {
          catName.textContent = Object.keys(obj)[0];
          catImg.style.backgroundImage = 'url(../images/' + obj.animals[2].file + ')';
        });
      }
      if (nextCatBtn !== null) {
        nextCatBtn.addEventListener('click', function() {
          catName.textContent = Object.keys(obj)[1];
          catImg.style.backgroundImage = 'url(../images/' + obj.fruits[0].file + ')';
        });
      }
    }, 'category.json');
  }


  function initLesson() {

    // create category object
    var lesson = {
      category: 'animals',
      entry: [
        {word: 'dog', file: 'dog.png'},
        {word: 'bird', file: 'bird.png'},
        {word: 'fox', file: 'fox.png'}
      ]
    };

    var counter = 0;
    var max = lesson.entry.length - 1;

    var catName     = document.querySelector('.header__title');
    var elementName = document.querySelector('.element__name');
    var elementImg  = document.querySelector('.element__img');
    var prevCatBtn  = document.querySelector('.prevBtn');
    var nextCatBtn  = document.querySelector('.nextBtn');
    var nextStep    = document.querySelector('.nextStep');
    var stepInd     = document.querySelectorAll('.header__indicator__step');

    console.log(stepInd);


    function loadEntry(i) {
      catName.textContent = 'Check all ' +  lesson.category;
      elementImg.style.backgroundImage = 'url(../images/' + lesson.entry[i].file + ')';
      elementName.textContent = lesson.entry[i].word;
      stepInd[i].innerHTML = '<img class="scale" src="images/icons/star.svg" alt="" />';
      if (i === 0) {
        prevCatBtn.style.visibility = 'hidden';
      } else if (i === max) {
        nextCatBtn.style.display = 'none';
        nextStep.style.display = 'block';
      } else {
        prevCatBtn.style.visibility = 'visible';
        nextCatBtn.style.display = 'block';
        nextStep.style.display = 'none';
      }
    }

    loadEntry(counter);

    prevCatBtn.addEventListener('click', function() {
      counter--;
      loadEntry(counter);
    });

    nextCatBtn.addEventListener('click', function() {
      counter++;
      loadEntry(counter);
    });

    nextStep.addEventListener('click', function() {

    });


  }








  function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      // Make the request
      req.send();
    });
  }

  // get('category.json').then(JSON.parse).then(function(response) {
  //   console.log('Yeah!' + response);
  // });

  function getCatJSON(url) {
    return get(url).then(JSON.parse);
  }
});
