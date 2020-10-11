
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

function thinking() {
  buildResponse("...");
}

function buildResponse (response) {
  var para = document.createElement("p");
  para.innerHTML = response;
  para.setAttribute('class','chat-message omni');
  var photo = document.createElement("div");
  photo.setAttribute('class','omni user-photo');
  var message = document.createElement("div");
  message.setAttribute('class','chat');
  message.appendChild(photo);
  message.appendChild(para);
  var log = document.getElementById("chatlog");
  log.append(message);

  log.scrollTop = log.scrollHeight;
}

function stopThinking() {
  console.log("stopThinking");
  var log = document.getElementById("chatlog").lastChild.remove();
}

function omnisRespond( request ) {
  thinking();
  var response = findAnswer(request);
  var log = document.getElementById("chatlog").lastChild.innerHTML=response;
  buildResponse(response);
}

function findAnswer( request ) {
  console.log(request);
  const myRequest = new Request('/', {
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
    chatbotInput.value = '';
    chatbotOutput.innerText = text;
  }).catch((err) =>
  {
    console.error(err);
  });
}
