const template = document
  .querySelector('#card-template')
  .content.querySelector('.card');

const hasUserLike = (likes) =>
  likes.some(({ _id }) => _id === globalThis.userData._id);

const renderLikes = (cardElement, likes) => {
  const likeButton = cardElement.querySelector('.card__like-button'),
    likeCount = cardElement.querySelector('.card__like-count'),
    method = hasUserLike(likes) ? 'add' : 'remove';

  likeCount.textContent = likes.length;
  likeButton.classList[method]('card__like-button_is-active');
};

export function createCard({
  data,
  deleteCard,
  openImage,
  likeCard,
  unlikeCard,
}) {
  const cardElement = template.cloneNode(true),
    likeButton = cardElement.querySelector('.card__like-button'),
    cardTitle = cardElement.querySelector('.card__title'),
    cardImage = cardElement.querySelector('.card__image');

  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  renderLikes(cardElement, data.likes);

  if (globalThis.userData._id === data.owner._id) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.classList.add('card__delete-button_visible');
    deleteButton.addEventListener('click', async () => {
      const confirmed = confirm('Вы действительно хотите удалить карточку?');

      if (!confirmed) {
        console.warn(`Удаление карточки с id ${data._id} отменено.`);
        return;
      }

      try {
        const { message } = await deleteCard(data._id);
        cardElement.remove();
        console.log(`%c${message}`, 'color: green');
      } catch (error) {
        console.error('Произошла ошибка при удалении карточки:', error);
      }
    });
  }

  cardImage.addEventListener('click', () => openImage(cardImage));
  likeButton.addEventListener('click', async () => {
    try {
      const { likes } = hasUserLike(data.likes)
        ? await unlikeCard(data._id)
        : await likeCard(data._id);
      data.likes = likes;
      renderLikes(cardElement, likes);
    } catch (error) {
      const actionMessage = hasUserLike ? 'удалении лайка с' : 'лайке';
      console.error(`Произошла ошибка при ${actionMessage} карточки:`, error);
    }
  });

  return cardElement;
}
