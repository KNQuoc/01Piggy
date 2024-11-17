"use client";

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
import MARKETPLACE_ITEMS from "@/components/marketplace/marketplace";
import ProductCard from "@/components/marketplace/product-card";
import AIDecisionMakerPopover from "@/components/decision/DecisionMaker";

// Price ranges for filtering
const PRICE_RANGES = [
  { label: "All Prices", value: "all" },
  { label: "Under $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200+", value: "200-up" },
];

// Full Marketplace Page
const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("featured");
  const [category, setCategory] = React.useState("all");
  const [priceRange, setPriceRange] = React.useState("all");
  const [open, setOpen] = React.useState(false);

  // Get unique categories from items
  const categories = [
    "all",
    ...new Set(MARKETPLACE_ITEMS.map((item) => item.category)),
  ];

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;

    // Price range filtering
    let matchesPriceRange = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      if (max === undefined) {
        matchesPriceRange = item.price >= min;
      } else {
        matchesPriceRange = item.price >= min && item.price <= max;
      }
    }

    return matchesSearch && matchesCategory && matchesPriceRange;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      default:
        return b.rating - a.rating; // Featured sorts by rating
    }
  });
  const onPurchase = () => {
    setOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-gray-500" />
            <span className="font-medium">Filters:</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <AIDecisionMakerPopover
          open={open}
          onClose={() => setOpen(false)}
          purchase={onPurchase}
        />
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard
              onClick={() => setOpen(true)}
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
