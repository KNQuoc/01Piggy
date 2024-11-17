"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import MARKETPLACE_ITEMS from "./marketplace";
import ProductCard from "./product-card";
import AIDecisionMakerPopover from "../decision/DecisionMaker";

// Marketplace Preview Section
export const MarketplacePreview = () => {
  const [open, setOpen] = React.useState(false);
  // Get 3 featured items (highest rated)
  const featuredItems = [...MARKETPLACE_ITEMS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const onPurchase = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <AIDecisionMakerPopover
        open={open}
        onClose={() => setOpen(false)}
        purchase={onPurchase}
      /> */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">OR</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse the marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredItems.map((item) => (
            <ProductCard
              onClick={() => {
                setOpen(true);
              }}
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/marketplace">
            <Button size="lg" className="px-8">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};
