const formMethod = 'POST';
let alertMessageEl;

function resetForm() {
  window.setTimeout(() => {
    alertMessageEl.classList.remove('visible');
  }, 5000);
  document.getElementById('email').value = '';
  document.getElementById('name').value = '';
  document.getElementById('message').value = '';
}

function sendData(url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open(formMethod, url);
  xhr.addEventListener('load', onSuccess);
  xhr.addEventListener('error', onError);
  xhr.send(data);
}

function onSuccess(evt) {
  alertMessageEl.textContent = 'Message sent!';
  alertMessageEl.classList.add('visible', 'success');
  resetForm();
}

function onError(evt) {
  alertMessageEl.textContent = 'Uh oh, something went wrong. :/';
  alertMessageEl.classList.add('visible', 'error');
  resetForm();
}

export function setup() {
  alertMessageEl = document.getElementsByClassName('alert-message')[0];
  const formEl = document.getElementsByClassName('contact-form')[0];
  formEl.addEventListener('submit', function(evt) {
    evt.preventDefault();
    sendData(formEl.attributes.action.value, new FormData(formEl));
  });
}
