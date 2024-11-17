import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Subaccount {
  id: string;
  childName: string;
  currentBalance: number;
  allocatedFunds: number;
}

interface SubaccountsManagementProps {
  subaccounts?: Subaccount[];
}

export default function SubaccountsManagement({
  subaccounts = [],
}: SubaccountsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubaccount, setSelectedSubaccount] =
    useState<Subaccount | null>(null);

  const filteredSubaccounts = subaccounts.filter((subaccount) =>
    subaccount.childName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Subaccounts Management</h2>
      <Input
        type="text"
        placeholder="Search subaccounts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Child Name</TableHead>
            <TableHead>Current Balance</TableHead>
            <TableHead>Allocated Funds</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubaccounts.map((subaccount) => (
            <TableRow key={subaccount.id}>
              <TableCell>{subaccount.childName}</TableCell>
              <TableCell>${subaccount.currentBalance.toFixed(2)}</TableCell>
              <TableCell>${subaccount.allocatedFunds.toFixed(2)}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedSubaccount(subaccount)}>
                      Allocate Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Allocate Funds to {selectedSubaccount?.childName}
                      </DialogTitle>
                    </DialogHeader>
                    <AllocateFundsForm subaccount={selectedSubaccount} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

interface AllocateFundsFormProps {
  subaccount: Subaccount | null;
}

function AllocateFundsForm({ subaccount }: AllocateFundsFormProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subaccount) {
      // Here you would typically call an API to update the subaccount's balance
      console.log(`Allocating $${amount} to ${subaccount.childName}`);
      // After successful allocation, you might want to update the parent component's state
      // or refetch the subaccounts data
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount to Allocate</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Allocate Funds
      </Button>
    </form>
  );
}
