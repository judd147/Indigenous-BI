import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <aside
      id="default-sidebar"
      className="h-screen -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <div className="m-4 flex w-20 justify-center">
          <Image
            src="/itc.jpeg"
            alt="ITC Logo"
            width={50}
            height={50}
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>
        <NavLinks />
      </div>
    </aside>
  );
}
