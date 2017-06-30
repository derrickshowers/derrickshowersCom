import ProcessForm from 'process-form';
import $ from 'jquery';

function init() {
  let fieldTypes = 'input[type="text"], input[type="email"], textarea';
  let $alertMessageEl = $('.alert-message');
  let $submitMessageEl = $('#submit')

  // Before submitting form, make sure it's a real person
  $submitMessageEl.on('click', function() {
    grecaptcha.execute();
  });

  let contactForm = new ProcessForm($('.contact-form'), fieldTypes, function(data) {
    $alertMessageEl.text('Message sent!');
    $alertMessageEl.addClass('visible success');
    this.resetForm();
    window.setTimeout(() => {
      $alertMessageEl.removeClass('visible');
    }, 5000);
  }, function(jqXHR) {
    $alertMessageEl.text('Uh oh, something went wrong. :/');
    $alertMessageEl.addClass('visible error');
    window.setTimeout(() => {
      $alertMessageEl.removeClass('visible');
    }, 5000);
  });

  // Register a service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.offline) {
        $('body').addClass('offline');
        $('button').prop('disabled', true);
      }
    });
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration success: ', registration);
    }).catch(function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}

init();
