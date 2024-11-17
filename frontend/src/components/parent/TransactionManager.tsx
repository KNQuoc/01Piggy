import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface Transaction {
  id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  requestDate: string;
  requestedBy: string;
  status: "Pending" | "Approved" | "Denied";
}

interface TransactionManagementProps {
  transactions?: Transaction[];
}

export default function TransactionManagement({
  transactions = [],
}: TransactionManagementProps) {
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Approved" | "Denied"
  >("All");

  const filteredTransactions = transactions.filter(
    (transaction) => filter === "All" || transaction.status === filter
  );

  const handleApprove = (id: string) => {
    // Handle approve logic
    console.log(`Approving transaction ${id}`);
  };

  const handleDeny = (id: string) => {
    // Handle deny logic
    console.log(`Denying transaction ${id}`);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Transaction Management</h2>
      <div className="mb-4">
        <Select
          onValueChange={(value: "All" | "Pending" | "Approved" | "Denied") =>
            setFilter(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Denied">Denied</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Image
                    src={transaction.productImage}
                    alt={transaction.productName}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <span>{transaction.productName}</span>
                </div>
              </TableCell>
              <TableCell>${transaction.productPrice.toFixed(2)}</TableCell>
              <TableCell>{transaction.requestDate}</TableCell>
              <TableCell>{transaction.requestedBy}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    transaction.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : transaction.status === "Approved"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell>
                {transaction.status === "Pending" && (
                  <div className="space-x-2">
                    <Button
                      onClick={() => handleApprove(transaction.id)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleDeny(transaction.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Deny
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
