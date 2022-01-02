export const api = {
  url: 'http://localhost:3200',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  login: async function(email, password) {
    const res = await fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return await res.json();
  },
  registration: async function(name, about, avatar, email, password ) {
    const res = await fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
        avatar,
        email,
        password
      }),
    });

    return await res.json();
  },
  logout: async function() {
    const res = await fetch(`${this.url}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    return await res.json();
  },
  getProfile: async function() {
    const res = await fetch(`${this.url}/users`, {
      method: 'GET',
      credentials: 'include',
    });

    return await res.json();
  },
  updateProfile: async function(name, about, avatar) {
    const res = await fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
        avatar,
      }),
    });

    return await res.json();
  },
  getCards: async function() {
    const res = await fetch(`${this.url}/cards`, {
      method: 'GET',
      credentials: 'include',
    });

    return await res.json();
  },
  addCard: async function(title, link) {
    const res = await fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        title,
        link,
      })
    });

    return await res.json();
  },
  changeLikeCardStatus: async function(id, isLiked) {
    const res = await fetch(`${this.url}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
    });

    return await res.json();
  },
  deleteCard: async function(id) {
    const res = await fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    
    return await res.json();
  },
};