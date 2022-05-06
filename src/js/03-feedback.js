import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const FEEDBACK = 'feedback-form-state';

const formData = localStorage.getItem(FEEDBACK) ? JSON.parse(localStorage.getItem(FEEDBACK)) : {};

Object.keys(formData).forEach(item => (form.elements[item].value = formData[item]));

const saveFormData = e => {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(FEEDBACK, JSON.stringify(formData));
};

const sendFeedback = e => {
  e.preventDefault();
  const formInputNames = Object.keys(e.currentTarget.elements).filter(item => isNaN(item));
  if (!formInputNames.every(item => e.currentTarget.elements[item].value)) {
    alert('Заповніть усі поля форми!!!');
    return;
  }
  form.reset();
  console.log(JSON.parse(localStorage.getItem(FEEDBACK)));
  localStorage.removeItem(FEEDBACK);
};

form.addEventListener('submit', sendFeedback);
form.addEventListener('input', throttle(saveFormData, 500));
