export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}

export function closeEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export function closeByClick(event) {
  event.stopPropagation();
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

export function closePopupButton(event) {
  const popup = event.target.closest('.popup');
  closePopup(popup);
}
