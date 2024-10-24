import { Procurement, columns } from "./columns"
import { DataTable } from "./data-table"

export default function ProcurementPage() {
  const data: Procurement[] = [{
    id: '728ed52f',
    date: new Date().toLocaleDateString(),
    vendor_name: 'vendor',
    economic_object_code: 123,
    contract_value: 456,
    commodity_type: "service",
    solicitation_procedure_code: "competitive",
    procurement_strategy_code: "None",
    award_criteria_code: "lowest price"
  }]
  
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Procurement Page</p>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
