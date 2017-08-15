import $ from 'jquery';
import contactForm from './contact-form';
import style from '../scss/main.scss';

function init() {
  contactForm();
}

// Register a service worker
// TODO: Reimplement with caching issues fixed
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
