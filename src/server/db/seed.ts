import * as fs from "fs";
import Papa from "papaparse";
import { eq } from 'drizzle-orm';
import { db } from "./index.js";
import { 
  vendor,
  solicitationProcedure,
  awardCriteria,
  procurementStrategy,
  department,
  procurement,
} from "./schema.js";
import pkg from '@next/env'
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { loadEnvConfig } = pkg;
const projectDir = process.cwd()
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
loadEnvConfig(projectDir)

interface ProcurementRecord {
  procurement_id: number;
  vendor_name: string;
  contract_date: string;
  economic_object_code: string;
  description_eng: string;
  contract_value: number;
  commodity_type_en: string;
  solicitation_procedure_en: string;
  owner_org_en: string;
  award_criteria_en: string;
  is_IB: boolean;
  PSIB: string;
  is_Tech: boolean;
}
let index = 48994;

const seed = async () => {
  const data = fs.readFileSync(
    "/Users/zhangliyao/Documents/Liyao/NEU/CS7980/Indigenous-Tech-Circle/data/processed/clean2023.csv",
    "utf8",
  );
  const records: ProcurementRecord[] = Papa.parse<ProcurementRecord>(data, { header: true, dynamicTyping: true }).data;

  for (const record of records.slice(index)) {
    // vendor table
    // const existingVendor = await db.select().from(vendor).where(
    //   eq(vendor.vendor_name, record.vendor_name),
    // );

    await db
    .insert(vendor)
    .values({ vendor_name: record.vendor_name, is_IB: record.is_IB })
    .onConflictDoNothing({ target: vendor.vendor_name });

    // solicitation procedure table
    // const existingProcedure = await db.select().from(solicitationProcedure).where(
    //   eq(solicitationProcedure.procedure, record.solicitation_procedure_en),
    // );
    
    await db
      .insert(solicitationProcedure)
      .values({ procedure: record.solicitation_procedure_en })
      .onConflictDoNothing({ target: solicitationProcedure.procedure });

    // department table
    // const existingDepartment = await db.select().from(department).where(
    //   eq(department.name, record.owner_org_en),
    // );
  
    await db
      .insert(department)
      .values({ name: record.owner_org_en })
      .onConflictDoNothing({ target: department.name });

    // award criteria table
    // const existingAwardCriteria = await db.select().from(awardCriteria).where(
    //   eq(awardCriteria.criteria, record.award_criteria_en),
    // );
    
    await db
      .insert(awardCriteria)
      .values({ criteria: record.award_criteria_en })
      .onConflictDoNothing({ target: awardCriteria.criteria });

    // procurement strategy table
    // const existingStrategy = await db.select().from(procurementStrategy).where(
    //   eq(procurementStrategy.strategy, record.PSIB),
    // );
    
    await db
      .insert(procurementStrategy)
      .values({ strategy: record.PSIB })
      .onConflictDoNothing({ target: procurementStrategy.strategy });

    // procurement table
    // fetch all foreign keys
    const procedureFK = await db.select({id: solicitationProcedure.id}).from(solicitationProcedure).where(
      eq(solicitationProcedure.procedure, record.solicitation_procedure_en),
    );
    const departmentFK = await db.select({id: department.id}).from(department).where(
      eq(department.name, record.owner_org_en),
    );
    const strategyFK = await db.select({id: procurementStrategy.id}).from(procurementStrategy).where(
      eq(procurementStrategy.strategy, record.PSIB),
    );
    const awardCriteriaFK = await db.select({id: awardCriteria.id}).from(awardCriteria).where(
      eq(awardCriteria.criteria, record.award_criteria_en),
    );

    if (!procedureFK[0]) {
      throw new Error(`Solicitation procedure not found for record ${record.solicitation_procedure_en}`);
    }
    if (!departmentFK[0]) {
      throw new Error(`Department not found for record ${record.owner_org_en}`);
    }
    if (!strategyFK[0]) {
      throw new Error(`Procurement strategy not found for record ${record.PSIB}`);
    }
    if (!awardCriteriaFK[0]) {
      throw new Error(`Award criteria not found for record ${record.award_criteria_en}`);
    }
    await db.insert(procurement).values({
      id: index,
      vendor_name: record.vendor_name,
      date: record.contract_date,
      economic_object_code: record.economic_object_code,
      description: record.description_eng,
      contract_value: record.contract_value,
      commodity_type: record.commodity_type_en,
      solicitation_procedure_id: procedureFK[0].id,
      department_id: departmentFK[0].id,
      procurement_strategy_id: strategyFK[0].id,
      award_criteria_id: awardCriteriaFK[0].id,
      is_Tech: record.is_Tech,
    });
    index++;
    if (index % 2000 === 0) {
      console.log(`Processed ${index} records`);
    }
  }
};

void seed();
