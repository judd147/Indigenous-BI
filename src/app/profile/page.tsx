import { ProfileForm } from "./profile-form";
import { LogOut } from "lucide-react";
import { auth, signOut } from "~/auth";
import { Button } from "~/components/ui/button";
import { getUser } from "~/server/db/queries";
import { type User } from "./profile-form"

export default async function ProfilePage() {
  const session = await auth();
  const email = session?.user?.email;
  const user = await getUser(email) as User;
  
  return (
    <div className="container px-8 py-16">
      <div className="flex flex-row justify-between">
        <p className="text-4xl font-bold">Profile</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button>
            <LogOut className="w-6" />
            Sign Out
          </Button>
        </form>
      </div>
      <ProfileForm session={session} user={user}/>
    </div>
  );
}
