"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Procurement = {
  id: number;
  vendor_name: string | null;
  date: string | null ;
  economic_object_code: string | null;
  description: string | null;
  contract_value: number | null;
  commodity_type: string | null;
  solicitation_procedure_id: number | null;
  solicitationProcedure: {
    procedure: string | null;
  };
  department_id: number | null;
  department: {
    name: string | null;
  };
  award_criteria_id: number | null;
  awardCriteria: {
    criteria: string | null;
  };
  procurement_strategy_id: number | null;
  procurementStrategy: {
    strategy: string | null;
  };
  is_Tech: boolean | null;
};

export const columns: ColumnDef<Procurement>[] = [
  {
    accessorKey: "vendor_name",
    header: "Vendor",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date: string = row.getValue("date")
      const formatted = date.slice(0,10)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "economic_object_code",
    header: "Economic Object Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "contract_value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contract Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("contract_value"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
      }).format(amount)
 
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "commodity_type",
    header: "Commodity Type",
  },
  {
    accessorKey: "solicitationProcedure.procedure",
    header: "Solicitation Procedure",
  },
  {
    accessorKey: "department.name",
    header: "Department",
  },
  {
    accessorKey: "procurementStrategy.strategy",
    header: "Procurement Strategy",
  },
  {
    accessorKey: "awardCriteria.criteria",
    header: "Award Criteria",
  },
  {
    accessorKey: "is_Tech",
    header: "Is Tech",
  }
];
