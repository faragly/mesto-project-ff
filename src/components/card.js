export function createCard(item, { deleteCard, openImage, likeCard }) {
  const template = document
      .querySelector('#card-template')
      .content.querySelector('.card'),
    cardElementCopy = template.cloneNode(true),
    likeButton = cardElementCopy.querySelector('.card__like-button'),
    cardTitle = cardElementCopy.querySelector('.card__title'),
    cardImage = cardElementCopy.querySelector('.card__image');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;

  const deleteButton = cardElementCopy.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  cardImage.addEventListener('click', openImage);
  likeButton.addEventListener('click', likeCard);

  return cardElementCopy;
}

export function deleteCard(card) {
  const cardToRemove = card.target.closest('.card');
  cardToRemove.remove();
}

export function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

