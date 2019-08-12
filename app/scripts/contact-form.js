let alertMessageEl = document.getElementsByClassName('alert-message')[0];

function resetForm() {
  window.setTimeout(() => {
    alertMessageEl.classList.remove('visible');
  }, 5000);
  document.getElementById('email').value = '';
  document.getElementById('name').value = '';
  document.getElementById('message').value = '';
}

function sendData(url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.addEventListener('load', onSuccess);
  xhr.addEventListener('error', onError);
  xhr.send(data);
}

function onError(evt) {
  alertMessageEl.textContent = 'Message sent!';
  alertMessageEl.classList.add('visible', 'success');
  resetForm();
}

function onSuccess(evt) {
  alertMessageEl.textContent = 'Uh oh, something went wrong. :/';
  alertMessageEl.classList.add('visible', 'error');
  resetForm();
}

export function setup() {
  let formEl = document.getElementsByClassName('contact-form')[0];
  formEl.addEventListener('submit', function(evt) {
    evt.preventDefault();
    sendData(formEl.attributes.action.value, new FormData(formEl));
  });
}
