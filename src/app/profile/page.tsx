import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <p className="text-4xl font-bold">Profile Page</p>
      <Link href="/">Home</Link>
    </div>
  );
}
