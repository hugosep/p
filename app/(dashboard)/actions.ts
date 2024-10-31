'use server';

import { deleteCollectionById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteCollection(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteCollectionById(id);
  revalidatePath('/');
}
