"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Users, CreditCard, Menu } from "lucide-react";
import OverviewSection from "@/components/parent/OverviewSection";
import SubaccountsManagement from "@/components/parent/SubaccountManager";
import TransactionManagement from "@/components/parent/TransactionManager";
import NotificationCenter from "@/components/parent/NotificationCenter";

// Mock data (in a real application, this would come from an API or state management solution)
// Type for status

type Status = "Pending" | "Approved" | "Denied";

const mockData = {
  totalAllocatedFunds: 10000,
  remainingFunds: 5000,
  subaccountsCount: 3,
  subaccounts: [
    { id: "1", childName: "Alice", currentBalance: 2000, allocatedFunds: 3000 },
    { id: "2", childName: "Bob", currentBalance: 1500, allocatedFunds: 2500 },
    {
      id: "3",
      childName: "Charlie",
      currentBalance: 1500,
      allocatedFunds: 2500,
    },
  ],
  transactions: [
    {
      id: "1",
      productName: "Toy Car",
      productPrice: 59.99,
      productImage: "/images/placeholder.png",
      requestDate: "2023-06-01",
      requestedBy: "Alice",
      status: "Pending" as Status,
    },
    {
      id: "2",
      productName: "Book",
      productPrice: 9.99,
      productImage: "/images/placeholder.png",
      requestDate: "2023-06-02",
      requestedBy: "Bob",
      status: "Approved" as Status,
    },
    {
      id: "3",
      productName: "Video Game",
      productPrice: 29.99,
      productImage: "/images/placeholder.png",
      requestDate: "2023-06-03",
      requestedBy: "Charlie",
      status: "Denied" as Status,
    },
  ],
  notifications: [
    {
      id: "1",
      message: "New transaction request from Alice",
      timestamp: "2023-06-01 10:00",
      read: false,
      transactionId: "1",
    },
    {
      id: "2",
      message: "Transaction approved for Bob",
      timestamp: "2023-06-02 11:00",
      read: true,
      transactionId: "2",
    },
    {
      id: "3",
      message: "Transaction denied for Charlie",
      timestamp: "2023-06-03 12:00",
      read: false,
      transactionId: "3",
    },
  ],
};

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleNotificationClick = (transactionId: string) => {
    console.log(`Navigating to transaction ${transactionId}`);
    setActiveTab("transactions");
    setIsSheetOpen(false);
  };

  const handleMarkAsRead = (notificationId: string) => {
    console.log(`Marking notification ${notificationId} as read`);
    // In a real application, you would update the notification state here
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewSection
            totalAllocatedFunds={mockData.totalAllocatedFunds}
            remainingFunds={mockData.remainingFunds}
            subaccountsCount={mockData.subaccountsCount}
          />
        );
      case "subaccounts":
        return <SubaccountsManagement subaccounts={mockData.subaccounts} />;
      case "transactions":
        return <TransactionManagement transactions={mockData.transactions} />;
      default:
        return <div>Select a tab</div>;
    }
  };

  const NavContent = () => (
    <nav className="flex flex-col space-y-2">
      <Button
        variant={activeTab === "overview" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("overview");
          setIsSheetOpen(false);
        }}
      >
        <Home className="mr-2 h-4 w-4" />
        Overview
      </Button>
      <Button
        variant={activeTab === "subaccounts" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("subaccounts");
          setIsSheetOpen(false);
        }}
      >
        <Users className="mr-2 h-4 w-4" />
        Subaccounts
      </Button>
      <Button
        variant={activeTab === "transactions" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("transactions");
          setIsSheetOpen(false);
        }}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Transactions
      </Button>
    </nav>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold ml-2 md:ml-0">Parent Dashboard</h1>
        </div>
        <NotificationCenter
          notifications={mockData.notifications}
          onNotificationClick={handleNotificationClick}
          onMarkAsRead={handleMarkAsRead}
        />
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r p-4">
          <NavContent />
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">
          <Card className="h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                {renderContent()}
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
