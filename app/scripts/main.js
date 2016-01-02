import ProcessForm from './process-form';
import $ from 'jquery';

function init() {
  let fieldTypes = 'input[type="text"], input[type="email"], textarea';
  let $alertMessageEl = $('.alert-message');
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
}

init();
