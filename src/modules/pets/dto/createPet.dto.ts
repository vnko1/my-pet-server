import { z } from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from 'src/utils';

export const createPetSchema = z.object({
  name: z.string().min(2).max(15),
  date: z.string(),
  type: z.string().min(2).max(16),
  comments: z.string().min(1).max(120).optional(),
  image: z
    .any()
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, `Max image size is 3MB.`)
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file?.mimetype);
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
});

export type CreatePetDto = z.infer<typeof createPetSchema>;
