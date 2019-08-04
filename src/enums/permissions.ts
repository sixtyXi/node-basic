export enum permissions {
  NONE = 0,
  READ = 1 << 0,
  WRITE = 1 << 1,
  DELETE = 1 << 2,
  SHARE = 1 << 3,
  UPLOAD_FILES = 1 << 4
}
