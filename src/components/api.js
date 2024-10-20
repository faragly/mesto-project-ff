const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: '6874ea7c-fdda-46c4-ad6e-6750714638d0',
    'Content-Type': 'application/json',
  },
};

async function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    ...options,
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

export const getUserData = () => request('/users/me', { method: 'GET' });

export const updateUserData = (payload) =>
  request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const updateUserAvatar = (avatar) =>
  request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar }),
  });

export const getCards = () => request('/cards', { method: 'GET' });

export const addCard = (payload) =>
  request('/cards', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const deleteCard = (id) => request(`/cards/${id}`, { method: 'DELETE' });

export const unlikeCard = (id) =>
  request(`/cards/likes/${id}`, { method: 'DELETE' });

export const likeCard = (id) =>
  request(`/cards/likes/${id}`, { method: 'PUT' });
