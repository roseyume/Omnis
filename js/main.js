app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

 // Request headers you wish to allow
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token, language');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next(); 
});

function openNav() {
  document.getElementById("sideNav").style.display = "block";
}

function closeNav() {
  document.getElementById("sideNav").style.display = "none";
}

function sendUserResponse() {
  console.log("senduserresponse called");
  var request = document.getElementById("userResponse").value;
  console.log(request);
  document.getElementById("userResponse").innerHTML = "";

  
  var para = document.createElement("p");
  para.innerHTML = request;
  para.setAttribute('class','chat-message guest');
  var photo = document.createElement("div");
  photo.setAttribute('class','guest user-photo');
  var message = document.createElement("div");
  message.setAttribute('class','chat');
  message.appendChild(photo);
  message.appendChild(para);
  var log = document.getElementById("chatlog");
  log.append(message);

  log.scrollTop = log.scrollHeight;

  omnisRespond(request);
  
}

function buildResponse (response) {
  var para = document.createElement("p");
  para.innerHTML = response;
  para.setAttribute('class','chat-message omnis');
  var photo = document.createElement("div");
  photo.setAttribute('class','omnis user-photo');
  var message = document.createElement("div");
  message.setAttribute('class','chat');
  message.appendChild(photo);
  message.appendChild(para);
  var log = document.getElementById("chatlog");
  log.append(message);

  log.scrollTop = log.scrollHeight;
}

function omnisRespond( request ) {
  var response = findAnswer(request);
}

function findAnswer( request ) {
  console.log(request);
  const myRequest = new Request('http://127.0.0.1:8000/', {
    method: 'POST',
    body: request
  });
  console.log(myRequest);


  fetch(myRequest).then(function(response)
  {
    if (!response.ok)
    {
      throw new Error ('HTTP error, status = ' + response.status);
    }
    else
    {
      return response.text();
    }
  }).then(function(text)
  {
    buildResponse(text);
  }).catch((err) =>
  {
    console.error(err);
  })
  
}
