import { ProfileForm } from "./profile-form";
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '~/auth';

export default function ProfilePage() {
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Profile</p>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      <ProfileForm />
    </div>
  );
}
