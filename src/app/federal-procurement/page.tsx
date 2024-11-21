import { Suspense } from "react";
import DataTableSkeleton from "./skeleton";
import ProcurementData from "./procurement-data";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    query?: string;
    sort?: string;
    order?: string;
    commodityType?: string;
  }>;
}

export default async function ProcurementPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const query = params?.query?.trim();
  const sort = params?.sort;
  const order = params?.order;
  const commodityType = params?.commodityType;

  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Federal Procurement</p>
      <div className="container mx-auto py-10">
        <Suspense fallback={<DataTableSkeleton />}>
          <ProcurementData
            page={page}
            limit={limit}
            query={query}
            sort={sort}
            order={order}
            commodityType={commodityType}
          />
        </Suspense>
      </div>
    </div>
  );
}
