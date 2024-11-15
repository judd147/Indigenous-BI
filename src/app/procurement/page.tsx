import { type Procurement, columns } from "./columns"
import { DataTable } from "./data-table"
import { db } from "~/server/db/index"
import { count } from "drizzle-orm";
import { procurement } from "~/server/db/schema";

interface PageProps {
  searchParams: {
    page: string
    limit: string
  }
}

export default async function ProcurementPage({ searchParams }: PageProps) {
  // const page = Number(searchParams.page) || 1
  // const limit = Number(searchParams.limit) || 10
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 10

  // Calculate offset
  const offset = (page - 1) * limit

  // Get total count
  const countResult = await db
    .select({ count: count() })
    .from(procurement)

  const totalCount: number = countResult[0]?.count ?? 0;

  // Get paginated data
  const procurements = await db.query.procurement.findMany({
    limit: limit,
    offset: offset,
    with: {
      solicitationProcedure: {
        columns: {
          procedure: true
        }
      },
      department: {
        columns: {
          name: true
        }
      },
      procurementStrategy: {
        columns: {
          strategy: true
        }
      },
      awardCriteria: {
        columns: {
          criteria: true
        }
      },
    }
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
  )
}
