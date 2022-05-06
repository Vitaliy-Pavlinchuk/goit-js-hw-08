import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const FEEDBACK = 'feedback-form-state';

const formData = {};

if (localStorage.getItem(FEEDBACK)) {
  const data = JSON.parse(localStorage.getItem(FEEDBACK));

  form.elements.email.value = data.email;
  form.elements.message.value = data.message;
}

const saveFormData = () => {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;

  localStorage.setItem(FEEDBACK, JSON.stringify(formData));
};

const clearStorage = () => {
  localStorage.removeItem(FEEDBACK);
};

const sendFeedback = e => {
  e.preventDefault();
  form.reset();
  console.log(JSON.parse(localStorage.getItem(FEEDBACK)));
  clearStorage();
};

form.addEventListener('submit', sendFeedback);
form.addEventListener('input', throttle(saveFormData, 500));
