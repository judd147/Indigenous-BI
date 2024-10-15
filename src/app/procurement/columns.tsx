"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Procurement = {
  id: string
  date: string
  vendor_name: string
  economic_object_code: number
  contract_value: number
  commodity_type: string
  solicitation_procedure_code: string
  procurement_strategy_code: string
  award_criteria_code: string
}

export const columns: ColumnDef<Procurement>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "vendor_name",
    header: "Vendor",
  },
  {
    accessorKey: "economic_object_code",
    header: "Economic Object Code",
  },
  {
    accessorKey: "contract_value",
    header: "Contract Value",
  },
  {
    accessorKey: "commodity_type",
    header: "Commodity Type",
  },
  {
    accessorKey: "solicitation_procedure_code",
    header: "Solicitation Procedure Code",
  },
  {
    accessorKey: "procurement_strategy_code",
    header: "Procurement Strategy Code",
  },
  {
    accessorKey: "award_criteria_code",
    header: "Award Criteria Code",
  }
]
