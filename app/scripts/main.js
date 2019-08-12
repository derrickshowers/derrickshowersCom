import style from '../scss/main.scss';

function init() {
  updateFooter();
  setupform();
}

function setupform() {
  let formEl = document.getElementsByClassName('contact-form')[0];
  let alertMessageEl = document.getElementsByClassName('alert-message')[0];
  formEl.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let formData = new FormData(formEl);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', formEl.attributes.action.value);
    xhr.addEventListener('load', function(evt) {
      alertMessageEl.textContent = 'Message sent!';
      alertMessageEl.classList.add('visible', 'success');
      resetForm();
      window.setTimeout(() => {
        alertMessageEl.classList.remove('visible');
      }, 5000);
    });
    xhr.addEventListener('error', function(evt) {
      alertMessageEl.textContent = 'Uh oh, something went wrong. :/';
      alertMessageEl.classList.add('visible', 'error');
      resetForm();
      window.setTimeout(() => {
        alertMessageEl.classList.remove('visible');
      }, 5000);
    });
    xhr.send(nformData);
  });
}

function updateFooter() {
  const currentYear = new Date().getFullYear();
  const footertext = '\u00A9' + currentYear + ' Derrick Showers';
  document.getElementsByTagName('footer')[0].textContent = footertext;
}

function resetForm() {
  document.getElementById('email').value = '';
  document.getElementById('name').value = '';
  document.getElementById('message').value = '';
}

init();
