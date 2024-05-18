import { unlink } from 'fs/promises';

export const deleteFile = async (path: string) => {
  await unlink(path);
};
