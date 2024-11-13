//import "server-only";
import { db } from "~/server/db/index";
import {
  procurement,
  procurementStrategy,
  vendor,
  strategySummary,
  ownerSummary,
  industrySummary,
  strategyIndustrySummary,
  ownerIndustrySummary,
  topIBVendorSummary,
  topNonIBVendorSummary,
} from "~/server/db/schema";
import { count, sum, eq, sql, ne, and, desc } from "drizzle-orm";

const cached = false; // toggle to change the data source

export async function getStrategySummary() {
  const data = cached
    ? await db.select().from(strategySummary)
    : await db
        .select({
          category: procurementStrategy.strategy,
          count: count(),
          sum: sum(procurement.contract_value).mapWith(
            procurement.contract_value,
          ),
        })
        .from(procurement)
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurement_strategy_id, procurementStrategy.id),
        )
        .groupBy(procurementStrategy.strategy);
  return data;
}

export async function getOwnerSummary() {
  const data = cached
    ? await db.select().from(ownerSummary)
    : await db
        .select({
          category: sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
          count: count(),
          sum: sum(procurement.contract_value).mapWith(
            procurement.contract_value,
          ),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurement_strategy_id, procurementStrategy.id),
        )
        .where(ne(procurementStrategy.strategy, "None"))
        .groupBy(vendor.is_IB);
  return data;
}

export async function getIndustrySummary() {
  const data = cached
    ? await db.select().from(industrySummary)
    : await db
        .select({
          category: sql<string>`CASE WHEN ${procurement.is_Tech} THEN 'Tech' ELSE 'non-Tech' END`,
          count: count(),
          sum: sum(procurement.contract_value).mapWith(
            procurement.contract_value,
          ),
        })
        .from(procurement)
        .groupBy(procurement.is_Tech);
  return data;
}

export async function getStrategyIndustrySummary() {
  const data = cached
    ? await db.select().from(strategyIndustrySummary)
    : await db
        .select({
          category: sql<string>`CASE WHEN ${procurementStrategy.strategy} = 'None' THEN 'None' ELSE 'PSIB/PSAB' END`,
          Tech_count: count(sql`CASE WHEN ${procurement.is_Tech} THEN 1 END`),
          "non-Tech_count": count(
            sql`CASE WHEN NOT ${procurement.is_Tech} THEN 1 END`,
          ),
          Tech_sum: sum(
            sql`CASE WHEN ${procurement.is_Tech} THEN ${procurement.contract_value} END`,
          ).mapWith(procurement.contract_value),
          "non-Tech_sum": sum(
            sql`CASE WHEN NOT ${procurement.is_Tech} THEN ${procurement.contract_value} END`,
          ).mapWith(procurement.contract_value),
        })
        .from(procurement)
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurement_strategy_id, procurementStrategy.id),
        )
        .groupBy(
          sql<string>`CASE WHEN ${procurementStrategy.strategy} = 'None' THEN 'None' ELSE 'PSIB/PSAB' END`,
        );
  return data;
}

export async function getOwnerIndustrySummary() {
  const data = cached
    ? await db.select().from(ownerIndustrySummary)
    : await db
        .select({
          category: sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
          Tech_count: count(sql`CASE WHEN ${procurement.is_Tech} THEN 1 END`),
          "non-Tech_count": count(
            sql`CASE WHEN NOT ${procurement.is_Tech} THEN 1 END`,
          ),
          Tech_sum: sum(
            sql`CASE WHEN ${procurement.is_Tech} THEN ${procurement.contract_value} END`,
          ).mapWith(procurement.contract_value),
          "non-Tech_sum": sum(
            sql`CASE WHEN NOT ${procurement.is_Tech} THEN ${procurement.contract_value} END`,
          ).mapWith(procurement.contract_value),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurement_strategy_id, procurementStrategy.id),
        )
        .where(ne(procurementStrategy.strategy, "None"))
        .groupBy(
          sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
        );
  return data;
}

export async function getTopIBVendorSummary() {
  const data = cached
    ? await db.select().from(topIBVendorSummary)
    : await db
        .select({
          category: vendor.vendor_name,
          sum: sum(procurement.contract_value).mapWith(
            procurement.contract_value,
          ),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurement_strategy_id, procurementStrategy.id),
        )
        .where(
          and(ne(procurementStrategy.strategy, "None"), eq(vendor.is_IB, true)),
        )
        .groupBy(vendor.vendor_name)
        .orderBy(
          desc(
            sum(procurement.contract_value).mapWith(procurement.contract_value),
          ),
        )
        .limit(10);
  return data;
}

export async function getTopNonIBVendorSummary() {
  const data = cached
    ? await db.select().from(topNonIBVendorSummary)
    : await db
        .select({
          category: vendor.vendor_name,
          sum: sum(procurement.contract_value).mapWith(
            procurement.contract_value,
          ),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurement_strategy_id, procurementStrategy.id),
        )
        .where(
          and(
            ne(procurementStrategy.strategy, "None"),
            eq(vendor.is_IB, false),
          ),
        )
        .groupBy(vendor.vendor_name)
        .orderBy(
          desc(
            sum(procurement.contract_value).mapWith(procurement.contract_value),
          ),
        )
        .limit(10);
  return data;
}
