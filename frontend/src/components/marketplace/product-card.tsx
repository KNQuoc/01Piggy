import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import MARKETPLACE_ITEMS from "./marketplace";

// Price ranges for filtering
const PRICE_RANGES = [
  { label: "All Prices", value: "all" },
  { label: "Under $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200+", value: "200-up" },
];

// Product Card Component
// @ts-expect-error
const ProductCard = ({ item, onClick }) => (
  <Card
    onClick={onClick}
    className="overflow-hidden group hover:shadow-xl transition-shadow">
    <div className="relative h-48 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <span className="flex items-center text-sm text-yellow-500">
          <Star className="fill-yellow-500 w-4 h-4 mr-1" />
          {item.rating}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {item.description}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">
          ${item.price.toFixed(2)}
        </p>
        <span className="text-sm text-gray-500">{item.category}</span>
      </div>
    </div>
  </Card>
);

export default ProductCard;
