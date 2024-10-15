import './pages/index.css';

import { initialCards } from './components/cards.js';
import { likeCard, deleteCard, createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

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

addButton.addEventListener('click', () => openPopup(popupNewCard));

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

function openImage(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;
  openPopup(popupImageCard);
}

/* -------------------------------- Card list ------------------------------- */

const container = document.querySelector('.places__list');

function addCard(card) {
  const cardToAdd = createCard(card, { deleteCard, likeCard, openImage });
  container.prepend(cardToAdd);
}

initialCards.forEach(addCard);
