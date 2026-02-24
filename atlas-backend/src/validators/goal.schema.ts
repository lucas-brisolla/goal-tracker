import z from 'zod';

export const createGoalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export const updateGoalSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});
