"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";

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
    header: ({ column }) => (
      <ColumnHeader column={column} title="Vendor" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("date")
      const formatted = date.slice(0,10)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "economic_object_code",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Economic Object Code" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "contract_value",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contract Value" />
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
    header: ({ column }) => (
      <ColumnHeader column={column} title="Commodity Type" />
    ),
  },
  {
    accessorKey: "solicitationProcedure.procedure",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Solicitation Procedure" />
    ),
  },
  {
    accessorKey: "department.name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Department" />
    ),
  },
  {
    accessorKey: "procurementStrategy.strategy",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Procurement Strategy" />
    ),
  },
  {
    accessorKey: "awardCriteria.criteria",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Award Criteria" />
    ),
  },
  {
    accessorKey: "is_Tech",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Is Tech" />
    ),
  }
];
