import groupMapper from '../mapper/group.mapper';

export default [
  groupMapper.toDomain({
    name: 'User',
    permissions: ['READ', 'WRITE', 'SHARE']
  }),
  groupMapper.toDomain({
    name: 'Admin',
    permissions: ['READ', 'WRITE', 'SHARE', 'DELETE', 'UPLOAD_FILES']
  })
];
