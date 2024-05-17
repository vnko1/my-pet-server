import { cityRegex, emailRegex, phoneRegex } from 'src/utils';
import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).max(15).optional(),
  email: z.string().email().regex(emailRegex).optional(),
  birthday: z.string().optional(),
  city: z.string().min(2).max(30).regex(cityRegex).optional(),
  phone: z.string().min(13).regex(phoneRegex).optional(),
  avatar: z
    .instanceof(File, { message: 'Please upload a file.' })
    .refine((f) => f.size < 3 * 1024 * 1024, 'Max 3MB upload size.')
    .optional(),
});
//   .refine(
//     (data) => {
//       return Object.keys(data).some((key) => data[key] !== undefined);
//     },
//     {
//       message: 'At least one field must be provided.',
//       path: [], // This applies the error message to the root of the object
//     },
//   );

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
