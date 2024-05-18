import { z } from 'zod';
import {
  cityRegex,
  emailRegex,
  phoneRegex,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from 'src/utils';

export const updateUserSchema = z
  .object({
    name: z.string().min(2).max(15).optional(),
    email: z.string().email().regex(emailRegex).optional(),
    birthday: z.date().optional(),
    city: z.string().min(2).max(30).regex(cityRegex).optional(),
    phone: z.string().min(13).regex(phoneRegex).optional(),
    avatar: z
      .any()
      .refine((file) => {
        return file?.size <= MAX_FILE_SIZE;
      }, `Max image size is 3MB.`)
      .refine((file) => {
        return ACCEPTED_IMAGE_TYPES.includes(file?.mimetype);
      }, 'Only .jpg, .jpeg, .png and .webp formats are supported.')
      .optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).some((key) => data[key] !== undefined);
    },
    {
      message: 'At least one field must be provided.',
      path: [],
    },
  );

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
