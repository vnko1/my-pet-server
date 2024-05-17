import { emailRegex } from 'src/utils';
import { z } from 'zod';

export const signInSchema = z
  .object({
    email: z.string().email().regex(emailRegex),
    password: z.string().min(6).max(16),
  })
  .required();

export type SignInDto = z.infer<typeof signInSchema>;
