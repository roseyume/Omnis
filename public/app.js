const submitButton = document.getElementById('submitButton');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotOutput = document.getElementById('chatbotOutput');

submitButton.onclick = userSubmitEventHandler;
chatbotInput.onkeyup = userSubmitEventHandler;

function userSubmitEventHandler(event)
{
  if ((event.keyCode && event.keyCode === 13) || event.type === 'click')
  {
    chatbotOutput.innerText = 'thinking...';
    askChatBot(chatbotInput.value);
  }
}

function askChatBot(userInput)
{
  const myRequest = new Request('/', {
    method: 'POST',
    body: userInput
  });

  withTimeout(5000, 
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
  })
  )
  .then(doSomething)
  .catch(handleError);
}

function withTimeout(msecs, promise) {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, msecs);
  });
  return Promise.race([timeout, promise]);
}
