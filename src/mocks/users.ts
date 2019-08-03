import userMapper from '../mapper/user.mapper';

export const USERS_DTO = [
  userMapper.toDTO({ login: 'Vasya', password: '123', age: 20 }),
  userMapper.toDTO({ login: 'Petya', password: '456', age: 30 }),
  userMapper.toDTO({ login: 'Vovchik', password: '789', age: 40 })
];

export const USERS = USERS_DTO.map(userMapper.toDomain);
