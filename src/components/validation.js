const showInputError = (inputElement, errorMessage, config) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const updateValidity = (inputElement, config) => {
  const { patternMismatch, valid } = inputElement.validity,
    errorMessage = patternMismatch ? inputElement.dataset.errorMessage : '';
  inputElement.setCustomValidity(errorMessage);

  if (!valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  const hasInvalidInput = inputList.some(({ validity: { valid } }) => !valid),
    method = hasInvalidInput ? 'add' : 'remove';
  buttonElement.disabled = hasInvalidInput;
  buttonElement.classList[method](inactiveButtonClass);
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      updateValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => event.preventDefault());
    setEventListeners(formElement, config);
  });
};

export const clearValidation = (formElement, config) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement, config) => {
    hideInputError(inputElement, config);
    inputElement.value = '';
  });
  toggleButtonState(inputList, buttonElement, config);
};
