import './pages/index.css';

import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getCards,
  getUserData,
  addCard,
  deleteCard,
  updateUserData,
  likeCard,
  unlikeCard,
  updateUserAvatar,
} from './components/api.js';

/* --------------------------------- Common --------------------------------- */

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (event) => {
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

/* ------------------------------ Profile edit ------------------------------ */

const editProfileButton = document.querySelector('.profile__edit-button'),
  profileTitle = document.querySelector('.profile__title'),
  profileDescription = document.querySelector('.profile__description'),
  profileImage = document.querySelector('.profile__image'),
  popupEdit = document.querySelector('.popup_type_edit'),
  editProfileForm = popupEdit.querySelector('.popup__form'),
  nameInput = editProfileForm.querySelector('.popup__input_type_name'),
  jobInput = editProfileForm.querySelector('.popup__input_type_description');

editProfileButton.addEventListener('click', function () {
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = globalThis.userData.name;
  jobInput.value = globalThis.userData.about;

  // после вставки текста необходимо вызвать события input для повторной валидации
  const event = new InputEvent('input', { inputType: 'insertText' });
  nameInput.dispatchEvent(event);
  jobInput.dispatchEvent(event);

  openPopup(popupEdit);
});

async function handleEditProfileSubmit(event) {
  event.preventDefault();
  try {
    const userData = await updateUserData({
      name: nameInput.value,
      about: jobInput.value,
    });
    updateUserInfo(userData);
  } catch (error) {
    console.error('Ошибка при редактировании профиля:', error);
  } finally {
    editProfileForm.reset();
    closePopup(popupEdit);
  }
}

function updateUserInfo(userData) {
  globalThis.userData = userData;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

editProfileForm.addEventListener('submit', handleEditProfileSubmit);

/* ------------------------------- Avatar edit ------------------------------ */

const popupEditImage = document.querySelector('.popup_type_edit-profile-image'),
  editProfileImageForm = popupEditImage.querySelector('.popup__form'),
  urlInput = editProfileImageForm.querySelector('.popup__input_type_url_image');

profileImage.addEventListener('click', function () {
  clearValidation(editProfileImageForm, validationConfig);
  openPopup(popupEditImage);
});

async function handleEditProfileImageSubmit(event) {
  event.preventDefault();
  try {
    const userData = await updateUserAvatar(urlInput.value);
    updateUserInfo(userData);
  } catch (error) {
    console.error('Ошибка при редактировании аватара профиля:', error);
  } finally {
    editProfileImageForm.reset();
    closePopup(popupEditImage);
  }
}

editProfileImageForm.addEventListener('submit', handleEditProfileImageSubmit);

/* -------------------------------- Add card -------------------------------- */

const addButton = document.querySelector('.profile__add-button'),
  popupNewCard = document.querySelector('.popup_type_new-card'),
  addCardForm = popupNewCard.querySelector('.popup__form'),
  cardNameInput = addCardForm.querySelector('.popup__input_type_card-name'),
  linkInput = addCardForm.querySelector('.popup__input_type_url');

addButton.addEventListener('click', () => openPopup(popupNewCard));

async function handlePlaceFormSubmit(event) {
  event.preventDefault();
  try {
    const data = await addCard({
      name: cardNameInput.value,
      link: linkInput.value,
    });
    renderCard(data);
  } catch (error) {
    console.error('Ошибка при создании карточки:', error);
  } finally {
    closePopup(popupNewCard);
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
  }
}

addCardForm.addEventListener('submit', handlePlaceFormSubmit);

/* ------------------------------- Image popup ------------------------------ */

const popupImageCard = document.querySelector('.popup_type_image'),
  popupImage = popupImageCard.querySelector('.popup__image'),
  popupCaption = popupImageCard.querySelector('.popup__caption');

function openImage(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
  openPopup(popupImageCard);
}

/* -------------------------------- Card list ------------------------------- */

const container = document.querySelector('.places__list');

function renderCard(data) {
  const cardToAdd = createCard({
    data,
    deleteCard,
    likeCard,
    openImage,
    unlikeCard,
  });
  container.prepend(cardToAdd);
}

function renderCards(cards) {
  cards.reverse().forEach(renderCard);
}

/* ----------------------------- Form validation ---------------------------- */

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

/* -------------------------------- API calls ------------------------------- */

Promise.all([getCards(), getUserData()])
  .then(([cards, userData]) => {
    updateUserInfo(userData);
    renderCards(cards);
  })
  .catch(console.error);
