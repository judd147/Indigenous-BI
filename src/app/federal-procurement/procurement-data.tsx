import { type Procurement, columns } from "./columns";
import { DataTable } from "./data-table";
import { and, or, ilike, sql, inArray } from "drizzle-orm";
import { procurement } from "~/server/db/schema";
import { getProcurementCount, getProcurementData } from "~/server/db/queries";

export default async function ProcurementData({
  page,
  limit,
  query,
  sort,
  order,
  commodityType,
}: {
  page: number;
  limit: number;
  query?: string;
  sort?: string;
  order?: string;
  commodityType?: string;
}) {
  // Parse the commodityType string into an array
  const commodityTypes = commodityType ? commodityType.split(",") : [];

  // Define the commodity type condition for multiple values
  const commodityTypeCondition =
    commodityTypes.length > 0
      ? inArray(procurement.commodityType, commodityTypes)
      : sql`true`;

  // Define the free-text search condition
  const queryCondition = query
    ? or(
        ilike(procurement.vendorName, `%${query}%`),
        ilike(procurement.description, `%${query}%`),
      )
    : sql`true`;

  // Combine both conditions with AND
  const searchCondition = and(commodityTypeCondition, queryCondition);

  const totalCount = await getProcurementCount(searchCondition);
  const procurements = (await getProcurementData({
    page,
    limit,
    searchCondition,
    sort,
    order,
  })) as Procurement[];
  //console.log(procurements);

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
