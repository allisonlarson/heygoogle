getData();
setInterval(getData, 10000);

function getData() {
  var httpRequest;

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'https://heygoogle.allisonlarson.com/request');
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        responseBody = JSON.parse(httpRequest.response)
        var div = document.createElement('div');
        div.className = 'section';

        var messageDiv = document.createElement('div');
        messageDiv.className = 'msg';
        messageDiv.innerHTML += responseBody["msg"]
        var timeDiv = document.createElement('div');
        timeDiv.className = 'time';
        timeDiv.innerHTML += responseBody["time"]
        div.appendChild(messageDiv);
        div.appendChild(timeDiv);

        parentDiv =  document.getElementById('content')
        parentDiv.insertBefore(div, parentDiv.firstChild);
      }
    }
  }
  makeRequest()
}
