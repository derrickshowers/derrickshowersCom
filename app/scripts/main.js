import ProcessForm from './process-form';
import $ from 'jquery';

function init() {
  let fieldTypes = 'input[type="text"], input[type="email"], textarea';
  let contactForm = new ProcessForm($('.contact-form'), fieldTypes);
}

init();
