import { type Procurement, columns } from "./columns";
import { DataTable } from "./data-table";
import { db } from "~/server/db/index";
import { or, ilike, sql, count } from "drizzle-orm";
import { procurement } from "~/server/db/schema";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    query?: string;
    sort?: string;
    order?: string;
  }>;
}

export default async function ProcurementPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const offset = (page - 1) * limit;
  const query = params?.query?.trim();
  const sort = params?.sort;
  const order = params?.order;

  // Define the search condition
  const searchCondition = query
  ? or(
      ilike(procurement.vendor_name, `%${query}%`),
      ilike(procurement.description, `%${query}%`)
    )
  : sql`true`; // Always true if no search query

  // Count total records with search condition
  const countResult = await db
    .select({ count: count() })
    .from(procurement)
    .where(searchCondition)

  const totalCount = countResult[0]?.count ?? 0;

  // Fetch paginated procurement records with joins
  const procurements = await db.query.procurement.findMany({
    limit: limit,
    offset: offset,
    where: searchCondition,
    orderBy: (procurement, { asc, desc }) => [
      // Check if sortField exists and apply sorting
      sort 
        ? order === "desc"
          ? desc(procurement[sort as keyof typeof procurement])
          : asc(procurement[sort as keyof typeof procurement])
        : asc(procurement.id) // default sorting
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
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Procurement Page</p>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={procurements}
          pageCount={Math.ceil(totalCount / limit)}
          pageIndex={page - 1}
          pageSize={limit}
        />
      </div>
    </div>
  );
}
