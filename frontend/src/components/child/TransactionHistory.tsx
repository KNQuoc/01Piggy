import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  productName: string;
  price: number;
  status: "Pending" | "Approved" | "Denied";
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    productName: "Toy Car",
    price: 19.99,
    status: "Approved",
    date: "2023-06-01",
  },
  {
    id: "2",
    productName: "Book",
    price: 9.99,
    status: "Pending",
    date: "2023-06-02",
  },
  {
    id: "3",
    productName: "Video Game",
    price: 59.99,
    status: "Denied",
    date: "2023-06-03",
  },
  {
    id: "4",
    productName: "Headphones",
    price: 29.99,
    status: "Approved",
    date: "2023-06-04",
  },
];

export default function TransactionHistory() {
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Approved" | "Denied"
  >("All");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = mockTransactions.filter(
    (transaction) => filter === "All" || transaction.status === filter
  );

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Denied":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          Transaction History
        </CardTitle>
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
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.productName}
                </TableCell>
                <TableCell>${transaction.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Transaction Details</DialogTitle>
                      </DialogHeader>
                      {selectedTransaction && (
                        <div className="space-y-2">
                          <p>
                            <strong>Product:</strong>{" "}
                            {selectedTransaction.productName}
                          </p>
                          <p>
                            <strong>Price:</strong> $
                            {selectedTransaction.price.toFixed(2)}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {selectedTransaction.status}
                          </p>
                          <p>
                            <strong>Date:</strong> {selectedTransaction.date}
                          </p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
