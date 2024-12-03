import { ProfileForm } from "./profile-form";
import { LogOut } from "lucide-react";
import { signOut } from "~/auth";
import { Button } from "~/components/ui/button";

export default function ProfilePage() {
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
      <ProfileForm />
    </div>
  );
}
