"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import BalanceOverview from "@/components/child/BalanceOverview";
import TransactionRequests from "@/components/child/TransactionRequest";
import TransactionHistory from "@/components/child/TransactionHistory";

export default function ChildDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the child
  const childData = {
    name: "Alex",
    profilePicture: "/images/default-profile.png",
    allocatedFunds: 100,
    spentAmount: 35,
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome, {childData.name}!
      </h1>

      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Balance</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-200px)] mt-6">
          <TabsContent value="overview">
            <BalanceOverview
              childName={childData.name}
              profilePicture={childData.profilePicture}
              allocatedFunds={childData.allocatedFunds}
              spentAmount={childData.spentAmount}
            />
          </TabsContent>
          <TabsContent value="request">
            <TransactionRequests />
          </TabsContent>
          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
