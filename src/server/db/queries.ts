import "server-only";
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
  user
} from "~/server/db/schema";
import { count, sum, eq, sql, ne, and, desc, type SQL } from "drizzle-orm";
import { type formSchema } from "~/app/profile/profile-form";
import { type z } from "zod";

const cached = true; // toggle to change the insight chart data source

export async function getProcurementCount(searchCondition?: SQL<unknown>) {
  // Count total records with search condition
  const countResult = await db
    .select({ count: count() })
    .from(procurement)
    .where(searchCondition);

  return countResult[0]?.count ?? 0;
}

export async function getProcurementData({
  page,
  limit,
  searchCondition,
  sort,
  order,
}: {
  page: number;
  limit: number;
  searchCondition?: SQL<unknown>;
  sort?: string;
  order?: string;
}) {
  const offset = (page - 1) * limit;
  const procurements = await db.query.procurement.findMany({
    limit: limit,
    offset: offset,
    where: searchCondition,
    orderBy: (procurement, { asc, desc }) => [
      sort
        ? order === "desc"
          ? desc(procurement[sort as keyof typeof procurement])
          : asc(procurement[sort as keyof typeof procurement])
        : asc(procurement.id),
    ],
    with: {
      vendor: {
        columns: {
          isIB: true,
        },
      },
      solicitationProcedure: {
        columns: {
          procedure: true,
        },
      },
      department: {
        columns: {
          name: true,
        },
      },
      procurementStrategy: {
        columns: {
          strategy: true,
        },
      },
      awardCriteria: {
        columns: {
          criteria: true,
        },
      },
    },
  });
  return procurements;
}

export async function getStrategySummary() {
  const data = cached
    ? await db.select().from(strategySummary)
    : await db
        .select({
          category: procurementStrategy.strategy,
          count: count(),
          sum: sum(procurement.contractValue).mapWith(
            procurement.contractValue,
          ),
        })
        .from(procurement)
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurementStrategyId, procurementStrategy.id),
        )
        .groupBy(procurementStrategy.strategy);
  return data;
}

export async function getOwnerSummary() {
  const data = cached
    ? await db.select().from(ownerSummary)
    : await db
        .select({
          category: sql<string>`CASE WHEN ${vendor.isIB} THEN 'IB' ELSE 'non-IB' END`,
          count: count(),
          sum: sum(procurement.contractValue).mapWith(
            procurement.contractValue,
          ),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendorName, vendor.vendorName))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurementStrategyId, procurementStrategy.id),
        )
        .where(ne(procurementStrategy.strategy, "None"))
        .groupBy(vendor.isIB);
  return data;
}

export async function getIndustrySummary() {
  const data = cached
    ? await db.select().from(industrySummary)
    : await db
        .select({
          category: sql<string>`CASE WHEN ${procurement.isTech} THEN 'Tech' ELSE 'non-Tech' END`,
          count: count(),
          sum: sum(procurement.contractValue).mapWith(
            procurement.contractValue,
          ),
        })
        .from(procurement)
        .groupBy(procurement.isTech);
  return data;
}

export async function getStrategyIndustrySummary() {
  const data = cached
    ? await db.select().from(strategyIndustrySummary)
    : await db
        .select({
          category: sql<string>`CASE WHEN ${procurementStrategy.strategy} = 'None' THEN 'None' ELSE 'PSIB/PSAB' END`,
          Tech_count: count(sql`CASE WHEN ${procurement.isTech} THEN 1 END`),
          "non-Tech_count": count(
            sql`CASE WHEN NOT ${procurement.isTech} THEN 1 END`,
          ),
          Tech_sum: sum(
            sql`CASE WHEN ${procurement.isTech} THEN ${procurement.contractValue} END`,
          ).mapWith(procurement.contractValue),
          "non-Tech_sum": sum(
            sql`CASE WHEN NOT ${procurement.isTech} THEN ${procurement.contractValue} END`,
          ).mapWith(procurement.contractValue),
        })
        .from(procurement)
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurementStrategyId, procurementStrategy.id),
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
          category: sql<string>`CASE WHEN ${vendor.isIB} THEN 'IB' ELSE 'non-IB' END`,
          Tech_count: count(sql`CASE WHEN ${procurement.isTech} THEN 1 END`),
          "non-Tech_count": count(
            sql`CASE WHEN NOT ${procurement.isTech} THEN 1 END`,
          ),
          Tech_sum: sum(
            sql`CASE WHEN ${procurement.isTech} THEN ${procurement.contractValue} END`,
          ).mapWith(procurement.contractValue),
          "non-Tech_sum": sum(
            sql`CASE WHEN NOT ${procurement.isTech} THEN ${procurement.contractValue} END`,
          ).mapWith(procurement.contractValue),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendorName, vendor.vendorName))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurementStrategyId, procurementStrategy.id),
        )
        .where(ne(procurementStrategy.strategy, "None"))
        .groupBy(
          sql<string>`CASE WHEN ${vendor.isIB} THEN 'IB' ELSE 'non-IB' END`,
        );
  return data;
}

export async function getTopIBVendorSummary() {
  const data = cached
    ? await db.select().from(topIBVendorSummary)
    : await db
        .select({
          category: vendor.vendorName,
          sum: sum(procurement.contractValue).mapWith(
            procurement.contractValue,
          ),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendorName, vendor.vendorName))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurementStrategyId, procurementStrategy.id),
        )
        .where(
          and(ne(procurementStrategy.strategy, "None"), eq(vendor.isIB, true)),
        )
        .groupBy(vendor.vendorName)
        .orderBy(
          desc(
            sum(procurement.contractValue).mapWith(procurement.contractValue),
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
          category: vendor.vendorName,
          sum: sum(procurement.contractValue).mapWith(
            procurement.contractValue,
          ),
        })
        .from(procurement)
        .innerJoin(vendor, eq(procurement.vendorName, vendor.vendorName))
        .innerJoin(
          procurementStrategy,
          eq(procurement.procurementStrategyId, procurementStrategy.id),
        )
        .where(
          and(
            ne(procurementStrategy.strategy, "None"),
            eq(vendor.isIB, false),
          ),
        )
        .groupBy(vendor.vendorName)
        .orderBy(
          desc(
            sum(procurement.contractValue).mapWith(procurement.contractValue),
          ),
        )
        .limit(10);
  return data;
}

export async function updateUser(values: z.infer<typeof formSchema>) {
  await db.update(user).set(values).where(eq(user.email, values.email));
}

export async function getUser(email: string) {
  const currentUser = await db.select().from(user).where(eq(user.email, email));
  return currentUser[0];
}
