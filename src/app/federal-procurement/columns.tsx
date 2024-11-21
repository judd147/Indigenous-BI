"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "./column-header";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Procurement = {
  id: number;
  vendorName: string | null;
  vendor: {
    isIB: boolean;
  };
  date: string | null ;
  economicObjectCode: string | null;
  description: string | null;
  contractValue: number | null;
  commodityType: string | null;
  solicitationProcedureId: number | null;
  solicitationProcedure: {
    procedure: string | null;
  };
  departmentId: number | null;
  department: {
    name: string | null;
  };
  awardCriteriaId: number | null;
  awardCriteria: {
    criteria: string | null;
  };
  procurementStrategyId: number | null;
  procurementStrategy: {
    strategy: string | null;
  };
  isTech: boolean | null;
};

export const columns: ColumnDef<Procurement>[] = [
  {
    accessorKey: "vendorName",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Vendor" />
    ),
  },
  {
    accessorKey: "vendor.isIB",
    header: "is IB",
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
    accessorKey: "economicObjectCode",
    header: "Economic Object Code"
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "contractValue",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contract Value" />
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("contractValue"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
      }).format(amount)
 
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "commodityType",
    header: "Commodity Type"
  },
  {
    accessorKey: "solicitationProcedure.procedure",
    header: "Solicitation Procedure"
  },
  {
    accessorKey: "department.name",
    header: "Department"
  },
  {
    accessorKey: "procurementStrategy.strategy",
    header: "Procurement Strategy"
  },
  {
    accessorKey: "awardCriteria.criteria",
    header: "Award Criteria"
  },
  {
    accessorKey: "isTech",
    header: "Is Tech"
  }
];
