import { type Procurement, columns } from "./columns"
import { DataTable } from "./data-table"
import { db } from "~/server/db/index"

export default async function ProcurementPage() {
  const procurements = await db.query.procurement.findMany({
    limit: 35000,
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
  // console.log(procurements);
  
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Procurement Page</p>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={procurements} />
      </div>
    </div>
  );
}
