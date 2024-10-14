import Link from "next/link";

export default function ProcurementPage() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <p className="text-4xl font-bold">Procurement Page</p>
      <Link href="/">Home</Link>
    </div>
  );
}
