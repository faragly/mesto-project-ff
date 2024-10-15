const template = document
  .querySelector('#card-template')
  .content.querySelector('.card');

export function createCard(item, { deleteCard, openImage, likeCard }) {
  const cardElement = template.cloneNode(true),
    likeButton = cardElement.querySelector('.card__like-button'),
    cardTitle = cardElement.querySelector('.card__title'),
    cardImage = cardElement.querySelector('.card__image');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  cardImage.addEventListener('click', () => openImage(cardImage));
  likeButton.addEventListener('click', () => likeCard(cardElement));

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(card) {
  const likeButton = card.querySelector('.card__like-button')
  likeButton.classList.toggle('card__like-button_is-active');
}
