import {
  pgTableCreator,
  serial,
  real,
  integer,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `indigenous-bi_${name}`);

export const vendor = createTable('vendor', {
  vendor_name: varchar('vendor_name', { length: 256 }).primaryKey(),
  is_IB: boolean('is_IB').default(false),
});

export const solicitationProcedure = createTable('solicitation_procedure', {
  id: serial('id').primaryKey(),
  procedure: varchar('procedure', { length: 256 }).unique(),
});

export const awardCriteria = createTable('award_criteria', {
  id: serial('id').primaryKey(),
  criteria: varchar('criteria', { length: 256 }).unique(),
});

export const procurementStrategy = createTable('procurement_strategy', {
  id: serial('id').primaryKey(),
  strategy: varchar('strategy', { length: 256 }).unique(),
});

export const department = createTable('department', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).unique(),
});

export const procurement = createTable(
  "procurement",
  {
    id: integer('id').primaryKey(),
    vendor_name: varchar("vendor_name", { length: 256 }).references(() => vendor.vendor_name),
    date: varchar("date", { length: 256 }),
    economic_object_code: varchar("economic_object_code", { length: 256 }),
    description: varchar("description"),
    contract_value: real("contract_value"),
    commodity_type: varchar("commodity_type", { length: 256 }),
    solicitation_procedure_id: integer("solicitation_procedure_id").references(() => solicitationProcedure.id),
    department_id: integer("department_id").references(() => department.id),
    procurement_strategy_id: integer("procurement_strategy_id").references(() => procurementStrategy.id),
    award_criteria_id: integer("award_criteria_id").references(() => awardCriteria.id),
    is_Tech: boolean("is_Tech").default(false),
  }
);
