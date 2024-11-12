import {
  pgTableCreator,
  serial,
  real,
  integer,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const createTable = pgTableCreator((name) => `indigenous-bi_${name}`);

export const vendor = createTable('vendor', {
  vendor_name: varchar('vendor_name', { length: 256 }).primaryKey(),
  is_IB: boolean('is_IB').default(false),
});

export const vendorRelations = relations(vendor, ({ many }) => ({
  procurements: many(procurement),
}));

export const solicitationProcedure = createTable('solicitation_procedure', {
  id: serial('id').primaryKey(),
  procedure: varchar('procedure', { length: 256 }).unique().notNull(),
});

export const solicitationProcedureRelations = relations(solicitationProcedure, ({ many }) => ({
  procurements: many(procurement),
}));

export const awardCriteria = createTable('award_criteria', {
  id: serial('id').primaryKey(),
  criteria: varchar('criteria', { length: 256 }).unique().notNull(),
});

export const awardCriteriaRelations = relations(awardCriteria, ({ many }) => ({
  procurements: many(procurement),
}));

export const procurementStrategy = createTable('procurement_strategy', {
  id: serial('id').primaryKey(),
  strategy: varchar('strategy', { length: 256 }).unique().notNull(),
});

export const procurementStrategyRelations = relations(procurementStrategy, ({ many }) => ({
  procurements: many(procurement),
}));

export const department = createTable('department', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).unique().notNull(),
});

export const departmentRelations = relations(department, ({ many }) => ({
  procurements: many(procurement),
}));

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

export const procurementRelations = relations(procurement, ({ one }) => ({
  vendor: one(vendor, {
    fields: [procurement.vendor_name],
    references: [vendor.vendor_name],
  }),
  solicitationProcedure: one(solicitationProcedure, {
    fields: [procurement.solicitation_procedure_id],
    references: [solicitationProcedure.id],
  }),
  department: one(department, {
    fields: [procurement.department_id],
    references: [department.id],
  }),
  procurementStrategy: one(procurementStrategy, {
    fields: [procurement.procurement_strategy_id],
    references: [procurementStrategy.id],
  }),
  awardCriteria: one(awardCriteria, {
    fields: [procurement.award_criteria_id],
    references: [awardCriteria.id],
  }),
}));

// summary tables
export const strategySummary = createTable('strategySummary', {
  category: varchar('category', { length: 256 }).primaryKey(),
  count: integer('count').notNull(),
  sum: real('sum').notNull()
});

export const ownerSummary = createTable('ownerSummary', {
  category: varchar('category', { length: 256 }).primaryKey(),
  count: integer('count').notNull(),
  sum: real('sum').notNull()
});

export const industrySummary = createTable('industrySummary', {
  category: varchar('category', { length: 256 }).primaryKey(),
  count: integer('count').notNull(),
  sum: real('sum').notNull()
}); 

export const strategyIndustrySummary = createTable('strategyIndustrySummary', {
  category: varchar('category', { length: 256 }).primaryKey(),
  Tech_count: integer('Tech_count').notNull(),
  "non-Tech_count": integer('non-Tech_count').notNull(),
  Tech_sum: real('Tech_sum').notNull(),
  "non-Tech_sum": real('non-Tech_sum').notNull(),
});

export const ownerIndustrySummary = createTable('ownerIndustrySummary', {
  category: varchar('category', { length: 256 }).primaryKey(),
  Tech_count: integer('Tech_count').notNull(),
  "non-Tech_count": integer('non-Tech_count').notNull(),
  Tech_sum: real('Tech_sum').notNull(),
  "non-Tech_sum": real('non-Tech_sum').notNull(),
}); 

export const topIBVendorSummary = createTable('topIBVendorSummary', {
  category: varchar('category', { length: 256 }).primaryKey(),
  sum: real('sum').notNull()
});

export const topNonIBVendorSummary = createTable('topNonIBVendorSummary', {
  category: varchar('category', { length: 256 }).primaryKey(),
  sum: real('sum').notNull()
});