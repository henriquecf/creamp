var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

function proposalsCtrl($scope) {
  xmlhttp.open("GET","http://photos-api.herokuapp.com/images.json?user_id=2&gallery_id=2",false);
  xmlhttp.send();
  $scope.photos=JSON.parse(xmlhttp.response);
}

function photosCtrl($scope) {
  xmlhttp.open("GET","http://photos-api.herokuapp.com/images.json?user_id=2&gallery_id=3",false);
  xmlhttp.send();
  $scope.photos=JSON.parse(xmlhttp.response);
}