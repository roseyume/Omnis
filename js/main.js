
function openNav() {
  document.getElementById("sideNav").style.display = "block";
}

function closeNav() {
  document.getElementById("sideNav").style.display = "none";
}

function sendUserResponse() {
  console.log("senduserresponse called");
  var response = document.getElementById("userResponse").value;
  console.log(response);
  document.getElementById("userResponse").innerHTML = "";

  
  var para = document.createElement("p");
  para.innerHTML = response;
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
  

}