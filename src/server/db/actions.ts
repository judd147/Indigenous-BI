'use server';
 
import { signIn } from '~/auth';
import { AuthError } from 'next-auth';
import { type formSchema } from "~/app/profile/profile-form";
import { type z } from "zod";
import { updateUser } from "./queries";
import { revalidatePath } from 'next/cache';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function updateProfile(values: z.infer<typeof formSchema>) {
  await updateUser(values);
  revalidatePath('/profile');
}