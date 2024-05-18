import { z } from 'zod';
import { emailRegex, passwordRegex } from 'src/utils';

export const createUserSchema = z
  .object({
    name: z.string().min(2).max(15),
    email: z.string().email().regex(emailRegex),
    password: z.string().regex(passwordRegex).min(6).max(16),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
