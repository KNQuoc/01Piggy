import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface OverviewProps {
  totalAllocatedFunds: number | undefined;
  remainingFunds: number | undefined;
  subaccountsCount: number | undefined;
}

export default function OverviewSection({
  totalAllocatedFunds,
  remainingFunds,
  subaccountsCount,
}: OverviewProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Allocated Funds"
          value={totalAllocatedFunds ?? 0}
          tooltip="The total amount of funds allocated across all subaccounts"
        />
        <MetricCard
          title="Remaining Funds"
          value={remainingFunds ?? 0}
          tooltip="The total amount of funds remaining across all subaccounts"
        />
        <MetricCard
          title="Number of Subaccounts"
          value={subaccountsCount ?? 0}
          tooltip="The total number of subaccounts you're managing"
        />
      </div>
    </section>
  );
}

interface MetricCardProps {
  title: string;
  value: number | string;
  tooltip: string;
}

function MetricCard({ title, value, tooltip }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toFixed(2) : value}
        </div>
      </CardContent>
    </Card>
  );
}
