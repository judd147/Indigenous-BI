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

export const user = createTable('user', {
  email: varchar('email', { length: 256 }).primaryKey(),
  password: varchar('password', { length: 256 }).notNull(),
  companyName: varchar('company_name', { length: 256 }),
  address: varchar('address', { length: 256 }),
  city: varchar('city', { length: 256 }),
  province: varchar('province', { length: 256 }),
  postalCode: varchar('postal_code', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
  website: varchar('website', { length: 256 }),
  businessType: varchar('business_type', { length: 256 }),
  linkedin: varchar('linkedin', { length: 256 }),
  facebook: varchar('facebook', { length: 256 }),
  twitter: varchar('twitter', { length: 256 }),
  instagram: varchar('instagram', { length: 256 }),
  youtube: varchar('youtube', { length: 256 }),
});

export const vendor = createTable('vendor', {
  vendorName: varchar('vendor_name', { length: 256 }).primaryKey(),
  isIB: boolean('is_IB').default(false),
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
    vendorName: varchar("vendor_name", { length: 256 }).references(() => vendor.vendorName),
    date: varchar("date", { length: 256 }),
    economicObjectCode: varchar("economic_object_code", { length: 256 }),
    description: varchar("description"),
    contractValue: real("contract_value"),
    commodityType: varchar("commodity_type", { length: 256 }),
    solicitationProcedureId: integer("solicitation_procedure_id").references(() => solicitationProcedure.id),
    departmentId: integer("department_id").references(() => department.id),
    procurementStrategyId: integer("procurement_strategy_id").references(() => procurementStrategy.id),
    awardCriteriaId: integer("award_criteria_id").references(() => awardCriteria.id),
    isTech: boolean("is_Tech").default(false),
  }
);

export const procurementRelations = relations(procurement, ({ one }) => ({
  vendor: one(vendor, {
    fields: [procurement.vendorName],
    references: [vendor.vendorName],
  }),
  solicitationProcedure: one(solicitationProcedure, {
    fields: [procurement.solicitationProcedureId],
    references: [solicitationProcedure.id],
  }),
  department: one(department, {
    fields: [procurement.departmentId],
    references: [department.id],
  }),
  procurementStrategy: one(procurementStrategy, {
    fields: [procurement.procurementStrategyId],
    references: [procurementStrategy.id],
  }),
  awardCriteria: one(awardCriteria, {
    fields: [procurement.awardCriteriaId],
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