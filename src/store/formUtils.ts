
import { FormData } from '@/types/form';
import { nanoid } from 'nanoid';
import { defaultTheme } from './theme';

export const createDefaultForm = (): FormData => ({
  id: nanoid(),
  title: 'Untitled Form',
  description: 'Form description',
  components: [],
  theme: defaultTheme,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
