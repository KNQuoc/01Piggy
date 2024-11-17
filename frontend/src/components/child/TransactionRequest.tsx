import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import AIDecisionMakerPopover from "../decision/DecisionMaker";
import { MarketplacePreview } from "../marketplace/MarketPreview";

interface ProductInfo {
  name: string;
  price: number;
  image: string;
}

export default function TransactionRequests() {
  const [url, setUrl] = useState("");
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(null);
  };

  const validateUrl = (url: string) => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulating API call to fetch product info
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockProductInfo: ProductInfo = {
        name: "Sample Product",
        price: 29.99,
        image: "/placeholder.svg",
      };
      setProductInfo(mockProductInfo);
    } catch (error) {
      setError("Failed to fetch product information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestSubmit = async () => {
    // setIsLoading(true);
    setOpen(true);
    // // Simulating API call to submit the request
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // setIsLoading(false);
    // alert("Transaction request submitted successfully!");
    // setUrl("");
    // setProductInfo(null);
  };
  const handlePurchase = () => {
    setOpen(false);
    setIsLoading(true);
    // Simulating API call to submit the request
    setTimeout(() => {
      setIsLoading(false);
      alert("Transaction request submitted successfully!");
      setUrl("");
      setProductInfo(null);
    }, 1500);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Request a Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productUrl">Product URL</Label>
              <Input
                id="productUrl"
                type="url"
                placeholder="https://example.com/product"
                value={url}
                onChange={handleUrlChange}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Fetch Product Info"
              )}
            </Button>
          </form>

          {productInfo && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={productInfo.image}
                  alt={productInfo.name}
                  width={64}
                  height={64}
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{productInfo.name}</h3>
                  <p className="text-muted-foreground">
                    ${productInfo.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleRequestSubmit}
                className="w-full"
                disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Proceed with Request"
                )}
              </Button>
            </div>
          )}
          <div className="flex items-center justify-center">
            <AIDecisionMakerPopover
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              purchase={handlePurchase}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
