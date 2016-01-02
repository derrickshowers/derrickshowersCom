import $ from 'jquery';
import _ from 'underscore';

function isValidEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isFieldEmpty(el) {
  let $el = $(el);
  return ($el.val()) ? false : true;
}

function ProcessForm(formEl, types) {
  this.$formEl = $(formEl);
  let formElements = this.$formEl.find(types);
  this.formElementsObj = formElements.map((i, el) => {
    return {
      el,
      error: false,
      text: ''
    };
  });
  this.$formEl.on('submit', evt => {
    this.handleSubmit.call(this, evt);
    this.formElementsObj.each((i, elObj) => {
      $(elObj.el).on('keydown', _.throttle(evt => {
        window.setTimeout(() => {
          this.checkElForError(elObj);
          this.renderErrors();
        }, 0);
      }, 500));
    });
  });
  return this;
}

ProcessForm.prototype = {
  checkForErrors() {
    let numOfErrors = 0;
    this.formElementsObj.each((i, elObj) => {
      if (this.checkElForError(elObj).error) {
        numOfErrors++;
      }
    });
    return numOfErrors > 0;
  },
  checkElForError(elObj) {
    if (isFieldEmpty(elObj.el)) {
      elObj.error = true;
    } else {
      elObj.error = false;
      if ($(elObj.el).attr('type') === 'email' && !isValidEmail($(elObj.el).val())) {
        elObj.error = true;
      }
    }
    return elObj;
  },
  renderErrors() {
    this.formElementsObj.each((i, elObj) => {
      if (elObj.error) {
        $(elObj.el).addClass('error');
      } else {
        $(elObj.el).removeClass('error');
      }
    });
  },
  resetForm() {
    this.formElementsObj.each((i, elObj) => {
      $(elObj.el).val('');
    });
  },
  submitForm() {
    let $submitButton = this.$formEl.find('button');
    $submitButton.prop('disabled', true);
    return $.post(this.$formEl.attr('action'), this.$formEl.serialize()).always(() => {
      $submitButton.prop('disabled', false);
    });
  },
  handleSubmit(evt) {
    let $alertMessageEl = $('.alert-message');
    evt.preventDefault();
    if (!this.checkForErrors()) {
      this.submitForm().then(data => {
        $alertMessageEl.text('Message sent!');
        $alertMessageEl.addClass('visible success');
        this.resetForm();
        window.setTimeout(() => {
          $alertMessageEl.removeClass('visible');
        }, 5000);
      }, (jqXHR) => {
        $alertMessageEl.text('Uh oh, something went wrong. :/');
        $alertMessageEl.addClass('visible error');
        window.setTimeout(() => {
          $alertMessageEl.removeClass('visible');
        }, 5000);
      });
    }
    this.renderErrors();
  }
};

export default ProcessForm;
