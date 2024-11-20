import { type Procurement, columns } from "./columns";
import { DataTable } from "./data-table";
import { or, ilike, sql } from "drizzle-orm";
import { procurement } from "~/server/db/schema";
import { getProcurementCount, getProcurementData } from "~/server/db/queries";

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

  // Define the search condition
  const searchCondition = query
    ? or(
        ilike(procurement.vendor_name, `%${query}%`),
        ilike(procurement.description, `%${query}%`),
      )
    : sql`true`;

  const totalCount = await getProcurementCount(searchCondition);
  const procurements = await getProcurementData({ page, limit, searchCondition, sort, order }) as Procurement[];

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
