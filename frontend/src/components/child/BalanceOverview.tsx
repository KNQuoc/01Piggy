import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import Image from "next/image";

interface BalanceOverviewProps {
  childName: string;
  profilePicture?: string;
  allocatedFunds?: number;
  spentAmount?: number;
}

export default function BalanceOverview({
  childName,
  profilePicture,
  allocatedFunds,
  spentAmount,
}: BalanceOverviewProps) {
  const remainingBalance = (allocatedFunds ?? 0) - (spentAmount ?? 0);
  const spentPercentage = allocatedFunds
    ? ((spentAmount ?? 0) / allocatedFunds) * 100
    : 0;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          {profilePicture && (
            <Image
              src={profilePicture}
              alt={`${childName}'s profile`}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <CardTitle className="text-2xl font-bold">
            {childName}&apos;s Balance
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4">
          ${remainingBalance.toFixed(2)}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="inline-block ml-2 h-5 w-5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  This is your current available balance from your allocated
                  funds.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Progress value={spentPercentage} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Spent: ${(spentAmount ?? 0).toFixed(2)}</span>
          <span>Allocated: ${(allocatedFunds ?? 0).toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
