import { type Procurement, columns } from "./columns";
import { DataTable } from "./data-table";
import { db } from "~/server/db/index";
import { or, ilike, sql, count } from "drizzle-orm";
import { procurement } from "~/server/db/schema";

export default async function ProcurementData({
  page,
  limit,
  query,
  sort,
  order,
}: {
  page: number;
  limit: number;
  query?: string;
  sort?: string;
  order?: string;
}) {
  const offset = (page - 1) * limit;

  // Define the search condition
  const searchCondition = query
    ? or(
        ilike(procurement.vendor_name, `%${query}%`),
        ilike(procurement.description, `%${query}%`),
      )
    : sql`true`;

  // Count total records with search condition
  const countResult = await db
    .select({ count: count() })
    .from(procurement)
    .where(searchCondition);

  const totalCount = countResult[0]?.count ?? 0;

  // Fetch paginated procurement records with joins
  const procurements = await db.query.procurement.findMany({
    limit: limit,
    offset: offset,
    where: searchCondition,
    orderBy: (procurement, { asc, desc }) => [
      sort
        ? order === "desc"
          ? desc(procurement[sort as keyof typeof procurement])
          : asc(procurement[sort as keyof typeof procurement])
        : asc(procurement.id),
    ],
    with: {
      solicitationProcedure: {
        columns: {
          procedure: true,
        },
      },
      department: {
        columns: {
          name: true,
        },
      },
      procurementStrategy: {
        columns: {
          strategy: true,
        },
      },
      awardCriteria: {
        columns: {
          criteria: true,
        },
      },
    },
  }) as Procurement[];

  return (
    <DataTable
      columns={columns}
      data={procurements}
      pageCount={Math.ceil(totalCount / limit)}
      pageIndex={page - 1}
      pageSize={limit}
    />
  );
}