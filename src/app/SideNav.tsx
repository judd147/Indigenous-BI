'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function SideNav() {
  const pathname = usePathname(); // Get the current pathname to determine which link is active
  return (
    <aside
      id="default-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <div className="w-20 m-4 flex justify-center">
          <Image
            src="/itc.jpeg"
            alt="ITC Logo"
            width={50}
            height={50}
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/procurement"
              className={clsx(
                'group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700',
                {
                  'bg-gray-200 dark:bg-gray-700': pathname === '/procurement',
                },
              )}
            >
              <svg
                className={clsx(
                  "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                  {
                    'text-gray-900 dark:text-white': pathname === '/procurement',
                  },
                )}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="ms-3 flex-1 whitespace-nowrap">Procurement</span>
            </Link>
          </li>
          <li>
            <Link
              href="/insight"
              className={clsx(
                'group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700',
                {
                  'bg-gray-200 dark:bg-gray-700': pathname === '/insight',
                },
              )}
            >
              <svg
                className={clsx(
                  "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                  {
                    'text-gray-900 dark:text-white': pathname === '/insight',
                  },
                )}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-312 8l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80-96l0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80 64l0 96c0 13.3 10.7 24 24 24s24-10.7 24-24l0-96c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>

              <span className="ms-3 flex-1 whitespace-nowrap">Insight</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={clsx(
                'group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700',
                {
                  'bg-gray-200 dark:bg-gray-700': pathname === '/profile',
                },
              )}
            >
              <svg
                className={clsx(
                  "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                  {
                    'text-gray-900 dark:text-white': pathname === '/profile',
                  },
                )}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
              <span className="ms-3 flex-1 whitespace-nowrap">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
