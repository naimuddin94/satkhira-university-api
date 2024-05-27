import { z } from 'zod';

export const userValidationSchema = z.object({
  id: z.string().optional(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z.string().optional(),
  needsPasswordChange: z.boolean().default(true).optional(),
  role: z.string().optional(),
  status: z.enum(['in-progress', 'blocked']).default('in-progress').optional(),
  isDeleted: z.boolean().optional().default(false).optional(),
});
