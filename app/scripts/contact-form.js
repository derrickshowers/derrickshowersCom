import $ from 'jquery';
import ProcessForm from 'process-form';

let $alertMessageEl = $('.alert-message');

function success() {
  $alertMessageEl.text('Message sent!');
  $alertMessageEl.addClass('visible success');
  this.resetForm()
  window.setTimeout(() => {
    $alertMessageEl.removeClass('visible');
  }, 5000);
}

function failure() {
  $alertMessageEl.text('Uh oh, something went wrong. :/');
  $alertMessageEl.addClass('visible error');
  window.setTimeout(() => {
    $alertMessageEl.removeClass('visible');
  }, 5000);
}

export default function() {
  let $form = $('.contact-form');
  let fieldTypes = 'input[type="text"], input[type="email"], textarea';

  return new ProcessForm($form, fieldTypes, success, failure);
}
