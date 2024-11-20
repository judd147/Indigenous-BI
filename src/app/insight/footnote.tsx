"use client";

import Link from "next/link";

export default function FootNote() {
  return (
    <footer className="mt-10 space-y-4 text-sm text-gray-600">
      <p>
        Note: The data for these visualizations is sourced from the{" "}
        <Link
          href={"https://search.open.canada.ca/contracts/"}
          target="_blank"
          className="underline"
        >
          federal government contract open dataset
        </Link>
        . Analysis is based on historical records in 2023.
      </p>
      <p>
        IB: To identify Indigenous businesses, we used both the{" "}
        <Link
          href={"https://www.sac-isc.gc.ca/rea-ibd"}
          target="_blank"
          className="underline"
        >
          federal Indigenous Business Directory
        </Link>{" "}
        and{" "}
        <Link
          href={"https://www.ccab.com/main/ccab_member/"}
          target="_blank"
          className="underline"
        >
          member list from CCIB
        </Link>{" "}
        to match the names of vendors in contract records.
      </p>
      <p>
        PSIB/PSAB: The Procurement Strategy for Aboriginal Business (PSAB) was
        created in 1996 and aimed to “increase the number of Aboriginal
        suppliers bidding for, and winning, federal contracts.” In August 2021,
        the program underwent a series of comprehensive changes and was renamed
        the Procurement Strategy for Indigenous Business (PSIB). Among those
        changes, it was announced that the Government of Canada is implementing
        a mandatory requirement for federal departments and agencies to ensure a
        minimum of 5% of the total value of contracts are held by qualified
        Indigenous businesses. For more information, please visit{" "}
        <Link
          href={"https://opo-boa.gc.ca/pmr-psp-eng.html"}
          target="_blank"
          className="underline"
        >
          https://opo-boa.gc.ca/pmr-psp-eng.html
        </Link>
      </p>
    </footer>
  );
}
