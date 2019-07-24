import User from '../models/user.model';

export default [
  new User({ login: 'Vasya', password: '123', age: 20 }),
  new User({ login: 'Petya', password: '456', age: 30 }),
  new User({ login: 'Vovchik', password: '789', age: 40 })
];
