import './pages/index.css';

import { initialCards } from './components/cards.js';
import { likeCard, deleteCard, createCard } from './components/card.js';
import {
  openPopup,
  closePopup,
  closeByClick,
  closePopupButton,
} from './components/modal.js';

/* --------------------------------- Common --------------------------------- */

const popupCloseButtons = document.querySelectorAll('.popup__close');
const allPopups = document.querySelectorAll('.popup');

// кнопки закрытия попапов (по нажатию на крестик)
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closePopupButton);
});

// закрытие по оверлею
allPopups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', closeByClick);
});

/* ------------------------------ Profile edit ------------------------------ */

const editProfileButton = document.querySelector('.profile__edit-button'),
  profileTitle = document.querySelector('.profile__title'),
  profileDescription = document.querySelector('.profile__description'),
  popupEdit = document.querySelector('.popup_type_edit'),
  editProfileForm = popupEdit.querySelector('.popup__form'),
  nameInput = editProfileForm.querySelector('.popup__input_type_name'),
  jobInput = editProfileForm.querySelector('.popup__input_type_description');

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});

function handleEditProfileSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  editProfileForm.reset();
  closePopup(popupEdit);
}

editProfileForm.addEventListener('submit', handleEditProfileSubmit);

/* -------------------------------- Add card -------------------------------- */

const addButton = document.querySelector('.profile__add-button'),
  popupNewCard = document.querySelector('.popup_type_new-card'),
  addCardForm = popupNewCard.querySelector('.popup__form'),
  cardNameInput = addCardForm.querySelector('.popup__input_type_card-name'),
  linkInput = addCardForm.querySelector('.popup__input_type_url');

addButton.addEventListener('click', function () {
  openPopup(popupNewCard);
});

function handlePlaceFormSubmit(event) {
  event.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: linkInput.value,
  };
  container.prepend(createCard(card, { deleteCard, openImage, likeCard }));
  closePopup(popupNewCard);
  addCardForm.reset();
}

addCardForm.addEventListener('submit', handlePlaceFormSubmit);

/* ------------------------------- Image popup ------------------------------ */

const popupImageCard = document.querySelector('.popup_type_image'),
  popupImage = popupImageCard.querySelector('.popup__image'),
  popupCaption = popupImageCard.querySelector('.popup__caption');

function openImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
  openPopup(popupImageCard);
}

/* -------------------------------- Card list ------------------------------- */

const container = document.querySelector('.places__list');

function addCard(card) {
  const cardToAdd = createCard(card, { deleteCard, likeCard, openImage });
  container.prepend(cardToAdd);
}

initialCards.forEach(addCard);
