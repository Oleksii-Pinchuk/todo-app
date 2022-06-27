import { request } from './api';

export const USER_ID = 3679;

export const getUserById = async (userId: number) => request(`users/${userId}`);

export const addUser = async () => request('users', {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  method: 'POST',
  body: JSON.stringify({
    name: 'Oleksii',
    username: 'Alexavirs',
    email: 'opinchuk@gmail.com',
    phone: '0977547006',
  }),
});
