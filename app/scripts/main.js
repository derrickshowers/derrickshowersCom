import ProcessForm from 'process-form';
import $ from 'jquery';
import style from '../scss/main.scss';

function init() {
  let $alertMessageEl = $('.alert-message');

  $('.contact-form').submit(function(e) {
    e.preventDefault();

    var $form = $(this);

    $.post($form.attr('action'), $form.serialize()).then(function() {
      $alertMessageEl.text('Message sent!');
      $alertMessageEl.addClass('visible success');
      this.resetForm();
      window.setTimeout(() => {
        $alertMessageEl.removeClass('visible');
      }, 5000);
    }, function() {
      $alertMessageEl.text('Uh oh, something went wrong. :/');
      $alertMessageEl.addClass('visible error');
      window.setTimeout(() => {
        $alertMessageEl.removeClass('visible');
      }, 5000);
    });
  });
}

// Register a service worker
/**
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
**/

init();
