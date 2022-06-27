/// <reference types="react-scripts" />

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

interface User {
  name: string,
  username: string,
  email: string,
  phone: string,
}

interface Option {
  method: string,
  headers?: {
    'Content-type': string,
  },
  body?: string,
}
