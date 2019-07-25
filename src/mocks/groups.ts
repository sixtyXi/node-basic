import Group, { Permission } from '../models/group.model';

export default [
  new Group({
    name: 'User',
    permissions: [Permission.READ, Permission.WRITE, Permission.SHARE]
  }),
  new Group({
    name: 'Admin',
    permissions: [
      Permission.READ,
      Permission.WRITE,
      Permission.SHARE,
      Permission.DELETE,
      Permission.UPLOAD_FILES
    ]
  })
];
