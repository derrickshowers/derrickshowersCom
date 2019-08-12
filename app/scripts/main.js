import style from '../scss/main.scss';
import { setup as setupContactForm } from './contact-form';

function init() {
  updateFooter();
  setupContactForm();
}

function updateFooter() {
  const currentYear = new Date().getFullYear();
  const footerText = '\u00A9' + currentYear + ' Derrick Showers';
  document.getElementsByTagName('footer')[0].textContent = footerText;
}

init();
