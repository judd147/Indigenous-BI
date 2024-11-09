import "server-only";
import { db } from "~/server/db/index";
import { procurement, procurementStrategy, vendor } from "~/server/db/schema";
import { count, sum, eq, sql, ne, and, desc } from "drizzle-orm";

export async function getStrategySummary() {
  const strategySummary = await db
    .select({
      category: procurementStrategy.strategy,
      count: count(),
      sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
    })
    .from(procurement)
    .innerJoin(
      procurementStrategy,
      eq(procurement.procurement_strategy_id, procurementStrategy.id),
    )
    .groupBy(procurementStrategy.strategy);
  return strategySummary;
}

export async function getOwnerSummary() {
  const ownerSummary = await db
    .select({
      category: sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
      count: count(),
      sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
    })
    .from(procurement)
    .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
    .innerJoin(
      procurementStrategy,
      eq(procurement.procurement_strategy_id, procurementStrategy.id),
    )
    .where(ne(procurementStrategy.strategy, "None"))
    .groupBy(vendor.is_IB);
  return ownerSummary;
}

export async function getIndustrySummary() {
  const industrySummary = await db
    .select({
      category: sql<string>`CASE WHEN ${procurement.is_Tech} THEN 'Tech' ELSE 'non-Tech' END`,
      count: count(),
      sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
    })
    .from(procurement)
    .groupBy(procurement.is_Tech);
  return industrySummary;
}

export async function getStrategyIndustrySummary() {
  const strategyIndustrySummary = await db
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
  return strategyIndustrySummary;
}

export async function getOwnerIndustrySummary() {
  const ownerIndustrySummary = await db
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
  return ownerIndustrySummary;
}

export async function getTopIBVendorSummary() {
  const topIBVendorSummary = await db
    .select({
      category: vendor.vendor_name,
      sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
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
      desc(sum(procurement.contract_value).mapWith(procurement.contract_value)),
    )
    .limit(10);
  return topIBVendorSummary;
}

export async function getTopNonIBVendorSummary() {
  const topNonIBVendorSummary = await db
    .select({
      category: vendor.vendor_name,
      sum: sum(procurement.contract_value).mapWith(procurement.contract_value),
    })
    .from(procurement)
    .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
    .innerJoin(
      procurementStrategy,
      eq(procurement.procurement_strategy_id, procurementStrategy.id),
    )
    .where(
      and(ne(procurementStrategy.strategy, "None"), eq(vendor.is_IB, false)),
    )
    .groupBy(vendor.vendor_name)
    .orderBy(
      desc(sum(procurement.contract_value).mapWith(procurement.contract_value)),
    )
    .limit(10);
  return topNonIBVendorSummary;
}
