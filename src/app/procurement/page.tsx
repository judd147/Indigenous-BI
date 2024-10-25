import { type Procurement, columns } from "./columns"
import { DataTable } from "./data-table"
import { db } from "../../server/db/index"

export default async function ProcurementPage() {
  // const data: Procurement[] = [{
  //   id: 1,
  //   vendor_name: 'vendor',
  //   date: new Date().toLocaleDateString(),
  //   economic_object_code: '123',
  //   description: 'description',
  //   contract_value: 456,
  //   commodity_type: "service",
  //   solicitation_procedure: "competitive",
  //   department: "department",
  //   procurement_strategy: "None",
  //   award_criteria: "lowest price",
  //   is_Tech: true,
  // }];

  const procurements = await db.query.procurement.findMany({
    limit: 1,
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

  console.log(procurements);
  
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Procurement Page</p>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={procurements} />
      </div>
    </div>
  );
}
